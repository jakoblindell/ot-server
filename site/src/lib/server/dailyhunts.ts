import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { config } from './config';
import { getLibrary, slugify, creatureImage } from './library';

// Daily hunts (ot-server#21) for the guide: read from the server's own
// settings (data/lib/tasks/daily_hunts_config.lua) so the guide always
// matches the game. Only what players may know: the hunts, their level
// windows and the box names. Box chances and kill counts stay server-side.

export type GuideMonster = { name: string; slug: string | null; image: string | null };
export type GuideHunt = { name: string; from: number; to: number; difficulty: number; premium: boolean; monsters: GuideMonster[] };
export type GuideGroup = { name: string; from: number; to: number | null; hunts: GuideHunt[] };
export type GuideBox = { name: string; gold: number; rarity: string };
export type DailyHuntGuide = {
	minLevel: number;
	cooldownHours: number;
	expiryHours: number;
	streak: number[];
	groups: GuideGroup[];
	boxes: GuideBox[];
};

// How rare each box is, in words (best last)
const RARITY = ['very common', 'common', 'uncommon', 'rare', 'very rare', 'incredibly rare', 'extremely rare'];

const TTL = 10 * 60_000;
let cached: { at: number; guide: Promise<DailyHuntGuide> } | undefined;

export function getDailyHuntGuide(): Promise<DailyHuntGuide> {
	if (!cached || Date.now() - cached.at > TTL) {
		const guide = load();
		cached = { at: Date.now(), guide };
		guide.catch((error) => {
			console.error('could not read the daily hunts:', error);
			cached = undefined;
		});
	}
	return cached.guide;
}

const hours = (lua: string, key: string, fallback: number) => {
	const match = lua.match(new RegExp(`${key}\\s*=\\s*([\\d\\s*]+)`));
	if (!match) return fallback;
	const seconds = match[1].split('*').reduce((total, part) => total * (Number(part.trim()) || 1), 1);
	return Math.round(seconds / 3600);
};

type Area = { kind: string; x0: number; y0: number; x1: number; y1: number };

/** Spawns per monster in free areas (as daily_hunts.lua counts them, ot-server#24) */
async function freeSpawns(lua: string): Promise<Map<string, number> | null> {
	const areas: Area[] = [];
	for (const m of lua.matchAll(/kind\s*=\s*'(\w+)',\s*from\s*=\s*\{\s*(\d+),\s*(\d+)\s*\},\s*to\s*=\s*\{\s*(\d+),\s*(\d+)\s*\}/g)) {
		areas.push({ kind: m[1], x0: Number(m[2]), y0: Number(m[3]), x1: Number(m[4]), y1: Number(m[5]) });
	}
	let xml: string;
	try {
		xml = await readFile(path.join(config.gameData, `world${config.clientVersion}/spawns.xml`), 'latin1');
	} catch {
		return null;
	}
	const counts = new Map<string, number>();
	for (const m of xml.matchAll(/<spawn centerx="(\d+)" centery="(\d+)"[^>]*>([\s\S]*?)<\/spawn>/g)) {
		const x = Number(m[1]);
		const y = Number(m[2]);
		const area = areas.find((a) => x >= a.x0 && x <= a.x1 && y >= a.y0 && y <= a.y1);
		if (area) continue; // premium or excluded
		for (const [, name] of m[3].matchAll(/<monster name="([^"]+)"/g)) {
			counts.set(name.toLowerCase(), (counts.get(name.toLowerCase()) ?? 0) + 1);
		}
	}
	return counts;
}

async function load(): Promise<DailyHuntGuide> {
	const lua = await readFile(path.join(config.gameData, 'lib/tasks/daily_hunts_config.lua'), 'utf8');
	const free = await freeSpawns(lua);
	const minSpawns = Number(lua.match(/minSpawns\s*=\s*(\d+)/)?.[1] ?? 8);
	const library = await getLibrary();
	const creatures = new Map([...library.creatures.values()].map((creature) => [creature.name.toLowerCase(), creature]));

	const groups: GuideGroup[] = [];
	for (const match of lua.matchAll(/\{\s*name\s*=\s*'([^']+)',\s*from\s*=\s*(\d+)\s*\}/g)) {
		groups.push({ name: match[1], from: Number(match[2]), to: null, hunts: [] });
	}
	groups.sort((a, b) => a.from - b.from);
	groups.forEach((group, i) => (group.to = groups[i + 1] ? groups[i + 1].from - 1 : null));

	for (const match of lua.matchAll(
		/name\s*=\s*'([^']+)',\s*monsters\s*=\s*\{([^}]*)\},\s*level\s*=\s*\{\s*(\d+),\s*(\d+)\s*\}[^\n]*difficulty\s*=\s*(\d)/g
	)) {
		const monsters = [...match[2].matchAll(/'([^']+)'/g)].map(([, name]) => {
			const creature = creatures.get(name.toLowerCase());
			return {
				name: creature?.name ?? name,
				slug: creature ? creature.slug || slugify(creature.name) : null,
				image: creature ? creatureImage(creature.look) : null
			};
		});
		// premium: `premium = true/false` on the hunt, or too few spawns in free areas
		const start = match.index ?? 0;
		const end = lua.indexOf('\n', start);
		const line = lua.slice(start, end < 0 ? undefined : end);
		const flag = line.match(/premium\s*=\s*(true|false)/)?.[1];
		const freeCount = [...match[2].matchAll(/'([^']+)'/g)].reduce((total, [, name]) => total + (free?.get(name.toLowerCase()) ?? 0), 0);
		const premium = flag ? flag === 'true' : free !== null && freeCount < minSpawns;
		const hunt = { name: match[1], from: Number(match[3]), to: Number(match[4]), difficulty: Number(match[5]), premium, monsters };
		// listed where the hunt starts
		const group = [...groups].reverse().find((candidate) => hunt.from >= candidate.from) ?? groups[0];
		group?.hunts.push(hunt);
	}
	for (const group of groups) group.hunts.sort((a, b) => a.from - b.from || a.name.localeCompare(b.name));

	const boxes: GuideBox[] = [];
	for (const match of lua.matchAll(/\{\s*name\s*=\s*'([^']+surprise box)',\s*weight\s*=\s*\d+,\s*gold\s*=\s*(\d+)/g)) {
		boxes.push({ name: match[1], gold: Number(match[2]), rarity: RARITY[boxes.length] ?? 'extremely rare' });
	}

	const streakList = lua.match(/streak\s*=\s*\{([^}]*)\}/);
	return {
		minLevel: Number(lua.match(/minLevel\s*=\s*(\d+)/)?.[1] ?? 8),
		cooldownHours: hours(lua, 'cooldown', 8),
		expiryHours: hours(lua, 'expiry', 16),
		streak: streakList ? streakList[1].split(',').map((value) => Number(value.trim())).filter((value) => value > 0) : [1],
		groups,
		boxes
	};
}
