import { config } from '$lib/server/config';
import { query } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const staff = await query<{ name: string; group_id: number; online: number }>(
		`SELECT p.name, p.group_id, (o.player_id IS NOT NULL) AS online FROM players p LEFT JOIN players_online o ON o.player_id = p.id
		 WHERE p.group_id > 1 AND p.deletion = 0 ORDER BY p.group_id DESC, p.name`
	);
	return {
		staff: staff.map((member) => ({ name: member.name, role: member.group_id >= 3 ? 'God' : 'Gamemaster', online: !!member.online })),
		discordUrl: config.discordUrl,
		supportEmail: config.supportEmail
	};
};
