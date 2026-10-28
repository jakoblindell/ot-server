import { error } from '@sveltejs/kit';
import { getLibrary } from '$lib/server/library';
import { byRarity, isHidden, lootShownUpTo, rarity, rarityTier } from '$lib/server/rarity';
import { getStatusRates } from '$lib/server/status';
import type { PageServerLoad } from './$types';

// Attributes worth showing, with their labels
const SHOWN: Record<string, string> = {
	Weight: 'Weight (oz.)',
	Attack: 'Attack',
	Defense: 'Defence',
	Armor: 'Armor',
	Range: 'Range',
	Capacity: 'Capacity',
	Charges: 'Charges',
	MinimumLevel: 'Level',
	BodyPosition: 'Worn on',
	WeaponType: 'Weapon'
};

export const load: PageServerLoad = async ({ params }) => {
	const library = await getLibrary();
	const item = /^\d+$/.test(params.id) ? library.items.get(Number(params.id)) : undefined;
	if (!item) error(404, 'No such item');
	const attributes = Object.entries(item.attributes)
		.filter(([key]) => key in SHOWN)
		.map(([key, value]) => ({ label: SHOWN[key], value: key === 'Weight' ? (Number(value) / 100).toFixed(2) : value }));
	const lootRate = (await getStatusRates()).loot;
	const shownUpTo = await lootShownUpTo();
	const spell = library.spells.find((entry) => entry.runeId === item.id || entry.conjureId === item.id);
	return {
		item: { id: item.id, name: item.name, description: item.description, attributes },
		// a rarity, never the drop chance (lib/server/rarity.ts)
		// hidden drops are left out
		droppedBy: (library.droppedBy.get(item.id) ?? [])
			.flatMap((drop) => {
				const chance = Math.min(100, drop.percent * lootRate);
				const tier = rarityTier(chance);
				return isHidden(drop, tier, shownUpTo) ? [] : [{ creature: drop.creature, slug: drop.slug, name: drop.creature, tier, rarity: rarity(chance) }];
			})
			.sort(byRarity),
		spell: spell ? { name: spell.name, words: spell.words, kind: spell.kind } : null
	};
};
