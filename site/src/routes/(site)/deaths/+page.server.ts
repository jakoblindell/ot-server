import { query } from '$lib/server/db';
import { vocationBadge } from '$lib/server/game';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const deaths = await query<{ name: string; vocation: number; time: number; level: number; killed_by: string; is_player: number; mostdamage_by: string; mostdamage_is_player: number; unjustified: number }>(
		`SELECT p.name, p.vocation, d.time, d.level, d.killed_by, d.is_player, d.mostdamage_by, d.mostdamage_is_player, d.unjustified
		 FROM player_deaths d JOIN players p ON p.id = d.player_id WHERE p.group_id = 1 ORDER BY d.time DESC LIMIT 50`
	);
	return {
		deaths: deaths.map((death) => ({
			name: death.name,
			badge: vocationBadge(death.vocation),
			at: death.time * 1000,
			level: death.level,
			killer: { name: death.killed_by, player: !!death.is_player },
			assist: death.mostdamage_by && death.mostdamage_by !== death.killed_by ? { name: death.mostdamage_by, player: !!death.mostdamage_is_player } : null,
			murder: !!death.unjustified
		}))
	};
};
