import { execute, query, queryOne } from './db';

// Punishments in the game server's own tables, which it checks at login
// (src/ban.cpp): account_bans, ip_bans, player_namelocks. They are signed by
// a character ("banned_by"): the staff member's main character.

/** IPv4 in the game's number form: a.b.c.d is a + b<<8 + c<<16 + d<<24 */
export function ipToNumber(ip: string): number | null {
	const parts = ip.trim().split('.').map(Number);
	if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return null;
	return (parts[0] + parts[1] * 256 + parts[2] * 65536 + parts[3] * 16777216) >>> 0;
}

export function numberToIp(value: number) {
	if (!value) return '';
	return [value & 255, (value >>> 8) & 255, (value >>> 16) & 255, (value >>> 24) & 255].join('.');
}

export async function staffCharacterId(accountId: number) {
	const row = await queryOne<{ id: number }>(
		'SELECT id FROM players WHERE account_id = :accountId ORDER BY group_id DESC, level DESC LIMIT 1',
		{ accountId }
	);
	return row?.id ?? null;
}

export async function banAccount(accountId: number, reason: string, days: number, byPlayerId: number) {
	await execute(
		`REPLACE INTO account_bans (account_id, reason, banned_at, expires_at, banned_by)
		 VALUES (:accountId, :reason, UNIX_TIMESTAMP(), :expires, :by)`,
		{ accountId, reason, expires: days > 0 ? Math.floor(Date.now() / 1000) + days * 86400 : 0, by: byPlayerId }
	);
}

/** Lifts a ban early; it goes to the history like an expired one */
export async function unbanAccount(accountId: number) {
	await execute(
		`INSERT INTO account_ban_history (account_id, reason, banned_at, expired_at, banned_by)
		 SELECT account_id, reason, banned_at, UNIX_TIMESTAMP(), banned_by FROM account_bans WHERE account_id = :accountId`,
		{ accountId }
	);
	await execute('DELETE FROM account_bans WHERE account_id = :accountId', { accountId });
}

export async function banIp(ip: number, reason: string, days: number, byPlayerId: number) {
	await execute(
		`REPLACE INTO ip_bans (ip, reason, banned_at, expires_at, banned_by) VALUES (:ip, :reason, UNIX_TIMESTAMP(), :expires, :by)`,
		{ ip, reason, expires: days > 0 ? Math.floor(Date.now() / 1000) + days * 86400 : 0, by: byPlayerId }
	);
}

export async function unbanIp(ip: number) {
	await execute('DELETE FROM ip_bans WHERE ip = :ip', { ip });
}

export async function namelock(playerId: number, reason: string, byPlayerId: number) {
	await execute(
		`REPLACE INTO player_namelocks (player_id, reason, namelocked_at, namelocked_by) VALUES (:playerId, :reason, UNIX_TIMESTAMP(), :by)`,
		{ playerId, reason, by: byPlayerId }
	);
}

export async function removeNamelock(playerId: number) {
	await execute('DELETE FROM player_namelocks WHERE player_id = :playerId', { playerId });
}

export async function addNote(accountId: number, playerName: string, text: string, by: string) {
	await execute('INSERT INTO site_notes (account_id, player_name, text, created_by) VALUES (:accountId, :playerName, :text, :by)', {
		accountId,
		playerName,
		text,
		by
	});
}

export async function currentBans() {
	const [accounts, ips, namelocks] = await Promise.all([
		query<{ account_id: number; account: string; reason: string; banned_at: number; expires_at: number; by: string | null; characters: string | null }>(
			`SELECT b.account_id, a.name AS account, b.reason, b.banned_at, b.expires_at, p.name AS \`by\`,
				(SELECT GROUP_CONCAT(c.name ORDER BY c.level DESC SEPARATOR ', ') FROM players c WHERE c.account_id = b.account_id) AS characters
			 FROM account_bans b JOIN accounts a ON a.id = b.account_id LEFT JOIN players p ON p.id = b.banned_by
			 WHERE b.expires_at = 0 OR b.expires_at > UNIX_TIMESTAMP() ORDER BY b.banned_at DESC`
		),
		query<{ ip: number; reason: string; banned_at: number; expires_at: number; by: string | null }>(
			`SELECT b.ip, b.reason, b.banned_at, b.expires_at, p.name AS \`by\` FROM ip_bans b LEFT JOIN players p ON p.id = b.banned_by
			 WHERE b.expires_at = 0 OR b.expires_at > UNIX_TIMESTAMP() ORDER BY b.banned_at DESC`
		),
		query<{ player_id: number; name: string; reason: string; namelocked_at: number; by: string | null }>(
			`SELECT n.player_id, c.name, n.reason, n.namelocked_at, p.name AS \`by\` FROM player_namelocks n
			 JOIN players c ON c.id = n.player_id LEFT JOIN players p ON p.id = n.namelocked_by ORDER BY n.namelocked_at DESC`
		)
	]);
	return { accounts, ips: ips.map((ban) => ({ ...ban, address: numberToIp(Number(ban.ip)) })), namelocks };
}
