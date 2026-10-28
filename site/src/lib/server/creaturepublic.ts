import type { Creature } from './library';

// What players may know about a creature: words, not numbers. Hit points,
// experience, armor, speed, damage and mana costs stay on the server (the
// admin has them); pages and their data only carry these descriptions, and
// lists are ordered by tier and name so the order gives nothing away.

const scale = (value: number, steps: [number, string][], top: string) => {
	for (const [below, word] of steps) if (value < below) return word;
	return top;
};

export const HEALTH_TIERS = ['Feeble', 'Frail', 'Sturdy', 'Tough', 'Very tough', 'Massive', 'Colossal'];
export const healthTier = (hp: number) =>
	HEALTH_TIERS.indexOf(scale(hp, [[50, 'Feeble'], [200, 'Frail'], [600, 'Sturdy'], [1500, 'Tough'], [4000, 'Very tough'], [10000, 'Massive']], 'Colossal'));

export const EXPERIENCE_TIERS = ['None', 'Little', 'Some', 'Good', 'High', 'Very high', 'Huge'];
export const experienceTier = (xp: number) =>
	xp <= 0 ? 0 : EXPERIENCE_TIERS.indexOf(scale(xp, [[25, 'Little'], [150, 'Some'], [700, 'Good'], [2000, 'High'], [5000, 'Very high']], 'Huge'));

const strength = (max: number) =>
	max <= 0 ? '' : scale(max, [[50, 'weak'], [150, 'moderate'], [350, 'strong'], [700, 'very strong']], 'devastating');

const armor = (value: number) => scale(value, [[10, 'Light'], [25, 'Medium'], [40, 'Heavy']], 'Very heavy');
// (players walk at about 220)
const speed = (value: number) => (value <= 0 ? 'Does not move' : scale(value, [[150, 'Slow'], [250, 'Normal'], [350, 'Fast']], 'Very fast'));

export type PublicCreature = ReturnType<typeof publicCreature>;

export function publicCreature(creature: Creature) {
	return {
		slug: creature.slug,
		name: creature.name,
		description: creature.description,
		race: creature.race,
		look: creature.look,
		health: HEALTH_TIERS[healthTier(creature.health)],
		healthTier: healthTier(creature.health),
		experience: EXPERIENCE_TIERS[experienceTier(creature.experience)],
		experienceTier: experienceTier(creature.experience),
		armor: armor(creature.armor),
		speed: speed(creature.speed),
		summonable: creature.summonCost !== null,
		convinceable: creature.convinceCost !== null,
		attacks: creature.attacks.map((attack) => ({ name: attack.name, strength: strength(attack.max) })),
		defenses: creature.defenses.map((defense) => ({ name: defense.name, strength: strength(defense.max) })),
		immunities: creature.immunities,
		summons: creature.summons,
		voices: creature.voices,
		// towns only, not how many spawns
		spawns: creature.spawns.map((spawn) => spawn.town),
		onMap: creature.spawnCount > 0
	};
}

/** Loot amounts in words: "1", "a few", "many" */
export function lootAmount(countMax: number) {
	return countMax <= 1 ? '1' : countMax <= 10 ? 'a few' : 'many';
}
