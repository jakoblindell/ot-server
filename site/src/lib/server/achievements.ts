import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { config } from './config';

// Achievements (ot-server#30) for the website: names and points read from
// the server's own list (data/lib/achievements/achievements_config.lua), the
// unlocks from player_achievements. Hidden ones show only once unlocked.

export type AchievementInfo = { id: number; name: string; text: string; category: string; points: number; hidden: boolean };

const TTL = 10 * 60_000;
let cached: { at: number; list: Promise<Map<number, AchievementInfo>> } | undefined;

export function getAchievements(): Promise<Map<number, AchievementInfo>> {
	if (!cached || Date.now() - cached.at > TTL) {
		const list = load();
		cached = { at: Date.now(), list };
		list.catch((error) => {
			console.error('could not read the achievements:', error);
			cached = undefined;
		});
	}
	return cached.list;
}

const unquote = (value: string) => value.replace(/\\'/g, "'");

async function load() {
	const lua = await readFile(path.join(config.gameData, 'lib/achievements/achievements_config.lua'), 'utf8');
	const list = new Map<number, AchievementInfo>();
	for (const match of lua.matchAll(
		/\{\s*id\s*=\s*(\d+),\s*name\s*=\s*'((?:[^'\\]|\\.)*)',\s*text\s*=\s*'((?:[^'\\]|\\.)*)',\s*category\s*=\s*'(\w+)',\s*points\s*=\s*(\d+)(,\s*hidden\s*=\s*true)?/g
	)) {
		list.set(Number(match[1]), {
			id: Number(match[1]),
			name: unquote(match[2]),
			text: unquote(match[3]),
			category: match[4],
			points: Number(match[5]),
			hidden: !!match[6]
		});
	}
	return list;
}
