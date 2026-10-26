import { getLibrary } from '$lib/server/library';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const library = await getLibrary();
	const vocation = url.searchParams.get('vocation') ?? '';
	const spells = library.spells
		.filter((spell) => !vocation || spell.vocations.some((name) => name.toLowerCase().includes(vocation.toLowerCase())))
		.map((spell) => ({
			...spell,
			itemName: spell.runeId ? library.items.get(spell.runeId)?.name ?? '' : spell.conjureId ? library.items.get(spell.conjureId)?.name ?? '' : ''
		}))
		.sort((a, b) => a.magicLevel - b.magicLevel || a.level - b.level || a.name.localeCompare(b.name));
	return { vocation, spells };
};
