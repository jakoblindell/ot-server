import { createHash, randomBytes } from 'node:crypto';
import nodemailer from 'nodemailer';
import { config } from './config';
import { execute, queryOne } from './db';

// Email through an SMTP server (SMTP_HOST etc.). Without one, everything
// that sends mail is switched off: accounts rely on recovery keys.
export const mailEnabled = () => !!config.smtp.host;

let transport: nodemailer.Transporter | undefined;

async function send(to: string, subject: string, text: string) {
	transport ??= nodemailer.createTransport({
		host: config.smtp.host,
		port: config.smtp.port,
		secure: config.smtp.port === 465,
		auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.password } : undefined
	});
	await transport.sendMail({ from: config.smtp.from || `${config.serverName} <no-reply@${new URL(config.origin).hostname}>`, to, subject, text });
}

const hash = (token: string) => createHash('sha256').update(token).digest('hex');

async function newToken(accountId: number, kind: 'verify' | 'reset', email: string, hours: number) {
	const token = randomBytes(24).toString('base64url');
	await execute('DELETE FROM site_email_tokens WHERE account_id = :accountId AND kind = :kind', { accountId, kind });
	await execute(
		'INSERT INTO site_email_tokens (id, account_id, kind, email, expires_at) VALUES (:id, :accountId, :kind, :email, UTC_TIMESTAMP() + INTERVAL :hours HOUR)',
		{ id: hash(token), accountId, kind, email, hours }
	);
	return token;
}

/** The account (and address) of a valid link; the link is used up */
export async function useToken(token: string, kind: 'verify' | 'reset') {
	const row = await queryOne<{ account_id: number; email: string }>(
		'SELECT account_id, email FROM site_email_tokens WHERE id = :id AND kind = :kind AND expires_at > UTC_TIMESTAMP()',
		{ id: hash(token), kind }
	);
	if (!row) return null;
	await execute('DELETE FROM site_email_tokens WHERE id = :id', { id: hash(token) });
	return { accountId: row.account_id, email: row.email };
}

export async function checkToken(token: string, kind: 'verify' | 'reset') {
	return !!(await queryOne('SELECT 1 FROM site_email_tokens WHERE id = :id AND kind = :kind AND expires_at > UTC_TIMESTAMP()', { id: hash(token), kind }));
}

export async function sendVerification(accountId: number, accountName: string, email: string) {
	if (!mailEnabled()) return false;
	const token = await newToken(accountId, 'verify', email, 48);
	await send(
		email,
		`Confirm your email for ${config.serverName}`,
		`Hello,\n\nplease confirm that ${email} belongs to the ${config.serverName} account ${accountName}:\n\n${config.origin}/verify-email?token=${token}\n\nThe link works for 48 hours. If you did not create this account, ignore this email.\n\n${config.serverName}`
	);
	return true;
}

export async function sendReset(accountId: number, accountName: string, email: string) {
	if (!mailEnabled()) return false;
	const token = await newToken(accountId, 'reset', email, 1);
	await send(
		email,
		`Set a new password for ${config.serverName}`,
		`Hello,\n\nsomeone asked to set a new password for the ${config.serverName} account ${accountName}. If it was you, open this link within an hour:\n\n${config.origin}/reset-password?token=${token}\n\nIf it was not you, ignore this email; your password stays as it is.\n\n${config.serverName}`
	);
	return true;
}

export async function markVerified(accountId: number, email: string) {
	// only when the address is still the account's
	const current = await queryOne('SELECT 1 FROM accounts WHERE id = :accountId AND email = :email', { accountId, email });
	if (!current) return false;
	await execute(
		`INSERT INTO site_accounts (account_id, email_verified_at) VALUES (:accountId, UTC_TIMESTAMP())
		 ON DUPLICATE KEY UPDATE email_verified_at = UTC_TIMESTAMP()`,
		{ accountId }
	);
	return true;
}

export async function clearVerified(accountId: number) {
	await execute('UPDATE site_accounts SET email_verified_at = NULL WHERE account_id = :accountId', { accountId });
}

export async function emailVerified(accountId: number) {
	return !!(await queryOne('SELECT 1 FROM site_accounts WHERE account_id = :accountId AND email_verified_at IS NOT NULL', { accountId }));
}
