import { error, fail, redirect } from '@sveltejs/kit';
import { query, queryOne } from '$lib/server/db';
import * as guilds from '$lib/server/guilds';
import { vocationBadge, vocationName } from '$lib/server/game';
import type { Actions, PageServerLoad, RequestEvent } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const guild = await queryOne<{ id: number; name: string; motd: string; created: number; leader: string | null }>(
		`SELECT g.id, g.name, g.motd, g.creationdata AS created, (SELECT p.name FROM players p WHERE p.id = g.ownerid) AS leader
		 FROM guilds g WHERE g.name = :name`,
		{ name: params.name }
	);
	if (!guild) error(404, 'No guild with that name');

	const [members, invites] = await Promise.all([
		query<{ name: string; level: number; vocation: number; rank: string; rank_level: number; nick: string; online: number }>(
			`SELECT p.name, p.level, p.vocation, r.name AS \`rank\`, r.level AS rank_level, m.nick, (o.player_id IS NOT NULL) AS online
			 FROM guild_membership m JOIN players p ON p.id = m.player_id JOIN guild_ranks r ON r.id = m.rank_id
			 LEFT JOIN players_online o ON o.player_id = p.id
			 WHERE m.guild_id = :id ORDER BY r.level DESC, p.name`,
			{ id: guild.id }
		),
		query<{ name: string }>(
			'SELECT p.name FROM guild_invites i JOIN players p ON p.id = i.player_id WHERE i.guild_id = :id ORDER BY p.name',
			{ id: guild.id }
		)
	]);

	const levels = members.map((member) => member.level);
	const account = locals.account;
	const [standing, ranks, description, mine] = await Promise.all([
		account ? guilds.standing(account.id, guild.id) : Promise.resolve({ level: 0, name: '', id: 0 }),
		guilds.guildRanks(guild.id),
		queryOne<{ description: string }>('SELECT description FROM site_guilds WHERE guild_id = :id', { id: guild.id }),
		account
			? query<{ id: number; name: string; invited: number; member: number }>(
					`SELECT p.id, p.name, EXISTS (SELECT 1 FROM guild_invites i WHERE i.player_id = p.id AND i.guild_id = :guild) AS invited,
						EXISTS (SELECT 1 FROM guild_membership m WHERE m.player_id = p.id AND m.guild_id = :guild) AS member
					 FROM players p WHERE p.account_id = :account AND p.deletion = 0`,
					{ guild: guild.id, account: account.id }
				)
			: Promise.resolve([])
	]);
	return {
		description: description?.description ?? '',
		standing: standing.level,
		ranks,
		myInvited: mine.filter((character) => character.invited).map((character) => ({ id: character.id, name: character.name })),
		myMembers: mine.filter((character) => character.member).map((character) => ({ id: character.id, name: character.name })),
		loggedIn: !!account,
		guild: { name: guild.name, motd: guild.motd, created: guild.created * 1000, leader: guild.leader },
		stats: {
			members: members.length,
			online: members.filter((member) => member.online).length,
			average: levels.length ? Math.round(levels.reduce((a, b) => a + b, 0) / levels.length) : 0,
			top: levels.length ? Math.max(...levels) : 0
		},
		members: members.map((member) => ({
			name: member.name,
			level: member.level,
			vocation: vocationName(member.vocation),
			badge: vocationBadge(member.vocation),
			rank: member.rank,
			nick: member.nick,
			online: !!member.online
		})),
		invites: invites.map((invite) => invite.name)
	};
};

/** The guild and the acting account's rank in it; refuses below the needed rank */
async function acting(event: RequestEvent, needed: number) {
	const account = event.locals.account;
	if (!account) redirect(303, `/login?next=${encodeURIComponent(event.url.pathname)}`);
	const guild = await queryOne<{ id: number; name: string }>('SELECT id, name FROM guilds WHERE name = :name', { name: event.params.name });
	if (!guild) error(404, 'No guild with that name');
	const standing = await guilds.standing(account.id, guild.id);
	return { account, guild, standing, allowed: standing.level >= needed };
}

const field = async (event: RequestEvent) => {
	const form = await event.request.formData();
	return (name: string) => String(form.get(name) ?? '').trim();
};

