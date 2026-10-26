import type { PoolConnection, ResultSetHeader } from 'mysql2/promise';
import { config } from './config';
import { db, execute, query, queryOne } from './db';
import { reservedNames } from './gamedata';

// Guilds on the website, in the game's own tables (guilds, guild_ranks,
// guild_membership, guild_invites). A new guild gets the three ranks from
// the oncreate_guilds trigger: leader (level 3), vice-leader (2), member (1).
// The game reads a character's guild when it logs in, so changes show in
// the game after the next login.

export const GUILD_MIN_LEVEL = config.guildMinLevel;
export const LEADER = 3;
export const VICE = 2;

export type Rank = { id: number; name: string; level: number };

export function guildNameError(name: string): string | null {
	if (name.length < 3 || name.length > 30) return 'A guild name needs 3 to 30 characters.';
	if (!/^[A-Za-z][A-Za-z' -]*[A-Za-z]$/.test(name)) return 'Use letters, spaces, apostrophes and hyphens.';
	if (/ {2}|''|--/.test(name)) return 'No double spaces or punctuation.';
	if (/(.)\1\1/i.test(name)) return 'The same letter may not appear three times in a row.';
	return null;
}

/** The account's characters, with their guild and rank */
export async function accountCharacters(accountId: number) {
	return query<{ id: number; name: string; level: number; guild_id: number | null; guild: string | null; rank_level: number | null }>(
		`SELECT p.id, p.name, p.level, m.guild_id, g.name AS guild, r.level AS rank_level
		 FROM players p LEFT JOIN guild_membership m ON m.player_id = p.id
		 LEFT JOIN guilds g ON g.id = m.guild_id LEFT JOIN guild_ranks r ON r.id = m.rank_id
		 WHERE p.account_id = :accountId AND p.deletion = 0 ORDER BY p.level DESC`,
		{ accountId }
	);
}

async function transaction<T>(work: (connection: PoolConnection) => Promise<T>) {
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

export async function foundGuild(accountId: number, leaderId: number, name: string) {
	const error = guildNameError(name);
	if (error) return { error };
	if ((await reservedNames()).has(name.toLowerCase())) return { error: 'That is the name of a creature, NPC or spell.' };
	const leader = (await accountCharacters(accountId)).find((character) => character.id === leaderId);
	if (!leader) return { error: 'Pick one of your characters.' };
	if (leader.guild_id) return { error: `${leader.name} is already in a guild.` };
	if (leader.level < GUILD_MIN_LEVEL) return { error: `The leader needs level ${GUILD_MIN_LEVEL}.` };
	if (await queryOne('SELECT id FROM guilds WHERE name = :name', { name })) return { error: 'That name is taken.' };
	await transaction(async (connection) => {
		const [guild] = await connection.execute<ResultSetHeader>(
			'INSERT INTO guilds (name, ownerid, creationdata, motd) VALUES (?, ?, UNIX_TIMESTAMP(), ?)',
			[name, leaderId, '']
		);
		await connection.execute(
			`INSERT INTO guild_membership (player_id, guild_id, rank_id, nick)
			 SELECT ?, ?, id, '' FROM guild_ranks WHERE guild_id = ? AND level = ?`,
			[leaderId, guild.insertId, guild.insertId, LEADER]
		);
		await connection.execute('DELETE FROM guild_invites WHERE player_id = ?', [leaderId]);
	});
	return { name };
}

export async function guildRanks(guildId: number) {
	return query<Rank>('SELECT id, name, level FROM guild_ranks WHERE guild_id = :guildId ORDER BY level DESC', { guildId });
}

/** The highest rank the account holds in the guild (0: none), and with which character */
export async function standing(accountId: number, guildId: number) {
	const row = await queryOne<{ level: number; name: string; id: number }>(
		`SELECT r.level, p.name, p.id FROM guild_membership m JOIN players p ON p.id = m.player_id JOIN guild_ranks r ON r.id = m.rank_id
		 WHERE p.account_id = :accountId AND m.guild_id = :guildId ORDER BY r.level DESC LIMIT 1`,
		{ accountId, guildId }
	);
	return row ?? { level: 0, name: '', id: 0 };
}

async function member(guildId: number, name: string) {
	return queryOne<{ id: number; name: string; account_id: number; level: number }>(
		`SELECT p.id, p.name, p.account_id, r.level FROM guild_membership m JOIN players p ON p.id = m.player_id
		 JOIN guild_ranks r ON r.id = m.rank_id WHERE m.guild_id = :guildId AND p.name = :name`,
		{ guildId, name }
	);
}

export async function invite(guildId: number, name: string) {
	const player = await queryOne<{ id: number; name: string; in_guild: number }>(
		`SELECT p.id, p.name, EXISTS (SELECT 1 FROM guild_membership m WHERE m.player_id = p.id) AS in_guild
		 FROM players p WHERE p.name = :name AND p.deletion = 0`,
		{ name }
	);
	if (!player) return { error: `There is no character called ${name}.` };
	if (player.in_guild) return { error: `${player.name} is already in a guild.` };
	await execute('INSERT IGNORE INTO guild_invites (player_id, guild_id) VALUES (:player, :guild)', { player: player.id, guild: guildId });
	return { name: player.name };
}

export async function cancelInvite(guildId: number, name: string) {
	await execute(
		'DELETE i FROM guild_invites i JOIN players p ON p.id = i.player_id WHERE i.guild_id = :guildId AND p.name = :name',
		{ guildId, name }
	);
}

/** Joins with the lowest rank; the character must be the account's and invited */
export async function acceptInvite(accountId: number, guildId: number, playerId: number) {
	const invited = await queryOne(
		`SELECT 1 FROM guild_invites i JOIN players p ON p.id = i.player_id
		 WHERE i.guild_id = :guildId AND p.id = :playerId AND p.account_id = :accountId
		 AND NOT EXISTS (SELECT 1 FROM guild_membership m WHERE m.player_id = p.id)`,
		{ guildId, playerId, accountId }
	);
	if (!invited) return false;
	await transaction(async (connection) => {
		await connection.execute(
			`INSERT INTO guild_membership (player_id, guild_id, rank_id, nick)
			 SELECT ?, ?, id, '' FROM guild_ranks WHERE guild_id = ? ORDER BY level LIMIT 1`,
			[playerId, guildId, guildId]
		);
		await connection.execute('DELETE FROM guild_invites WHERE player_id = ?', [playerId]);
	});
	return true;
}

export async function declineInvite(accountId: number, guildId: number, playerId: number) {
	await execute(
		`DELETE i FROM guild_invites i JOIN players p ON p.id = i.player_id
		 WHERE i.guild_id = :guildId AND p.id = :playerId AND p.account_id = :accountId`,
		{ guildId, playerId, accountId }
	);
}

export async function leave(accountId: number, guildId: number, playerId: number) {
	const row = await queryOne<{ level: number }>(
		`SELECT r.level FROM guild_membership m JOIN players p ON p.id = m.player_id JOIN guild_ranks r ON r.id = m.rank_id
		 WHERE m.guild_id = :guildId AND p.id = :playerId AND p.account_id = :accountId`,
		{ guildId, playerId, accountId }
	);
	if (!row) return { error: 'That character is not in this guild.' };
	if (row.level >= LEADER) return { error: 'The leader cannot leave: hand the guild over or disband it.' };
	await execute('DELETE FROM guild_membership WHERE player_id = :playerId AND guild_id = :guildId', { playerId, guildId });
	return {};
}

/** Removes a member of a lower rank than the one acting */
export async function kick(guildId: number, actingLevel: number, name: string) {
	const target = await member(guildId, name);
	if (!target) return { error: `${name} is not a member.` };
	if (target.level >= actingLevel) return { error: 'You can only remove members of a lower rank.' };
	await execute('DELETE FROM guild_membership WHERE player_id = :id AND guild_id = :guildId', { id: target.id, guildId });
	return { name: target.name };
}

export async function setRank(guildId: number, name: string, rankId: number) {
	const target = await member(guildId, name);
	const rank = await queryOne<Rank>('SELECT id, name, level FROM guild_ranks WHERE id = :rankId AND guild_id = :guildId', { rankId, guildId });
	if (!target || !rank) return { error: 'Pick a member and a rank.' };
	if (target.level >= LEADER) return { error: 'The leader keeps the leader rank; hand the guild over instead.' };
	if (rank.level >= LEADER) return { error: 'There is one leader; hand the guild over instead.' };
	await execute('UPDATE guild_membership SET rank_id = :rankId WHERE player_id = :id', { rankId, id: target.id });
	return { name: target.name, rank: rank.name };
}

export async function setNick(guildId: number, name: string, nick: string) {
	const target = await member(guildId, name);
	if (!target) return { error: `${name} is not a member.` };
	await execute('UPDATE guild_membership SET nick = :nick WHERE player_id = :id', { nick: nick.slice(0, 15), id: target.id });
	return { name: target.name };
}

export async function renameRanks(guildId: number, names: Record<number, string>) {
	for (const [id, name] of Object.entries(names)) {
		const clean = name.trim().slice(0, 30);
		if (clean) await execute('UPDATE guild_ranks SET name = :name WHERE id = :id AND guild_id = :guildId', { name: clean, id: Number(id), guildId });
	}
}

export async function handOver(guildId: number, leaderId: number, name: string) {
	const target = await member(guildId, name);
	if (!target || target.id === leaderId) return { error: 'Pick another member.' };
	const ranks = await guildRanks(guildId);
	const leaderRank = ranks.find((rank) => rank.level === LEADER);
	const viceRank = ranks.find((rank) => rank.level === VICE);
	if (!leaderRank || !viceRank) return { error: 'The guild is missing its ranks.' };
	await transaction(async (connection) => {
		await connection.execute('UPDATE guild_membership SET rank_id = ? WHERE player_id = ?', [leaderRank.id, target.id]);
		await connection.execute('UPDATE guild_membership SET rank_id = ? WHERE player_id = ?', [viceRank.id, leaderId]);
		await connection.execute('UPDATE guilds SET ownerid = ? WHERE id = ?', [target.id, guildId]);
	});
	return { name: target.name };
}

export async function setTexts(guildId: number, motd: string, description: string) {
	await execute('UPDATE guilds SET motd = :motd WHERE id = :guildId', { motd: motd.slice(0, 255), guildId });
	await execute(
		'INSERT INTO site_guilds (guild_id, description) VALUES (:guildId, :description) ON DUPLICATE KEY UPDATE description = :description',
		{ guildId, description: description.slice(0, 4000) }
	);
}

export async function disband(guildId: number) {
	await execute('DELETE FROM guilds WHERE id = :guildId', { guildId });
}
