import { query } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const guilds = await query<{ name: string; motd: string; members: number; online: number; leader: string | null; created: number }>(
		`SELECT g.name, g.motd, g.creationdata AS created,
			(SELECT COUNT(*) FROM guild_membership m WHERE m.guild_id = g.id) AS members,
			(SELECT COUNT(*) FROM guild_membership m JOIN players_online o ON o.player_id = m.player_id WHERE m.guild_id = g.id) AS online,
			(SELECT p.name FROM players p WHERE p.id = g.ownerid) AS leader
		 FROM guilds g ORDER BY online DESC, members DESC, g.name`
	);
	return { guilds: guilds.map((guild) => ({ ...guild, members: Number(guild.members), online: Number(guild.online) })) };
};
