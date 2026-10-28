import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { XMLParser } from 'fast-xml-parser';
import { config } from './config';

// The Library: creatures, spells, items and NPCs read from the game server's
// own data files, so it always matches the game. Read once and kept for ten
// minutes (staff edits to the files show up after that).

/** hidden: staff marked it (hidden="1" on its loot line): players see "Unknown" */
export type Loot = { id: number; name: string; countMax: number; percent: number; hidden: boolean };
export type Creature = {
	slug: string;
	name: string;
	description: string;
	race: string;
	experience: number;
	health: number;
	speed: number;
	armor: number;
	defense: number;
	summonCost: number | null;
	convinceCost: number | null;
	look: { type: number; head: number; body: number; legs: number; feet: number; item: number };
	attacks: string[];
	defenses: string[];
	immunities: string[];
	summons: string[];
	voices: string[];
	loot: Loot[];
	spawns: { town: string; count: number }[];
	spawnCount: number;
};
export type Spell = {
	name: string;
	words: string;
	kind: 'instant' | 'rune' | 'conjure';
	magicLevel: number;
	level: number;
	mana: number;
	soul: number;
	premium: boolean;
	vocations: string[];
	runeId: number | null;
	conjureId: number | null;
	conjureCount: number;
};
export type Item = {
	id: number;
	name: string;
	description: string;
	flags: string[];
	attributes: Record<string, string>;
};
export type Npc = { name: string; slug: string; town: string; position: { x: number; y: number; z: number } | null };

type Library = {
	creatures: Map<string, Creature>;
	spells: Spell[];
	items: Map<number, Item>;
	npcs: Npc[];
	droppedBy: Map<number, { creature: string; slug: string; percent: number; hidden: boolean }[]>;
};

const TTL = 10 * 60_000;
let cached: { at: number; library: Promise<Library> } | undefined;

export function slugify(name: string) {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

export function getLibrary(): Promise<Library> {
	if (!cached || Date.now() - cached.at > TTL) {
		const library = loadLibrary();
		cached = { at: Date.now(), library };
		library.catch((error) => {
			console.error('could not read the library from the game data:', error);
			cached = undefined;
		});
	}
	return cached.library;
}

const xml = new XMLParser({
	ignoreAttributes: false,
	attributeNamePrefix: '@',
	parseAttributeValue: false,
	isArray: (name, _path, _leaf, isAttribute) =>
		!isAttribute &&
		['monster', 'attack', 'defense', 'flag', 'immunity', 'summon', 'voice', 'item', 'spawn', 'npc', 'instant', 'rune', 'conjure', 'vocation', 'element'].includes(name)
});

type Node = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
/** A node's attributes without the parser's "@" prefix */
function attrs(node: Node | undefined): Record<string, string> {
	const out: Record<string, string> = {};
	for (const [key, value] of Object.entries(node ?? {})) if (key.startsWith('@')) out[key.slice(1)] = String(value);
	return out;
}
const list = (value: unknown): Node[] => (Array.isArray(value) ? value : value ? [value as Node] : []);

const read = (file: string) => readFile(path.join(config.gameData, file), 'latin1');
const num = (value: unknown, fallback = 0) => (value === undefined || value === '' ? fallback : Number(value) || fallback);

/** The town whose temple is nearest to a position on the same continent */
const temples: [string, number, number][] = [
	['Thais', 32369, 32241],
	['Carlin', 32360, 31782],
	['Kazordoon', 32649, 31925],
	["Ab'Dendriel", 32732, 31634],
	['Edron', 33217, 31814],
	['Darashia', 33213, 32454],
	['Venore', 32957, 32076],
	['Ankrahmun', 33195, 32853],
	['Port Hope', 32595, 32744],
	['Rookgaard', 32097, 32219],
	['Liberty Bay', 32317, 32826]
];

function nearestTown(x: number, y: number) {
	let best = temples[0];
	let bestDistance = Infinity;
	for (const temple of temples) {
		const distance = Math.hypot(temple[1] - x, temple[2] - y);
		if (distance < bestDistance) {
			best = temple;
			bestDistance = distance;
		}
	}
	return best[0];
}

async function loadItems() {
	const items = new Map<number, Item>();
	const text = await read(`items${config.clientVersion}/items.srv`);
	for (const block of text.split(/\n\s*\n/)) {
		const id = block.match(/^TypeID\s*=\s*(\d+)/m);
		const name = block.match(/^Name\s*=\s*"([^"]*)"/m);
		if (!id || !name || !name[1]) continue;
		const flags = block.match(/^Flags\s*=\s*\{([^}]*)\}/m)?.[1].split(',').map((flag) => flag.trim()).filter(Boolean) ?? [];
		const attributes: Record<string, string> = {};
		for (const pair of block.match(/^Attributes\s*=\s*\{([^}]*)\}/m)?.[1].split(',') ?? []) {
			const [key, value] = pair.split('=').map((part) => part.trim());
			if (key && value !== undefined) attributes[key] = value;
		}
		items.set(Number(id[1]), {
			id: Number(id[1]),
			name: name[1],
			description: block.match(/^Description\s*=\s*"([^"]*)"/m)?.[1] ?? '',
			flags,
			attributes
		});
	}
	return items;
}

