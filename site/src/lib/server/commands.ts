import { execute, query } from './db';

// Commands for the game server: rows in site_admin_commands, which a Lua
// script in the server (data/globalevents/scripts/admin_commands.lua) runs
// within a second and marks done or failed.
export type CommandName = 'broadcast' | 'save' | 'clean' | 'reload' | 'kick' | 'message' | 'temple' | 'mute' | 'restart';

export async function sendCommand(command: CommandName, by: string, args: { target?: string; text?: string; number?: number } = {}) {
	const result = await execute(
		'INSERT INTO site_admin_commands (command, target, text, number, created_by) VALUES (:command, :target, :text, :number, :by)',
		{ command, target: args.target ?? '', text: args.text ?? '', number: args.number ?? 0, by }
	);
	return result.insertId;
}

/** Waits up to a few seconds for the server to run the command */
export async function commandResult(id: number, waitMs = 4000) {
	const until = Date.now() + waitMs;
	for (;;) {
		const [row] = await query<{ status: string; result: string }>('SELECT status, result FROM site_admin_commands WHERE id = :id', { id });
		if (row && row.status !== 'pending') return row;
		if (Date.now() > until) return { status: 'pending', result: 'Sent; the server has not picked it up yet.' };
		await new Promise((resolve) => setTimeout(resolve, 300));
	}
}

export async function recentCommands(limit = 10) {
	return query<{ id: number; command: string; target: string; status: string; result: string; created_by: string; created_at: Date }>(
		'SELECT id, command, target, status, result, created_by, created_at FROM site_admin_commands ORDER BY id DESC LIMIT :limit',
		{ limit }
	);
}

/** Reload types the server knows (Game.reload), for files that change */
export const RELOAD_TYPES = [
	'actions',
	'chat',
	'config',
	'creaturescripts',
	'events',
	'global',
	'globalevents',
	'items',
	'monsters',
	'movements',
	'npcs',
	'quests',
	'raids',
	'spells',
	'talkactions',
	'weapons'
] as const;
