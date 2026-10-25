import { createHash, randomBytes } from 'node:crypto';
import type { Cookies } from '@sveltejs/kit';
import { config } from './config';
import { execute, queryOne } from './db';

// Logged-in sessions: a random token in an HttpOnly cookie, stored in
// site_sessions as its SHA-256 (a leaked table does not log anyone in).
export const SESSION_COOKIE = 'ew_session';
/** A login that still needs its two-step code */
export const PENDING_COOKIE = 'ew_pending';
const PENDING_MINUTES = 10;
const SHORT_SESSION_HOURS = 12;
const LONG_SESSION_DAYS = 30;

export type SessionAccount = { id: number; name: string; type: number; premdays: number; lastday: number; email: string; creation: number };

function tokenHash(token: string) {
	return createHash('sha256').update(token).digest('hex');
}

export async function createSession(cookies: Cookies, accountId: number, remember: boolean, ip: string, userAgent: string) {
	const token = randomBytes(32).toString('base64url');
	const lifetime = remember ? LONG_SESSION_DAYS * 24 * 3600 : SHORT_SESSION_HOURS * 3600;
	await execute(
		`INSERT INTO site_sessions (id, account_id, expires_at, ip, user_agent)
		 VALUES (:id, :accountId, UTC_TIMESTAMP() + INTERVAL :lifetime SECOND, :ip, :userAgent)`,
		{ id: tokenHash(token), accountId, lifetime, ip, userAgent: userAgent.slice(0, 255) }
	);
	cookies.set(SESSION_COOKIE, token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: config.secureCookies,
		// "Keep me logged in": a cookie that outlives the browser session
		...(remember ? { maxAge: lifetime } : {})
	});
}

export async function getSessionAccount(cookies: Cookies): Promise<SessionAccount | null> {
	const token = cookies.get(SESSION_COOKIE);
	if (!token) return null;
	const account = await queryOne<SessionAccount>(
		`SELECT a.id, a.name, a.type, a.premdays, a.lastday, a.email, a.creation
		 FROM site_sessions s JOIN accounts a ON a.id = s.account_id
		 WHERE s.id = :id AND s.expires_at > UTC_TIMESTAMP() AND s.pending = 0`,
		{ id: tokenHash(token) }
	);
	if (!account) {
		cookies.delete(SESSION_COOKIE, { path: '/' });
		return null;
	}
	return account;
}

export async function endSession(cookies: Cookies) {
	const token = cookies.get(SESSION_COOKIE);
	if (token) {
		await execute('DELETE FROM site_sessions WHERE id = :id', { id: tokenHash(token) });
	}
	cookies.delete(SESSION_COOKIE, { path: '/' });
}

/** Logs the account out everywhere (after a password change, for example) */
export async function endAllSessions(accountId: number) {
	await execute('DELETE FROM site_sessions WHERE account_id = :accountId', { accountId });
}

export async function removeExpiredSessions() {
	await execute('DELETE FROM site_sessions WHERE expires_at <= UTC_TIMESTAMP()');
}

/** After the password, for accounts with two-step login: wait for the code */
export async function createPendingLogin(cookies: Cookies, accountId: number, remember: boolean, ip: string, userAgent: string) {
	const token = randomBytes(32).toString('base64url');
	await execute(
		`INSERT INTO site_sessions (id, account_id, expires_at, ip, user_agent, pending)
		 VALUES (:id, :accountId, UTC_TIMESTAMP() + INTERVAL :minutes MINUTE, :ip, :userAgent, 1)`,
		{ id: tokenHash(token), accountId, minutes: PENDING_MINUTES, ip, userAgent: userAgent.slice(0, 255) }
	);
	cookies.set(PENDING_COOKIE, `${token}.${remember ? 1 : 0}`, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: config.secureCookies,
		maxAge: PENDING_MINUTES * 60
	});
}

export async function getPendingLogin(cookies: Cookies) {
	const [token, remember] = (cookies.get(PENDING_COOKIE) ?? '').split('.');
	if (!token) return null;
	const row = await queryOne<{ account_id: number }>(
		'SELECT account_id FROM site_sessions WHERE id = :id AND pending = 1 AND expires_at > UTC_TIMESTAMP()',
		{ id: tokenHash(token) }
	);
	return row ? { accountId: row.account_id, remember: remember === '1' } : null;
}

export async function endPendingLogin(cookies: Cookies) {
	const [token] = (cookies.get(PENDING_COOKIE) ?? '').split('.');
	if (token) await execute('DELETE FROM site_sessions WHERE id = :id AND pending = 1', { id: tokenHash(token) });
	cookies.delete(PENDING_COOKIE, { path: '/' });
}
