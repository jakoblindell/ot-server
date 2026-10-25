import { fail } from '@sveltejs/kit';
import { commandResult, sendCommand } from '$lib/server/commands';
import { query, queryOne, execute } from '$lib/server/db';
import { towns, vocationBadge, vocationName } from '$lib/server/game';
import { addNote, banAccount, banIp, ipToNumber, namelock, numberToIp, staffCharacterId } from '$lib/server/moderation';
import { audit, can, requireStaff } from '$lib/server/staff';
import type { Actions, PageServerLoad, RequestEvent } from './$types';

type Row = {
	id: number;
	name: string;
	level: number;
	vocation: number;
	lastip: number;
	account_id: number;
	account: string;
	online: number;
	banned: number;
	namelocked: number;
	notes: number;
};

const LIST_COLUMNS = `p.id, p.name, p.level, p.vocation, p.lastip, p.account_id, a.name AS account,
	(o.player_id IS NOT NULL) AS online,
	EXISTS (SELECT 1 FROM account_bans b WHERE b.account_id = a.id AND (b.expires_at = 0 OR b.expires_at > UNIX_TIMESTAMP())) AS banned,
	EXISTS (SELECT 1 FROM player_namelocks n WHERE n.player_id = p.id) AS namelocked,
	(SELECT COUNT(*) FROM site_notes s WHERE s.account_id = a.id) AS notes`;
const LIST_FROM = 'FROM players p JOIN accounts a ON a.id = p.account_id LEFT JOIN players_online o ON o.player_id = p.id';

export const load: PageServerLoad = async (event) => {
	await requireStaff(event, 'players');
	const q = (event.url.searchParams.get('q') ?? '').trim().slice(0, 64);
	const filter = event.url.searchParams.get('filter') ?? 'all';
	const conditions: string[] = [];
	const params: Record<string, unknown> = {};
	if (q) {
		const ip = ipToNumber(q);
		if (ip !== null) {
			conditions.push('p.lastip = :ip');
			params.ip = ip;
		} else {
			conditions.push('(p.name LIKE :like OR a.name = :q OR a.email LIKE :like)');
			params.like = `%${q.replace(/[%_\\]/g, '\\$&')}%`;
			params.q = q;
		}
	}
	if (filter === 'online') conditions.push('o.player_id IS NOT NULL');
	if (filter === 'banned') conditions.push('EXISTS (SELECT 1 FROM account_bans b WHERE b.account_id = a.id)');
	if (filter === 'flagged') conditions.push('EXISTS (SELECT 1 FROM site_notes s WHERE s.account_id = a.id)');
	const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

	const [rows, totals] = await Promise.all([
		query<Row>(`SELECT ${LIST_COLUMNS} ${LIST_FROM} ${where} ORDER BY online DESC, p.level DESC, p.name LIMIT 50`, params),
		queryOne<{ characters: number; accounts: number; online: number }>(
			'SELECT (SELECT COUNT(*) FROM players) AS characters, (SELECT COUNT(*) FROM accounts) AS accounts, (SELECT COUNT(*) FROM players_online) AS online'
		)
	]);

	const selectedName = event.url.searchParams.get('player');
	const selected = selectedName ? await details(selectedName) : null;

	return {
		q,
		filter,
		totals,
		rows: rows.map((row) => ({
			name: row.name,
			level: row.level,
			vocation: vocationBadge(row.vocation),
			account: row.account,
			ip: numberToIp(Number(row.lastip)),
			online: !!row.online,
			banned: !!row.banned,
			namelocked: !!row.namelocked,
			notes: Number(row.notes)
		})),
		selected
	};
};