function describeAttack(attack: Record<string, string>) {
	const range = attack.min || attack.max ? ` ${Math.abs(num(attack.min))}–${Math.abs(num(attack.max))}` : '';
	const name = attack.name === 'melee' ? 'Melee' : attack.name.replace(/^\w/, (c) => c.toUpperCase());
	return `${name}${range}`;
}

async function loadCreatures(items: Map<number, Item>) {
	const creatures = new Map<string, Creature>();
	const index = xml.parse(await read('monster/monsters.xml'));
	const spawnCounts = new Map<string, Map<string, number>>();
	try {
		const spawns = xml.parse(await read(`world${config.clientVersion}/spawns.xml`));
		for (const spawn of list(spawns.spawns?.spawn)) {
			const at = attrs(spawn);
			const town = nearestTown(num(at.centerx), num(at.centery));
			for (const monster of list(spawn.monster)) {
				const key = String(attrs(monster).name).toLowerCase();
				const byTown = spawnCounts.get(key) ?? new Map<string, number>();
				byTown.set(town, (byTown.get(town) ?? 0) + 1);
				spawnCounts.set(key, byTown);
			}
		}
	} catch {
		// no spawn file: no "found in"
	}

	for (const entry of list(index.monsters?.monster)) {
		const { file, name: indexName } = attrs(entry);
		if (!file || file.startsWith('raids/')) continue;
		let parsed;
		try {
			parsed = xml.parse(await read(path.posix.join('monster', file)));
		} catch {
			continue;
		}
		const node = list(parsed.monster)[0];
		const monster = attrs(node);
		if (!monster.name) continue;
		// The game knows a monster by its monsters.xml name ("Demon (Goblin)"
		// is a goblin whose own file says "Demon")
		const name = indexName ? indexName.replace(/\b[a-z]/g, (letter) => letter.toUpperCase()) : monster.name;
		const flags: Record<string, string> = Object.assign({}, ...list(node.flags?.flag).map(attrs));
		if (flags.attackable === '0') continue; // decoration, not a creature to list
		const immunities: Record<string, string> = Object.assign({}, ...list(node.immunities?.immunity).map(attrs));
		const look = attrs(node.look);
		const health = attrs(node.health);
		const defenses = attrs(node.defenses);
		const byTown = spawnCounts.get(name.toLowerCase()) ?? new Map<string, number>();
		const creature: Creature = {
			slug: slugify(name),
			name,
			description: monster.nameDescription ?? '',
			race: monster.race ?? '',
			experience: num(monster.experience),
			health: num(health.max ?? health.now),
			speed: num(monster.speed),
			armor: num(defenses.armor),
			defense: num(defenses.defense),
			summonCost: flags.summonable === '1' ? num(monster.manacost) : null,
			convinceCost: flags.convinceable === '1' ? num(monster.manacost) : null,
			look: {
				type: num(look.type),
				head: num(look.head),
				body: num(look.body),
				legs: num(look.legs),
				feet: num(look.feet),
				item: num(look.typeex)
			},
			attacks: list(node.attacks?.attack).map(attrs).filter((attack) => attack.name).map(describeAttack),
			defenses: list(node.defenses?.defense).map(attrs).filter((defense) => defense.name).map(describeAttack),
			immunities: Object.entries(immunities)
				.filter(([, value]) => value === '1')
				.map(([key]) => key),
			summons: list(node.summons?.summon).map((summon) => attrs(summon).name).filter(Boolean),
			voices: list(node.voices?.voice).map((voice) => attrs(voice).sentence).filter(Boolean),
			loot: list(node.loot?.item)
				.map(attrs)
				.filter((item) => item.id)
				.map((item) => ({
					id: num(item.id),
					name: items.get(num(item.id))?.name ?? `item ${item.id}`,
					countMax: num(item.countmax, 1),
					percent: Math.min(100, num(item.chance, 1000) / 10),
					hidden: item.hidden === '1'
				}))
				.sort((a, b) => b.percent - a.percent),
			spawns: [...byTown.entries()].map(([town, count]) => ({ town, count })).sort((a, b) => b.count - a.count),
			spawnCount: [...byTown.values()].reduce((a, b) => a + b, 0)
		};
		creatures.set(creature.slug, creature);
	}
	return creatures;
}

