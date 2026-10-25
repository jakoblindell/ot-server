import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { config } from './config';

// Names from the game server's data that characters may not take: monsters,
// NPCs, spell names and spell words. Read once, lower case.
let reserved: Promise<Set<string>> | undefined;

export function reservedNames(): Promise<Set<string>> {
	reserved ??= loadReservedNames().catch((error) => {
		console.error('could not read the game data for reserved names:', error);
		reserved = undefined;
		return new Set<string>();
	});
	return reserved;
}

async function loadReservedNames() {
	const names = new Set<string>();
	const add = (name: string) => names.add(name.trim().toLowerCase());

	const monsters = await readFile(path.join(config.gameData, 'monster/monsters.xml'), 'latin1');
	for (const match of monsters.matchAll(/<monster\s+name="([^"]+)"/g)) add(match[1]);

	const npcDir = path.join(config.gameData, 'npc');
	for (const file of await readdir(npcDir)) {
		if (!file.endsWith('.npc')) continue;
		const npc = await readFile(path.join(npcDir, file), 'latin1');
		const name = npc.match(/^Name\s*=\s*"([^"]+)"/m)?.[1];
		if (name) add(name);
	}

	const spells = await readFile(path.join(config.gameData, 'spells/spells.xml'), 'latin1');
	for (const match of spells.matchAll(/<(?:instant|rune|conjure)\b[^>]*>/g)) {
		const name = match[0].match(/\bname="([^"]+)"/)?.[1];
		const words = match[0].match(/\bwords="([^"]+)"/)?.[1];
		if (name) add(name);
		if (words) add(words);
	}
	return names;
}
