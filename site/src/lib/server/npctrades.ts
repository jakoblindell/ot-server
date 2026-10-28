import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { config } from './config';

// What each NPC buys and sells, from the trade lines in its .npc file
export type NpcTrades = { name: string; sell: Map<string, number>; buy: Map<string, number> };

/** What each NPC pays and asks: its trade lines ("sell" lines are what it buys) */
export async function readNpcTrades(): Promise<NpcTrades[]> {
	const dir = path.join(config.gameData, 'npc');
	const npcs: NpcTrades[] = [];
	for (const file of (await readdir(dir)).sort()) {
		if (!file.endsWith('.npc')) continue;
		const text = await readFile(path.join(dir, file), 'latin1');
		const name = text.match(/^Name\s*=\s*"([^"]+)"/m)?.[1];
		if (!name) continue;
		const npc: NpcTrades = { name, sell: new Map(), buy: new Map() };
		for (const line of text.split('\n')) {
			// (lines for an amount, %1, repeat the one-item price; "11*20" is a
			// backpack of them)
			if (line.includes('%1') || /Price=\d+\*/.test(line)) continue;
			const id = line.match(/Type=(\d+)/)?.[1];
			const amount = Number(line.match(/Amount=(\d+)/)?.[1]);
			const price = Number(line.match(/Price=(\d+)/)?.[1]);
			if (!id || !amount || Number.isNaN(price)) continue;
			const data = line.match(/Data=(\d+)/)?.[1];
			const key = data && data !== '0' ? `${id}:${data}` : id;
			const each = Math.floor(price / amount);
			if (/^\s*"sell"/.test(line)) {
				npc.sell.set(key, Math.max(npc.sell.get(key) ?? 0, each));
			} else if (each > 0) {
				npc.buy.set(key, Math.min(npc.buy.get(key) ?? Infinity, each));
			}
		}
		if (npc.sell.size || npc.buy.size) npcs.push(npc);
	}
	return npcs;
}

