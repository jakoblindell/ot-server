import { createHash, pbkdf2, randomBytes, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

// Same format as the game server (src/passwords.cpp):
//   pbkdf2_sha256$<iterations>$<salt, hex>$<derived key, hex>
// Old accounts may still have an unsalted SHA-1 hex digest.
const PREFIX = 'pbkdf2_sha256';
const ITERATIONS = 50000;
const derive = promisify(pbkdf2);

export async function hashPassword(password: string): Promise<string> {
	const salt = randomBytes(16);
	const key = await derive(password, salt, ITERATIONS, 32, 'sha256');
	return `${PREFIX}$${ITERATIONS}$${salt.toString('hex')}$${key.toString('hex')}`;
}

export async function checkPassword(password: string, stored: string): Promise<boolean> {
	const parts = stored.split('$');
	if (parts.length === 4 && parts[0] === PREFIX) {
		const iterations = Number(parts[1]);
		const salt = Buffer.from(parts[2], 'hex');
		const expected = Buffer.from(parts[3], 'hex');
		if (!Number.isInteger(iterations) || iterations < 1 || iterations > 10_000_000 || !salt.length || !expected.length) {
			return false;
		}
		const key = await derive(password, salt, iterations, expected.length, 'sha256');
		return timingSafeEqual(key, expected);
	}
	if (/^[0-9a-f]{40}$/i.test(stored)) {
		const sha1 = createHash('sha1').update(password).digest();
		return timingSafeEqual(sha1, Buffer.from(stored, 'hex'));
	}
	return false;
}

export function isCurrentHash(stored: string) {
	return stored.startsWith(PREFIX + '$');
}

// Length limits: both login packets carry the account name and password in
// one 128-byte RSA block
export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 40;
