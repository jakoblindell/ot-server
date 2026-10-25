import { error } from '@sveltejs/kit';
import { query, queryOne } from '$lib/server/db';
import { vocationBadge, vocationName } from '$lib/server/game';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
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
	return {
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
