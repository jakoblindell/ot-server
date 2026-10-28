import { CATEGORIES, categorize } from './itemcategories';
import { getLibrary, type Item } from './library';
import { readNpcTrades } from './npctrades';
import { getSettings, setSetting } from './settings';

// The items players may look up: the categorized ones, minus those staff
// keep hidden for now (Admin > Library). Hidden items are left out of the
// library and the client's item data, and show as "Unknown" in loot.

const HIDDEN_SETTING = 'hiddenItems';

export async function getHiddenItems(): Promise<Set<number>> {
	try {
		const ids = JSON.parse((await getSettings())[HIDDEN_SETTING] ?? '[]');
		return new Set(Array.isArray(ids) ? ids.map(Number).filter(Number.isInteger) : []);
	} catch {
		return new Set();
	}
}

export async function setHiddenItems(ids: Set<number>) {
	await setSetting(HIDDEN_SETTING, JSON.stringify([...ids].sort((a, b) => a - b)));
	cached = undefined;
}

export type CatalogItem = { id: number; name: string; item: Item };
type Catalog = {
	/** category slug -> items, by name, one per name */
	byCategory: Map<string, CatalogItem[]>;
	/** every listed item id (duplicates by name included) -> its category */
	categoryOf: Map<number, string>;
	hidden: Set<number>;
	/** the picture of each category: an item id */
	icons: Map<string, number>;
};

const TTL = 10 * 60_000;
let cached: { at: number; catalog: Promise<Catalog> } | undefined;

export function getCatalog(): Promise<Catalog> {
	if (!cached || Date.now() - cached.at > TTL) {
		const catalog = build();
		cached = { at: Date.now(), catalog };
		catalog.catch((error) => {
			console.error('could not build the item catalog:', error);
			cached = undefined;
		});
	}
	return cached.catalog;
}

const ARTICLE = /^(a|an|the|some) /i;

async function build(): Promise<Catalog> {
	const library = await getLibrary();
	const hidden = await getHiddenItems();
	const traded = new Set<number>();
	for (const npc of await readNpcTrades()) {
		for (const key of [...npc.sell.keys(), ...npc.buy.keys()]) if (!key.includes(':')) traded.add(Number(key));
	}
	const byCategory = new Map<string, CatalogItem[]>();
	const categoryOf = new Map<number, string>();
	const byName = new Map<string, CatalogItem>();
	const runeSpells = new Map(library.spells.filter((spell) => spell.runeId).map((spell) => [spell.runeId!, spell.name]));
	for (const item of library.items.values()) {
		if (hidden.has(item.id)) continue;
		const isTraded = traded.has(item.id);
		const dropped = (library.droppedBy.get(item.id) ?? []).some((drop) => !drop.hidden);
		const category = categorize(item, isTraded, dropped);
		if (!category) continue;
		// runes are all "a spell rune" in the item files: the spell's name
		const spell = category === 'runes' ? runeSpells.get(item.id) : undefined;
		if (category === 'runes' && !spell && !/blank/.test(item.name)) continue;
		categoryOf.set(item.id, category);
		// one per name (several ids share "a book"): the traded or dropped
		// one, else the lowest id
		const name = spell ?? item.name.replace(ARTICLE, '');
		const key = `${category}:${name.toLowerCase()}`;
		const known = byName.get(key);
		const better = !known || ((isTraded || dropped) && !(traded.has(known.id) || library.droppedBy.has(known.id)));
		if (better) byName.set(key, { id: item.id, name, item });
	}
	for (const [key, entry] of byName) {
		const category = key.slice(0, key.indexOf(':'));
		const list = byCategory.get(category) ?? [];
		list.push(entry);
		byCategory.set(category, list);
	}
	const icons = new Map<string, number>();
	for (const category of CATEGORIES) {
		const list = (byCategory.get(category.slug) ?? []).sort((a, b) => a.name.localeCompare(b.name));
		byCategory.set(category.slug, list);
		const named = list.find((entry) => entry.item.name.toLowerCase() === category.icon || entry.name.toLowerCase() === category.icon);
		if (list.length) icons.set(category.slug, (named ?? list[0]).id);
	}
	return { byCategory, categoryOf, hidden, icons };
}
