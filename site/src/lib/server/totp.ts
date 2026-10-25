import { createHmac, randomBytes } from 'node:crypto';
import { execute, queryOne } from './db';

// Two-step login with an authenticator app (TOTP, RFC 6238: 30 s steps,
// 6 digits, HMAC-SHA1). A code is accepted one step early or late, and
// each step only once.

const STEP_SECONDS = 30;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export function newSecret() {
	const bytes = randomBytes(20);
	let bits = '';
	for (const byte of bytes) bits += byte.toString(2).padStart(8, '0');
	let secret = '';
	for (let i = 0; i + 5 <= bits.length; i += 5) secret += ALPHABET[parseInt(bits.slice(i, i + 5), 2)];
	return secret;
}

function decode(secret: string) {
	let bits = '';
	for (const char of secret.replace(/[\s=]/g, '').toUpperCase()) {
		const value = ALPHABET.indexOf(char);
		if (value < 0) throw new Error('bad secret');
		bits += value.toString(2).padStart(5, '0');
	}
	const bytes = [];
	for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(parseInt(bits.slice(i, i + 8), 2));
	return Buffer.from(bytes);
}

export function codeAt(secret: string, step: number) {
	const counter = Buffer.alloc(8);
	counter.writeBigUInt64BE(BigInt(step));
	const hmac = createHmac('sha1', decode(secret)).update(counter).digest();
	const offset = hmac[hmac.length - 1] & 0x0f;
	const value = (hmac.readUInt32BE(offset) & 0x7fffffff) % 1_000_000;
	return String(value).padStart(6, '0');
}

/** The time step the code belongs to, or null when it does not match */
export function matchingStep(secret: string, code: string, now = Date.now()) {
	const clean = code.replace(/\s/g, '');
	if (!/^\d{6}$/.test(clean)) return null;
	const current = Math.floor(now / 1000 / STEP_SECONDS);
	for (const step of [current, current - 1, current + 1]) {
		if (codeAt(secret, step) === clean) return step;
	}
	return null;
}

export function otpauthUrl(secret: string, accountName: string, issuer: string) {
	const label = encodeURIComponent(`${issuer}:${accountName}`);
	return `otpauth://totp/${label}?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=${STEP_SECONDS}`;
}

export async function totpSecret(accountId: number) {
	const row = await queryOne<{ totp_secret: string | null; totp_enabled_at: Date | null }>(
		'SELECT totp_secret, totp_enabled_at FROM site_accounts WHERE account_id = :accountId',
		{ accountId }
	);
	return row?.totp_enabled_at && row.totp_secret ? row.totp_secret : null;
}

/** Checks a code for an account with two-step login on, using each step once */
export async function checkAccountCode(accountId: number, code: string) {
	const row = await queryOne<{ totp_secret: string | null; totp_last_step: number }>(
		'SELECT totp_secret, totp_last_step FROM site_accounts WHERE account_id = :accountId AND totp_enabled_at IS NOT NULL',
		{ accountId }
	);
	if (!row?.totp_secret) return false;
	const step = matchingStep(row.totp_secret, code);
	if (step === null || step <= Number(row.totp_last_step)) return false;
	const result = await execute(
		'UPDATE site_accounts SET totp_last_step = :step WHERE account_id = :accountId AND totp_last_step < :step',
		{ step, accountId }
	);
	return result.affectedRows === 1;
}

export async function enableTotp(accountId: number, secret: string, step: number) {
	await execute(
		`INSERT INTO site_accounts (account_id, totp_secret, totp_enabled_at, totp_last_step) VALUES (:accountId, :secret, UTC_TIMESTAMP(), :step)
		 ON DUPLICATE KEY UPDATE totp_secret = :secret, totp_enabled_at = UTC_TIMESTAMP(), totp_last_step = :step`,
		{ accountId, secret, step }
	);
}

export async function disableTotp(accountId: number) {
	await execute(
		'UPDATE site_accounts SET totp_secret = NULL, totp_enabled_at = NULL, totp_last_step = 0 WHERE account_id = :accountId',
		{ accountId }
	);
}
