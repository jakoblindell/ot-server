import { createHash, randomInt } from 'node:crypto';
import type { PoolConnection } from 'mysql2/promise';
import { db, execute, queryOne } from './db';
import { hashPassword } from './passwords';

// Where and how new characters start: level 1 on Rookgaard (town 11, its
// temple). The server gives the starting equipment and asks for the outfit
// on the first login (data/creaturescripts firstitems.lua, login.lua).
const START = { townId: 11, x: 32097, y: 32219, z: 7 };
const OUTFITS = { male: 128, female: 136 } as const;
const OUTFIT_COLORS = { head: 78, body: 69, legs: 58, feet: 76 };
export const MAX_CHARACTERS = 10;
/** Days between asking to delete a character and its deletion */
export const DELETION_DAYS = 7;

export type Sex = keyof typeof OUTFITS;

async function insertCharacter(connection: PoolConnection, accountId: number, name: string, sex: Sex) {
	const now = Math.floor(Date.now() / 1000);
	const [result] = await connection.execute<import('mysql2/promise').ResultSetHeader>(
		`INSERT INTO players (name, group_id, account_id, level, vocation, health, healthmax, experience,
			lookbody, lookfeet, lookhead, looklegs, looktype, maglevel, mana, manamax, soul,
			town_id, posx, posy, posz, conditions, cap, sex)
		 VALUES (:name, 1, :accountId, 1, 0, 150, 150, 0,
			:body, :feet, :head, :legs, :looktype, 0, 0, 0, 100,
			:townId, :x, :y, :z, '', 400, :sex)`,
		{
			name,
			accountId,
			...OUTFIT_COLORS,
			looktype: OUTFITS[sex],
			...START,
			sex: sex === 'male' ? 1 : 0
		}
	);
	// Znote AAC's per-character row, which the power gamers statistics use
	await connection.execute(
		`INSERT INTO znote_players (player_id, created, hide_char, comment) VALUES (:id, :now, 0, '')`,
		{ id: result.insertId, now }
	);
	return result.insertId;
}

async function transaction<T>(work: (connection: PoolConnection) => Promise<T>): Promise<T> {
	const connection = await db.getConnection();
	try {
		await connection.beginTransaction();
		const result = await work(connection);
		await connection.commit();
		return result;
	} catch (error) {
		await connection.rollback();
		throw error;
	} finally {
		connection.release();
	}
}

/** Account with its first character. Names must be checked before. */
export async function createAccount(input: { name: string; email: string; password: string; character: string; sex: Sex }) {
	const hash = await hashPassword(input.password);
	return transaction(async (connection) => {
		const now = Math.floor(Date.now() / 1000);
		const [account] = await connection.execute<import('mysql2/promise').ResultSetHeader>(
			`INSERT INTO accounts (name, password, email, creation, type, premdays) VALUES (:name, :hash, :email, :now, 1, 0)`,
			{ name: input.name, hash, email: input.email, now }
		);
		await connection.execute(
			`INSERT INTO znote_accounts (account_id, ip, created, flag) VALUES (:id, 0, :now, '')`,
			{ id: account.insertId, now }
		);
		await insertCharacter(connection, account.insertId, input.character, input.sex);
		return account.insertId;
	});
}

export async function createCharacter(accountId: number, name: string, sex: Sex) {
	return transaction((connection) => insertCharacter(connection, accountId, name, sex));
}

export async function characterCount(accountId: number) {
	const row = await queryOne<{ count: number }>('SELECT COUNT(*) AS count FROM players WHERE account_id = :accountId', { accountId });
	return row?.count ?? 0;
}

/** Marks a character for deletion in DELETION_DAYS days. It cannot log in meanwhile. */
export async function scheduleDeletion(accountId: number, name: string) {
	const result = await execute(
		`UPDATE players SET deletion = UNIX_TIMESTAMP() + :seconds
		 WHERE account_id = :accountId AND name = :name AND deletion = 0
		 AND id NOT IN (SELECT player_id FROM players_online)`,
		{ seconds: DELETION_DAYS * 86400, accountId, name }
	);
	return result.affectedRows === 1;
}

export async function cancelDeletion(accountId: number, name: string) {
	const result = await execute('UPDATE players SET deletion = 0 WHERE account_id = :accountId AND name = :name', { accountId, name });
	return result.affectedRows === 1;
}

/** Deletes characters whose waiting time is over (and that are not online) */
export async function deleteDueCharacters() {
	await execute(
		`DELETE FROM players WHERE deletion > 0 AND deletion <= UNIX_TIMESTAMP()
		 AND id NOT IN (SELECT player_id FROM players_online)`
	);
	// Znote's per-character rows have no foreign key
	await execute('DELETE z FROM znote_players z LEFT JOIN players p ON p.id = z.player_id WHERE p.id IS NULL');
}

