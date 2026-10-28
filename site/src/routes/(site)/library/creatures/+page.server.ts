import { publicCreature } from '$lib/server/creaturepublic';
import { creatureImage, getLibrary } from '$lib/server/library';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const library = await getLibrary();
	const sort = url.searchParams.get('sort') ?? 'name';
	// words, not numbers; sorted by tier and name (lib/server/creaturepublic.ts)
	const creatures = [...library.creatures.values()].map((creature) => {
		const shown = publicCreature(creature);
		return {
			slug: shown.slug,
			name: shown.name,
			health: shown.health,
			healthTier: shown.healthTier,
			experience: shown.experience,
			experienceTier: shown.experienceTier,
			image: creatureImage(creature.look)
		};
	});
	if (sort === 'experience') creatures.sort((a, b) => b.experienceTier - a.experienceTier || a.name.localeCompare(b.name));
	else if (sort === 'health') creatures.sort((a, b) => b.healthTier - a.healthTier || a.name.localeCompare(b.name));
	else creatures.sort((a, b) => a.name.localeCompare(b.name));
	return { sort, creatures };
};
