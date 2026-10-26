import { creatureImage, getLibrary } from '$lib/server/library';
import type { PageServerLoad } from './$types';

type Result = { kind: 'creature' | 'item' | 'spell' | 'npc'; name: string; detail: string; href: string; image: string | null };

export const load: PageServerLoad = async ({ url }) => {
	const library = await getLibrary();
	const query = (url.searchParams.get('q') ?? '').trim().toLowerCase().slice(0, 40);
	const kind = url.searchParams.get('kind') ?? 'all';
	const creatures = [...library.creatures.values()];
	const counts = {
		creature: creatures.length,
		spell: library.spells.length,
		item: library.items.size,
		npc: library.npcs.length
	};
	let results: Result[] = [];
	if (query.length >= 2) {
		const match = (text: string) => text.toLowerCase().includes(query);
		if (kind === 'all' || kind === 'creature') {
			results.push(
				...creatures
					.filter((creature) => match(creature.name))
					.map((creature) => ({
						kind: 'creature' as const,
						name: creature.name,
						detail: `HP ${creature.health} · Exp ${creature.experience}`,
						href: `/library/creatures/${creature.slug}`,
						image: creatureImage(creature.look)
					}))
			);
		}
		if (kind === 'all' || kind === 'spell') {
			results.push(
				...library.spells
					.filter((spell) => match(spell.name) || match(spell.words))
					.map((spell) => ({
						kind: 'spell' as const,
						name: spell.name,
						detail: `${spell.words ? `"${spell.words}" · ` : ''}magic level ${spell.magicLevel} · ${spell.mana} mana`,
						href: `/library/spells#${encodeURIComponent(spell.name)}`,
						image: spell.runeId ? `/item/${spell.runeId}.png` : null
					}))
			);
		}
		if (kind === 'all' || kind === 'item') {
			results.push(
				...[...library.items.values()]
					.filter((item) => match(item.name))
					.slice(0, 80)
					.map((item) => ({
						kind: 'item' as const,
						name: item.name,
						detail: library.droppedBy.get(item.id)?.length ? `dropped by ${library.droppedBy.get(item.id)!.length} creatures` : `item ${item.id}`,
						href: `/library/items/${item.id}`,
						image: `/item/${item.id}.png`
					}))
			);
		}
		if (kind === 'all' || kind === 'npc') {
			results.push(
				...library.npcs
					.filter((npc) => match(npc.name))
					.map((npc) => ({ kind: 'npc' as const, name: npc.name, detail: npc.town ? `near ${npc.town}` : '', href: `/library/npcs#${npc.slug}`, image: null }))
			);
		}
		results = results.sort((a, b) => Number(!a.name.toLowerCase().startsWith(query)) - Number(!b.name.toLowerCase().startsWith(query)) || a.name.localeCompare(b.name)).slice(0, 100);
	}
	return { query, kind, counts, results };
};