async function details(name: string) {
	const player = await queryOne<{
		id: number;
		name: string;
		level: number;
		vocation: number;
		town_id: number;
		posx: number;
		posy: number;
		posz: number;
		lastip: number;
		lastlogin: number;
		group_id: number;
		account_id: number;
		account: string;
		email: string;
		type: number;
		creation: number;
		online: number;
	}>(
		`SELECT p.id, p.name, p.level, p.vocation, p.town_id, p.posx, p.posy, p.posz, p.lastip, p.lastlogin, p.group_id,
			a.id AS account_id, a.name AS account, a.email, a.type, a.creation, (o.player_id IS NOT NULL) AS online
		 FROM players p JOIN accounts a ON a.id = p.account_id LEFT JOIN players_online o ON o.player_id = p.id WHERE p.name = :name`,
		{ name }
	);
	if (!player) return null;
	const [characters, sameIp, ban, namelocked, notes, history] = await Promise.all([
		query<{ name: string; level: number }>('SELECT name, level FROM players WHERE account_id = :id ORDER BY level DESC', { id: player.account_id }),
		player.lastip
			? queryOne<{ count: number }>('SELECT COUNT(DISTINCT account_id) AS count FROM players WHERE lastip = :ip AND account_id <> :id', {
					ip: player.lastip,
					id: player.account_id
				})
			: Promise.resolve({ count: 0 }),
		queryOne<{ reason: string; expires_at: number }>(
			'SELECT reason, expires_at FROM account_bans WHERE account_id = :id AND (expires_at = 0 OR expires_at > UNIX_TIMESTAMP())',
			{ id: player.account_id }
		),
		queryOne('SELECT 1 FROM player_namelocks WHERE player_id = :id', { id: player.id }),
		query<{ id: number; text: string; player_name: string; created_by: string; created_at: Date }>(
			'SELECT id, text, player_name, created_by, created_at FROM site_notes WHERE account_id = :id ORDER BY id DESC',
			{ id: player.account_id }
		),
		query<{ id: number; action: string; details: string; actor: string; created_at: Date }>(
			`SELECT id, action, details, actor, created_at FROM site_audit_log
			 WHERE target_account_id = :id AND action <> 'player.note' ORDER BY id DESC LIMIT 20`,
			{ id: player.account_id }
		)
	]);
	return {
		name: player.name,
		level: player.level,
		vocation: vocationName(player.vocation),
		town: towns[player.town_id] ?? '–',
		position: `${player.posx}, ${player.posy}, ${player.posz}`,
		online: !!player.online,
		staff: player.group_id > 1 || player.type > 1,
		ip: numberToIp(Number(player.lastip)),
		lastLogin: player.lastlogin * 1000,
		account: { name: player.account, email: player.email, created: player.creation * 1000 },
		characters,
		sameIpAccounts: Number(sameIp?.count ?? 0),
		ban: ban ? { reason: ban.reason, until: ban.expires_at * 1000 } : null,
		namelocked: !!namelocked,
		notes: notes.map((note) => ({ id: note.id, text: note.text, player: note.player_name, by: note.created_by, at: note.created_at.getTime() })),
		history: history.map((entry) => ({ id: entry.id, action: entry.action, details: entry.details, by: entry.actor, at: entry.created_at.getTime() }))
	};
}

/** The character a form acts on, with its account */
async function target(event: RequestEvent, form: FormData) {
	const name = String(form.get('player') ?? '');
	const player = await queryOne<{ id: number; name: string; account_id: number; group_id: number; type: number; lastip: number }>(
		'SELECT p.id, p.name, p.account_id, p.group_id, a.type, p.lastip FROM players p JOIN accounts a ON a.id = p.account_id WHERE p.name = :name',
		{ name }
	);
	return player;
}

async function serverCommand(event: RequestEvent, command: 'kick' | 'temple' | 'message' | 'mute', player: string, args: { text?: string; number?: number }) {
	const id = await sendCommand(command, event.locals.account!.name, { target: player, ...args });
	return commandResult(id);
}

function reason(form: FormData) {
	return String(form.get('reason') ?? '').trim().slice(0, 255);
}

