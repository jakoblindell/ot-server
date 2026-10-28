import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { config } from './config';
import { getLibrary } from './library';
import { RARITIES, isHidden, lootShownUpTo, rarityTier } from './rarity';
import { getStatusRates } from './status';

// The game data file for our client (ot-client#31): every item that can be
// picked up, with its stats, which NPCs buy and sell it and which creatures
// drop it. Built from the game server's own files (one source of truth);
// the client downloads it only when its version changes.
//
// {"version":"…","npcs":["Rashid",…],"creatures":["Rat",…],
//  "items":{"3297":{"n":"serpent sword","w":41,"t":"sword","atk":26,"def":15,
//    "sell":[[npc,price]],"buy":[[npc,price]],"drop":[[creature,rarity]]}},
//  "fluids":{"2874:10":{"sell":[…],"buy":[…]}}}
// sell: NPCs that pay this for one (you sell to them); buy: NPCs that ask
// this for one (you buy from them). npc/creature/rarity are indexes into the
// lists ("rarities": Always, Common, ...); drop chances never leave the server.

type Trade = [number, number];
type ItemEntry = {
	n: string;
	w?: number;
	t?: string;
	atk?: number;
	def?: number;
	arm?: number;
	slot?: string;
	sell?: Trade[];
	buy?: Trade[];
	drop?: Trade[];
	/** a fixed value (coins) */
	v?: number;
};
type ItemData = {
	version: string;
	npcs: string[];
	creatures: string[];
	rarities?: string[];
	items: Record<string, ItemEntry>;
	fluids: Record<string, { sell?: Trade[]; buy?: Trade[] }>;
};
type Built = { version: string; json: string; gzip: Buffer };

const TTL = 10 * 60_000;
let cached: { at: number; built: Promise<Built> } | undefined;

/** Built again on the next request (loot visibility changed) */
export function resetItemData() {
	cached = undefined;
}

/** The current data file, built once and kept for ten minutes */
export function getItemData(): Promise<Built> {
	if (!cached || Date.now() - cached.at > TTL) {
		const built = build();
		cached = { at: Date.now(), built };
		built.catch((error) => {
			console.error('could not build the item data file:', error);
			cached = undefined;
		});
	}
	return cached.built;
}

const ARTICLE = /^(a|an|the|some) /;
const WEAPON_TYPES: Record<string, string> = {
	SWORD: 'sword', AXE: 'axe', CLUB: 'club', DISTANCE: 'distance', WAND: 'wand', SHIELD: 'shield', AMMO: 'ammunition'
};

type NpcTrades = { name: string; sell: Map<string, number>; buy: Map<string, number> };

/** What each NPC pays and asks: its trade lines ("sell" lines are what it buys) */
async function readNpcTrades(): Promise<NpcTrades[]> {
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

async function build(): Promise<Built> {
	const library = await getLibrary();
	const npcTrades = await readNpcTrades();
	const data: Omit<ItemData, 'version'> = { npcs: [], creatures: [], items: {}, fluids: {} };

	for (const item of library.items.values()) {
		if (!item.flags.includes('Take')) continue;
		const a = item.attributes;
		const entry: ItemEntry = { n: item.name.replace(ARTICLE, '') };
		if (a.Weight) entry.w = Number(a.Weight) / 100;
		if (a.WeaponType) entry.t = WEAPON_TYPES[a.WeaponType] ?? a.WeaponType.toLowerCase();
		if (a.Attack) entry.atk = Number(a.Attack);
		if (a.Defense) entry.def = Number(a.Defense);
		if (a.ArmorValue) entry.arm = Number(a.ArmorValue);
		if (a.SlotType) entry.slot = a.SlotType.toLowerCase();
		data.items[item.id] = entry;
	}

	const index = (list: string[], name: string) => {
		let at = list.indexOf(name);
		if (at < 0) at = list.push(name) - 1;
		return at;
	};
	const addTrade = (target: { sell?: Trade[]; buy?: Trade[] }, kind: 'sell' | 'buy', npc: number, price: number) => {
		(target[kind] ??= []).push([npc, price]);
	};
	for (const npc of npcTrades) {
		for (const kind of ['sell', 'buy'] as const) {
			for (const [key, price] of npc[kind]) {
				const npcIndex = index(data.npcs, npc.name);
				if (key.includes(':')) addTrade((data.fluids[key] ??= {}), kind, npcIndex, price);
				else if (data.items[key]) addTrade(data.items[key], kind, npcIndex, price);
			}
		}
	}
	// coins are worth their value (no NPC trades them)
	for (const [id, value] of [[3031, 1], [3035, 100], [3043, 10000]] as const) {
		const coin = data.items[id];
		if (coin) coin.v = value;
	}
	// best offers first
	for (const target of [...Object.values(data.items), ...Object.values(data.fluids)]) {
		target.sell?.sort((x, y) => y[1] - x[1]);
		target.buy?.sort((x, y) => x[1] - y[1]);
	}

	// a rarity tier (an index into "rarities"), never the drop chance; by
	// tier and name, so the order says nothing either (lib/server/rarity.ts)
	const lootRate = (await getStatusRates()).loot;
	const shownUpTo = await lootShownUpTo();
	for (const [id, drops] of library.droppedBy) {
		const entry = data.items[id];
		if (!entry) continue;
		const visible = drops
			.map((drop) => ({ name: drop.creature, hidden: drop.hidden, tier: rarityTier(Math.min(100, drop.percent * lootRate)) }))
			.filter((drop) => !isHidden(drop, drop.tier, shownUpTo));
		if (!visible.length) continue;
		entry.drop = visible
			.sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name))
			.map((drop) => [index(data.creatures, drop.name), drop.tier] as Trade);
	}
	data.rarities = [...RARITIES];

	const body = JSON.stringify(data);
	const version = createHash('sha256').update(body).digest('hex').slice(0, 12);
	const json = JSON.stringify({ version, ...data });
	return { version, json, gzip: gzipSync(json, { level: 9 }) };
}
