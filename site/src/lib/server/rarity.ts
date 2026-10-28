import { getSettings, setSetting } from './settings';

// Drop chances are the server's secret (only staff see them, in the admin):
// players see a rarity tier instead. Everything that leaves the server for
// players (pages, page data, the client's item data file) carries the tier,
// never the chance, and lists are ordered by tier and name, so the order
// gives nothing away either.

import { RARITIES, rarity, rarityTier, type Rarity } from '$lib/rarity';

export { RARITIES, rarity, rarityTier, type Rarity };

/** Commonest first, then by name */
export function byRarity<T extends { tier: number; name: string }>(a: T, b: T) {
	return a.tier - b.tier || a.name.localeCompare(b.name);
}

// Some loot stays a mystery: drops staff marked hidden (hidden="1" on the
// loot line, in the admin's monster editor) and, if set, every drop rarer
// than a tier. Players see one "Unknown" line instead; the item pages and
// the client's item data leave the creature out.
const HIDE_SETTING = 'lootHideRarerThan';

/** The rarest tier still shown (RARITIES.length - 1: all shown) */
export async function lootShownUpTo(): Promise<number> {
	const value = Number((await getSettings())[HIDE_SETTING]);
	return Number.isInteger(value) && value >= 0 && value < RARITIES.length ? value : RARITIES.length - 1;
}

export async function setLootShownUpTo(tier: number) {
	await setSetting(HIDE_SETTING, String(Math.max(0, Math.min(RARITIES.length - 1, Math.floor(tier)))));
}

export function isHidden(drop: { hidden: boolean }, tier: number, shownUpTo: number) {
	return drop.hidden || tier > shownUpTo;
}
