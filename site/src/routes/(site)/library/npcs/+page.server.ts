import { getLibrary } from '$lib/server/library';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const library = await getLibrary();
	const byTown = new Map<string, { name: string; slug: string; floor: number | null }[]>();
	for (const npc of library.npcs) {
		const town = npc.town || 'Elsewhere';
		const list = byTown.get(town) ?? [];
		list.push({ name: npc.name, slug: npc.slug, floor: npc.position ? 7 - npc.position.z : null });
		byTown.set(town, list);
	}
	return { towns: [...byTown.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([town, npcs]) => ({ town, npcs })) };
};
