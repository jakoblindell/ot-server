import { creatureImage, getLibrary } from '$lib/server/library';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const library = await getLibrary();
	const sort = url.searchParams.get('sort') ?? 'name';
	const creatures = [...library.creatures.values()].map((creature) => ({
		slug: creature.slug,
		name: creature.name,
		health: creature.health,
		experience: creature.experience,
		spawns: creature.spawnCount,
		image: creatureImage(creature.look)
	}));
	if (sort === 'experience') creatures.sort((a, b) => b.experience - a.experience || a.name.localeCompare(b.name));
	else if (sort === 'health') creatures.sort((a, b) => b.health - a.health || a.name.localeCompare(b.name));
	else creatures.sort((a, b) => a.name.localeCompare(b.name));
	return { sort, creatures };
};