export async function setPassword(accountId: number, password: string) {
	await execute('UPDATE accounts SET password = :hash WHERE id = :accountId', { hash: await hashPassword(password), accountId });
}

export async function setEmail(accountId: number, email: string) {
	await execute('UPDATE accounts SET email = :email WHERE id = :accountId', { email, accountId });
}

export async function emailTaken(email: string, exceptAccountId = 0) {
	return !!(await queryOne('SELECT id FROM accounts WHERE email = :email AND id <> :exceptAccountId', { email, exceptAccountId }));
}

export function emailError(email: string): string | null {
	if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address.';
	return null;
}

// Recovery keys: shown once, stored as SHA-256 (they are random, so a fast
// hash is enough). Letters and digits that cannot be confused.
const KEY_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function keyHash(key: string) {
	return createHash('sha256').update(key.replace(/[^A-Z0-9]/gi, '').toUpperCase()).digest('hex');
}

export async function createRecoveryKey(accountId: number) {
	const groups = Array.from({ length: 5 }, () =>
		Array.from({ length: 4 }, () => KEY_ALPHABET[randomInt(KEY_ALPHABET.length)]).join('')
	);
	const key = groups.join('-');
	await execute(
		`INSERT INTO site_accounts (account_id, recovery_key_hash, recovery_key_created) VALUES (:accountId, :hash, UTC_TIMESTAMP())
		 ON DUPLICATE KEY UPDATE recovery_key_hash = :hash, recovery_key_created = UTC_TIMESTAMP()`,
		{ accountId, hash: keyHash(key) }
	);
	return key;
}

/** The account id when the name and recovery key match */
export async function checkRecoveryKey(accountName: string, key: string) {
	const row = await queryOne<{ id: number }>(
		`SELECT a.id FROM accounts a JOIN site_accounts s ON s.account_id = a.id
		 WHERE a.name = :accountName AND s.recovery_key_hash = :hash`,
		{ accountName, hash: keyHash(key) }
	);
	return row?.id ?? null;
}

export async function siteAccount(accountId: number) {
	return queryOne<{ recovery_key_created: Date | null; free_premium_at: Date | null; show_characters: number }>(
		'SELECT recovery_key_created, free_premium_at, show_characters FROM site_accounts WHERE account_id = :accountId',
		{ accountId }
	);
}

/** Premium days still left, aged like the game server does (Game::updatePremium) */
export function premiumDaysLeft(premdays: number, lastday: number) {
	if (premdays === 0 || premdays === 65535) return premdays;
	if (!lastday) return premdays;
	return Math.max(0, premdays - Math.floor((Date.now() / 1000 - lastday) / 86400));
}

export const FREE_PREMIUM_HOURS = 24;

/** "Get premium": one day, at most once per FREE_PREMIUM_HOURS. False when too soon. */
export async function addFreePremiumDay(accountId: number) {
	return transaction(async (connection) => {
		const [rows] = await connection.query<import('./db').Row[]>(
			`SELECT free_premium_at FROM site_accounts WHERE account_id = ? FOR UPDATE`,
			[accountId]
		);
		const last = rows[0]?.free_premium_at as Date | null | undefined;
		if (last && Date.now() - last.getTime() < FREE_PREMIUM_HOURS * 3600_000) return false;
		await connection.execute(
			`INSERT INTO site_accounts (account_id, free_premium_at) VALUES (?, UTC_TIMESTAMP())
			 ON DUPLICATE KEY UPDATE free_premium_at = UTC_TIMESTAMP()`,
			[accountId]
		);
		// Days already used up are taken off first, as the server would
		const [accounts] = await connection.query<import('./db').Row[]>(
			'SELECT premdays, lastday FROM accounts WHERE id = ? FOR UPDATE',
			[accountId]
		);
		let { premdays, lastday } = accounts[0] as { premdays: number; lastday: number };
		if (premdays >= 65000) return true;
		if (premdays > 0 && lastday > 0) {
			const used = Math.floor((Date.now() / 1000 - lastday) / 86400);
			if (used >= premdays) {
				premdays = 0;
				lastday = 0;
			} else {
				premdays -= used;
				lastday += used * 86400;
			}
		}
		await connection.execute('UPDATE accounts SET premdays = ?, lastday = ? WHERE id = ?', [premdays + 1, lastday, accountId]);
		return true;
	});
}

/** Whether the account's characters list each other on their public pages */
export async function setShowCharacters(accountId: number, show: boolean) {
	await execute(
		`INSERT INTO site_accounts (account_id, show_characters) VALUES (:accountId, :show)
		 ON DUPLICATE KEY UPDATE show_characters = :show`,
		{ accountId, show: show ? 1 : 0 }
	);
}
