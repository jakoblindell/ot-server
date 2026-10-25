import { execute, queryOne } from './db';
import { checkPassword, hashPassword, isCurrentHash } from './passwords';
import { RateLimit } from './ratelimit';

// Failed logins: per address and per account name, 10 within 15 minutes
const failuresByAddress = new RateLimit(10, 15 * 60_000);
const failuresByAccount = new RateLimit(10, 15 * 60_000);

export type LoginResult = { accountId: number } | { error: string };

export async function login(accountName: string, password: string, ip: string, userAgent: string): Promise<LoginResult> {
	const name = accountName.trim();
	if (!name || !password) return { error: 'Enter your account name and password.' };
	if (failuresByAddress.blocked(ip) || failuresByAccount.blocked(name.toLowerCase())) {
		return { error: 'Too many failed attempts. Please wait a few minutes and try again.' };
	}

	const account = await queryOne<{ id: number; password: string }>('SELECT id, password FROM accounts WHERE name = :name', { name });
	const correct = !!account && (await checkPassword(password, account.password));
	if (account) {
		await execute(
			'INSERT INTO site_login_history (account_id, ip, user_agent, success) VALUES (:id, :ip, :userAgent, :success)',
			{ id: account.id, ip, userAgent: userAgent.slice(0, 255), success: correct ? 1 : 0 }
		);
	}
	if (!account || !correct) {
		failuresByAddress.hit(ip);
		failuresByAccount.hit(name.toLowerCase());
		return { error: 'Account name or password is not correct.' };
	}

	failuresByAccount.reset(name.toLowerCase());
	// Old unsalted SHA-1 hashes are replaced, as the game server does
	if (!isCurrentHash(account.password)) {
		await execute('UPDATE accounts SET password = :hash WHERE id = :id', { hash: await hashPassword(password), id: account.id });
	}
	return { accountId: account.id };
}
