import type { Item } from './library';

// The library's item categories, from what the item files say about each
// item (flags, slot, weapon type) and its name. Items in no category that
// no NPC trades and no creature drops (rubbish, broken things, decoration
// variants) are not listed at all.

export type CategoryGroup = 'Equipment' | 'Weapons' | 'Others';
export type Category = { slug: string; name: string; group: CategoryGroup; icon: string };

/** In display order; icon: the name of the item that pictures the category */
export const CATEGORIES: Category[] = [
	{ slug: 'helmets', name: 'Helmets', group: 'Equipment', icon: 'a dragon scale helmet' },
	{ slug: 'armors', name: 'Armors', group: 'Equipment', icon: 'a dragon scale mail' },
	{ slug: 'legs', name: 'Legs', group: 'Equipment', icon: 'dragon scale legs' },
	{ slug: 'boots', name: 'Boots', group: 'Equipment', icon: 'a pair of leather boots' },
	{ slug: 'shields', name: 'Shields', group: 'Equipment', icon: 'a dragon shield' },
	{ slug: 'spellbooks', name: 'Spellbooks', group: 'Equipment', icon: 'a spellbook' },
	{ slug: 'axes', name: 'Axes', group: 'Weapons', icon: 'a double axe' },
	{ slug: 'clubs', name: 'Clubs', group: 'Weapons', icon: 'a war hammer' },
	{ slug: 'swords', name: 'Swords', group: 'Weapons', icon: 'a serpent sword' },
	{ slug: 'bows', name: 'Bows', group: 'Weapons', icon: 'a bow' },
	{ slug: 'crossbows', name: 'Crossbows', group: 'Weapons', icon: 'a crossbow' },
	{ slug: 'throwables', name: 'Throwables', group: 'Weapons', icon: 'a spear' },
	{ slug: 'arrows', name: 'Arrows', group: 'Weapons', icon: 'an arrow' },
	{ slug: 'bolts', name: 'Bolts', group: 'Weapons', icon: 'a bolt' },
	{ slug: 'wands', name: 'Wands', group: 'Weapons', icon: 'a wand of inferno' },
	{ slug: 'rods', name: 'Rods', group: 'Weapons', icon: 'a snakebite rod' },
	{ slug: 'amulets', name: 'Amulets', group: 'Others', icon: 'a scarf' },
	{ slug: 'rings', name: 'Rings', group: 'Others', icon: 'a life ring' },
	{ slug: 'runes', name: 'Runes', group: 'Others', icon: 'sudden death' },
	{ slug: 'tools', name: 'Tools', group: 'Others', icon: 'a shovel' },
	{ slug: 'light-sources', name: 'Light sources', group: 'Others', icon: 'a torch' },
	{ slug: 'valuables', name: 'Valuables', group: 'Others', icon: 'a gold nugget' },
	{ slug: 'containers', name: 'Containers', group: 'Others', icon: 'a backpack' },
	{ slug: 'fluid-containers', name: 'Fluid containers', group: 'Others', icon: 'a vial' },
	{ slug: 'foods', name: 'Foods', group: 'Others', icon: 'a ham' },
	{ slug: 'keys', name: 'Keys', group: 'Others', icon: 'a golden key' },
	{ slug: 'books', name: 'Books and scrolls', group: 'Others', icon: 'a book' },
	{ slug: 'instruments', name: 'Instruments', group: 'Others', icon: 'a lyre' },
	{ slug: 'decorations', name: 'Decorations', group: 'Others', icon: 'a teddy bear' },
	{ slug: 'creature-products', name: 'Creature products', group: 'Others', icon: 'a talon' },
	{ slug: 'others', name: 'Others', group: 'Others', icon: 'a crystal ball' }
];

const TOOLS = /\b(rope|shovel|pick|pickaxe|machete|scythe|fishing rod|crowbar|saw|watch|hammer|kitchen knife|knife|spoon|fork|rolling pin|oven spatula)\b/;
const VALUABLES = /\b(coin|gem|diamond|emerald|ruby|sapphire|amethyst|pearl|nugget|brooch|bangle|golden fruits|tusk)\b/;
const INSTRUMENTS = /\b(flute|lyre|lute|drum|panpipes|fanfare|horn|didgeridoo|bell)\b/;
const DECORATION = /\b(pillow|tapestry|mirror|picture|clock|doll|teddy|bear|model ship|piggy bank|flower|flowers|statue|vase|garland|wreath|decoration|balloons|tome)\b/;

/**
 * The category of an item, or null: not listed (a corpse, rubbish).
 * traded/dropped: an NPC trades it / a creature drops it.
 */
export function categorize(item: Item, traded: boolean, dropped: boolean): string | null {
	const flags = new Set(item.flags);
	if (!flags.has('Take') || flags.has('Corpse')) return null;
	const a = item.attributes;
	const name = item.name.toLowerCase();
	if (flags.has('Wand')) return name.includes('rod') ? 'rods' : 'wands';
	if (flags.has('Ammo')) return a.AmmoType === 'BOLT' ? 'bolts' : 'arrows';
	if (flags.has('Distance')) return name.includes('crossbow') || name.includes('arbalest') ? 'crossbows' : name.includes('bow') ? 'bows' : 'throwables';
	if (a.WeaponType === 'SWORD') return 'swords';
	if (a.WeaponType === 'AXE') return 'axes';
	if (a.WeaponType === 'CLUB' && !TOOLS.test(name)) return 'clubs';
	if (flags.has('Shield')) return name.includes('spellbook') ? 'spellbooks' : 'shields';
	switch (a.SlotType) {
		case 'HEAD':
			return 'helmets';
		case 'BODY':
			return 'armors';
		case 'LEGS':
			return 'legs';
		case 'FEET':
			return 'boots';
		case 'NECKLACE':
			return 'amulets';
		case 'RING':
			return 'rings';
	}
	if (name.includes('spellbook')) return 'spellbooks';
	if (flags.has('Rune')) return 'runes';
	if (flags.has('Key')) return 'keys';
	if (flags.has('FluidContainer')) return 'fluid-containers';
	if (flags.has('Container')) return 'containers';
	if (a.Nutrition) return 'foods';
	if (TOOLS.test(name)) return 'tools';
	if (a.Brightness) return 'light-sources';
	if (VALUABLES.test(name)) return 'valuables';
	if (INSTRUMENTS.test(name)) return 'instruments';
	if (flags.has('Text')) return 'books';
	if (dropped) return 'creature-products';
	if (DECORATION.test(name) || flags.has('Hang')) return 'decorations';
	return traded ? 'others' : null;
}
