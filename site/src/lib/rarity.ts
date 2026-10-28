// The rarity tiers players see instead of drop chances (server use:
// lib/server/rarity.ts; also the admin's loot editor shows them)

export const RARITIES = ['Always', 'Common', 'Uncommon', 'Semi-rare', 'Rare', 'Very rare', 'Extremely rare'] as const;
export type Rarity = (typeof RARITIES)[number];

/** The tier of a drop chance in percent (with the loot rate applied) */
export function rarityTier(percent: number): number {
	if (percent >= 100) return 0;
	if (percent >= 20) return 1;
	if (percent >= 5) return 2;
	if (percent >= 1) return 3;
	if (percent >= 0.5) return 4;
	if (percent > 0.1) return 5;
	return 6;
}

export function rarity(percent: number): Rarity {
	return RARITIES[rarityTier(percent)];
}

