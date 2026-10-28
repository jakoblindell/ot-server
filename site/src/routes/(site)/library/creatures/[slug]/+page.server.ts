import { error } from '@sveltejs/kit';
import { query } from '$lib/server/db';
import { getStatusRates } from '$lib/server/status';
import { creatureImage, getLibrary } from '$lib/server/library';
import { byRarity, isHidden, lootShownUpTo, rarity, rarityTier } from '$lib/server/rarity';
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
	// players see a rarity, never the drop chance (lib/server/rarity.ts)
	const lootRate = (await getStatusRates()).loot;
	// hidden drops: one "Unknown" line at the end, nothing about them
	const shownUpTo = await lootShownUpTo();
	let unknown = false;
	const loot = creature.loot
		.flatMap((item) => {
			const chance = Math.min(100, item.percent * lootRate);
			const tier = rarityTier(chance);
			if (isHidden(item, tier, shownUpTo)) {
				unknown = true;
				return [];
			}
			return [{ id: item.id, name: item.name, countMax: item.countMax, tier, rarity: rarity(chance) as string }];
		})
		.sort(byRarity);
	if (unknown) loot.push({ id: 0, name: 'Unknown', countMax: 0, tier: 99, rarity: 'Unknown' });
	return {
		creature: { ...creature, loot },
		image: creatureImage(creature.look),
		killsThisWeek: Number(kills?.count ?? 0)
	};
};