async function loadSpells() {
	const parsed = xml.parse(await read('spells/spells.xml'));
	const spells: Spell[] = [];
	for (const kind of ['instant', 'rune', 'conjure'] as const) {
		for (const node of list(parsed.spells?.[kind])) {
			const spell = attrs(node);
			if (!spell.name || (!spell.words && kind !== 'rune')) continue;
			spells.push({
				name: spell.name,
				words: spell.words ?? '',
				kind,
				magicLevel: num(spell.maglv ?? spell.magiclevel),
				level: num(spell.lvl ?? spell.level),
				mana: num(spell.mana),
				soul: num(spell.soul),
				premium: spell.prem === '1',
				vocations: list(node.vocation).map((vocation) => attrs(vocation).name).filter(Boolean),
				runeId: kind === 'rune' ? num(spell.id) : null,
				conjureId: kind === 'conjure' ? num(spell.conjureId) : null,
				conjureCount: kind === 'conjure' ? num(spell.conjureCount, 1) : 0
			});
		}
	}
	return spells.sort((a, b) => a.name.localeCompare(b.name));
}

async function loadNpcs() {
	const npcs: Npc[] = [];
	const dir = path.join(config.gameData, 'npc');
	for (const file of await readdir(dir)) {
		if (!file.endsWith('.npc')) continue;
		const text = await readFile(path.join(dir, file), 'latin1');
		const name = text.match(/^Name\s*=\s*"([^"]+)"/m)?.[1];
		if (!name) continue;
		const home = text.match(/^Home\s*=\s*\[(\d+),(\d+),(\d+)\]/m);
		const position = home ? { x: Number(home[1]), y: Number(home[2]), z: Number(home[3]) } : null;
		npcs.push({ name, slug: slugify(name), town: position ? nearestTown(position.x, position.y) : '', position });
	}
	return npcs.sort((a, b) => a.name.localeCompare(b.name));
}

async function loadLibrary(): Promise<Library> {
	const items = await loadItems();
	const [creatures, spells, npcs] = await Promise.all([loadCreatures(items), loadSpells(), loadNpcs()]);
	const droppedBy = new Map<number, { creature: string; slug: string; percent: number; hidden: boolean }[]>();
	for (const creature of creatures.values()) {
		for (const loot of creature.loot) {
			const list = droppedBy.get(loot.id) ?? [];
			// A creature can list an item more than once (several stacks): once here
			const same = list.find((drop) => drop.slug === creature.slug);
			if (same) {
				same.percent = Math.max(same.percent, loot.percent);
				same.hidden = same.hidden && loot.hidden;
			} else list.push({ creature: creature.name, slug: creature.slug, percent: loot.percent, hidden: loot.hidden });
			droppedBy.set(loot.id, list);
		}
	}
	for (const list of droppedBy.values()) list.sort((a, b) => b.percent - a.percent);
	return { creatures, spells, items, npcs, droppedBy };
}

/** The creature's picture: its outfit, or the item it looks like */
export function creatureImage(look: Creature['look']) {
	if (look.item) return `/item/${look.item}.png`;
	if (look.type) return `/outfit/${look.type}-${look.head}-${look.body}-${look.legs}-${look.feet}.png`;
	return null;
}
