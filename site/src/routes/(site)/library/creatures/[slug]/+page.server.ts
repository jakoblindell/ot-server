import { error } from '@sveltejs/kit';
import { query } from '$lib/server/db';
import { getStatusRates } from '$lib/server/status';
import { creatureImage, getLibrary } from '$lib/server/library';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const library = await getLibrary();
	const creature = library.creatures.get(params.slug);
	if (!creature) error(404, 'No such creature');
	// Players this creature killed in the last 7 days (deaths name the killer
	// as "a rat" or "rat")
	const names = [creature.name.toLowerCase(), creature.description.toLowerCase()].filter(Boolean);
	const [kills] = await query<{ count: number }>(
		`SELECT COUNT(*) AS count FROM player_deaths WHERE is_player = 0 AND LOWER(killed_by) IN (:names) AND time > UNIX_TIMESTAMP() - 7 * 86400`,
		{ names }
	);
	return {
		creature,
		image: creatureImage(creature.look),
		killsThisWeek: Number(kills?.count ?? 0),
		lootRate: (await getStatusRates()).loot
	};
};
