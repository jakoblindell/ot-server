import { query } from '$lib/server/db';
import { vocationBadge, vocationName } from '$lib/server/game';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const order = url.searchParams.get('sort') === 'level' ? 'p.level DESC, p.name' : 'p.name';
	const players = await query<{ name: string; level: number; vocation: number }>(
		`SELECT p.name, p.level, p.vocation FROM players_online o JOIN players p ON p.id = o.player_id
		 WHERE p.group_id = 1 ORDER BY ${order}`
	);
	return {
		sort: order.startsWith('p.level') ? 'level' : 'name',
		players: players.map((player) => ({
			name: player.name,
			level: player.level,
			vocation: vocationName(player.vocation),
			badge: vocationBadge(player.vocation)
		}))
	};
};