export const actions: Actions = {
	message: async (event) => {
		await requireStaff(event, 'players');
		const form = await event.request.formData();
		const player = await target(event, form);
		const text = String(form.get('text') ?? '').trim().slice(0, 255);
		if (!player || !text) return fail(400, { error: 'Pick a character and write a message.' });
		const result = await serverCommand(event, 'message', player.name, { text });
		await audit(event, 'player.message', `Message to ${player.name}: "${text}"`, { accountId: player.account_id, player: player.name });
		return result.status === 'failed' ? fail(400, { error: result.result }) : { message: result.result };
	},
	kick: async (event) => {
		await requireStaff(event, 'players');
		const player = await target(event, await event.request.formData());
		if (!player) return fail(400, { error: 'No such character.' });
		const result = await serverCommand(event, 'kick', player.name, {});
		await audit(event, 'player.kick', `Kicked ${player.name}`, { accountId: player.account_id, player: player.name });
		return result.status === 'failed' ? fail(400, { error: result.result }) : { message: result.result };
	},
	temple: async (event) => {
		await requireStaff(event, 'players');
		const player = await target(event, await event.request.formData());
		if (!player) return fail(400, { error: 'No such character.' });
		const result = await serverCommand(event, 'temple', player.name, {});
		await audit(event, 'player.temple', `Sent ${player.name} to the temple`, { accountId: player.account_id, player: player.name });
		return result.status === 'failed' ? fail(400, { error: result.result }) : { message: result.result };
	},
	note: async (event) => {
		const staff = await requireStaff(event, 'players');
		const form = await event.request.formData();
		const player = await target(event, form);
		const text = String(form.get('text') ?? '').trim().slice(0, 1000);
		if (!player || !text) return fail(400, { error: 'Write the note first.' });
		await addNote(player.account_id, player.name, text, staff.name);
		await audit(event, 'player.note', `Note on ${player.name}: ${text}`, { accountId: player.account_id, player: player.name });
		return { message: 'Note added.' };
	},
	punish: async (event) => {
		const staff = await requireStaff(event, 'punish');
		const form = await event.request.formData();
		const player = await target(event, form);
		const kind = String(form.get('kind') ?? '');
		const days = Number(form.get('days') ?? 0);
		const why = reason(form);
		if (!player) return fail(400, { error: 'No such character.' });
		if (!why) return fail(400, { error: 'Give a reason; the player sees it.' });
		if (player.group_id > 1 || player.type > 1) return fail(400, { error: 'Staff accounts cannot be punished here.' });
		if (![1, 7, 30, 0].includes(days)) return fail(400, { error: 'Pick a duration.' });
		const hard = days === 0 || kind === 'ipban' || kind === 'delete';
		if (hard && !can(staff, 'punishHard')) return fail(403, { error: 'Only gods can give permanent bans, IP bans or delete characters.' });
		const by = await staffCharacterId(staff.id);
		if (!by && kind !== 'mute' && kind !== 'delete') return fail(400, { error: 'Your account needs a character to sign punishments with.' });
		const length = days ? `${days} day${days === 1 ? '' : 's'}` : 'permanent';
		const audited = (action: string, text: string) => audit(event, action, text, { accountId: player.account_id, player: player.name });

		switch (kind) {
			case 'mute': {
				const minutes = days ? days * 24 * 60 : 60 * 24 * 365;
				const result = await serverCommand(event, 'mute', player.name, { number: minutes });
				if (result.status === 'failed') return fail(400, { error: `${result.result} (mutes need the character online)` });
				await audited('punish.mute', `Muted ${player.name}, ${length}: ${why}`);
				return { message: result.result };
			}
			case 'ban': {
				await banAccount(player.account_id, why, days, by!);
				const online = await query<{ name: string }>(
					'SELECT p.name FROM players p JOIN players_online o ON o.player_id = p.id WHERE p.account_id = :id',
					{ id: player.account_id }
				);
				for (const character of online) await sendCommand('kick', staff.name, { target: character.name });
				await audited('punish.ban', `Banned account of ${player.name}, ${length}: ${why}`);
				return { message: `Account banned (${length}).` };
			}
			case 'namelock': {
				await namelock(player.id, why, by!);
				await sendCommand('kick', staff.name, { target: player.name });
				await audited('punish.namelock', `Namelocked ${player.name}: ${why}`);
				return { message: `${player.name} is namelocked: the owner has to pick a new name on the website.` };
			}
			case 'ipban': {
				if (!player.lastip) return fail(400, { error: 'This character has no known address.' });
				await banIp(player.lastip, why, days, by!);
				await audited('punish.ipban', `IP-banned ${numberToIp(player.lastip)} (${player.name}), ${length}: ${why}`);
				return { message: `Address ${numberToIp(player.lastip)} banned (${length}).` };
			}
			case 'delete': {
				await sendCommand('kick', staff.name, { target: player.name });
				await execute('UPDATE players SET deletion = UNIX_TIMESTAMP() WHERE id = :id', { id: player.id });
				await audited('punish.delete', `Deleted ${player.name}: ${why}`);
				return { message: `${player.name} will be deleted within the hour.` };
			}
			default:
				return fail(400, { error: 'Pick a punishment.' });
		}
	}
};