export const actions: Actions = {
	invite: async (event) => {
		const { guild, allowed } = await acting(event, guilds.VICE);
		if (!allowed) return fail(403, { error: 'Only the leader and vice-leaders can invite.' });
		const result = await guilds.invite(guild.id, (await field(event))('player'));
		return 'error' in result ? fail(400, { error: result.error }) : { message: `${result.name} is invited.` };
	},
	cancelInvite: async (event) => {
		const { guild, allowed } = await acting(event, guilds.VICE);
		if (!allowed) return fail(403, { error: 'Only the leader and vice-leaders can do that.' });
		const name = (await field(event))('player');
		await guilds.cancelInvite(guild.id, name);
		return { message: `The invitation for ${name} is withdrawn.` };
	},
	kick: async (event) => {
		const { guild, standing, allowed } = await acting(event, guilds.VICE);
		if (!allowed) return fail(403, { error: 'Only the leader and vice-leaders can remove members.' });
		const result = await guilds.kick(guild.id, standing.level, (await field(event))('player'));
		return 'error' in result ? fail(400, { error: result.error }) : { message: `${result.name} is no longer a member.` };
	},
	setRank: async (event) => {
		const { guild, allowed } = await acting(event, guilds.LEADER);
		if (!allowed) return fail(403, { error: 'Only the leader can change ranks.' });
		const get = await field(event);
		const result = await guilds.setRank(guild.id, get('player'), Number(get('rank')));
		return 'error' in result ? fail(400, { error: result.error }) : { message: `${result.name} is now ${result.rank}.` };
	},
	setNick: async (event) => {
		const { guild, allowed } = await acting(event, guilds.VICE);
		if (!allowed) return fail(403, { error: 'Only the leader and vice-leaders can set titles.' });
		const get = await field(event);
		const result = await guilds.setNick(guild.id, get('player'), get('nick'));
		return 'error' in result ? fail(400, { error: result.error }) : { message: `Title of ${result.name} set.` };
	},
	renameRanks: async (event) => {
		const { guild, allowed } = await acting(event, guilds.LEADER);
		if (!allowed) return fail(403, { error: 'Only the leader can rename ranks.' });
		const form = await event.request.formData();
		const names: Record<number, string> = {};
		for (const [key, value] of form.entries()) if (key.startsWith('rank-')) names[Number(key.slice(5))] = String(value);
		await guilds.renameRanks(guild.id, names);
		return { message: 'Ranks renamed.' };
	},
	texts: async (event) => {
		const { guild, allowed } = await acting(event, guilds.LEADER);
		if (!allowed) return fail(403, { error: 'Only the leader can edit the guild page.' });
		const get = await field(event);
		await guilds.setTexts(guild.id, get('motd'), get('description'));
		return { message: 'Guild page updated.' };
	},
	handOver: async (event) => {
		const { guild, standing, allowed } = await acting(event, guilds.LEADER);
		if (!allowed) return fail(403, { error: 'Only the leader can hand the guild over.' });
		const result = await guilds.handOver(guild.id, standing.id, (await field(event))('player'));
		return 'error' in result ? fail(400, { error: result.error }) : { message: `${result.name} leads the guild now.` };
	},
	disband: async (event) => {
		const { guild, allowed } = await acting(event, guilds.LEADER);
		if (!allowed) return fail(403, { error: 'Only the leader can disband the guild.' });
		if ((await field(event))('confirm') !== guild.name) return fail(400, { error: 'Type the guild name to confirm.' });
		await guilds.disband(guild.id);
		redirect(303, '/guilds');
	},
	accept: async (event) => {
		const { account, guild } = await acting(event, 0);
		const ok = await guilds.acceptInvite(account.id, guild.id, Number((await field(event))('character')));
		return ok ? { message: `Welcome to ${guild.name}! It shows in the game after your next login.` } : fail(400, { error: 'That character is not invited.' });
	},
	decline: async (event) => {
		const { account, guild } = await acting(event, 0);
		await guilds.declineInvite(account.id, guild.id, Number((await field(event))('character')));
		return { message: 'Invitation declined.' };
	},
	leave: async (event) => {
		const { account, guild } = await acting(event, 0);
		const result = await guilds.leave(account.id, guild.id, Number((await field(event))('character')));
		return 'error' in result ? fail(400, { error: result.error }) : { message: `You left ${guild.name}.` };
	}
};
