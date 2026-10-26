import { error } from '@sveltejs/kit';
import { getLibrary } from '$lib/server/library';
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
	const spell = library.spells.find((entry) => entry.runeId === item.id || entry.conjureId === item.id);
	return {
		item: { id: item.id, name: item.name, description: item.description, attributes },
		droppedBy: library.droppedBy.get(item.id) ?? [],
		spell: spell ? { name: spell.name, words: spell.words, kind: spell.kind } : null
	};
};
