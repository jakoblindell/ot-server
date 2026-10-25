import { fail } from '@sveltejs/kit';
import { commandResult, RELOAD_TYPES, recentCommands, sendCommand, type CommandName } from '$lib/server/commands';
import { config } from '$lib/server/config';
import { query } from '$lib/server/db';
import { latestBackup, onlineLastDay } from '$lib/server/samples';
import { audit, requireStaff } from '$lib/server/staff';
import { getServerStatus } from '$lib/server/status';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [status, chart, backup, commands, actions] = await Promise.all([
		getServerStatus(),
		onlineLastDay(),
		latestBackup(),
		recentCommands(8),
		query<{ id: number; created_at: Date; actor: string; action: string; target_player: string | null; details: string }>(
			'SELECT id, created_at, actor, action, target_player, details FROM site_audit_log ORDER BY id DESC LIMIT 8'
		)
	]);
	return {
		status,
		serverSave: config.serverSaveTime,
		chart,
		backup,
		reloadTypes: RELOAD_TYPES,
		commands: commands.map((command) => ({ ...command, created_at: command.created_at.getTime() })),
		actions: actions.map((action) => ({ ...action, created_at: action.created_at.getTime() }))
	};
};

async function run(event: Parameters<Actions[string]>[0], command: CommandName, args: { target?: string; text?: string; number?: number }, describe: string) {
	const staff = await requireStaff(event, 'server');
	const id = await sendCommand(command, staff.name, args);
	await audit(event, `server.${command}`, describe);
	const result = await commandResult(id);
	return result.status === 'failed' ? fail(400, { error: `${describe}: ${result.result}` }) : { message: `${describe}: ${result.result}` };
}

export const actions: Actions = {
	broadcast: async (event) => {
		const text = String((await event.request.formData()).get('text') ?? '').trim().slice(0, 255);
		if (!text) return fail(400, { error: 'Write a message first.' });
		return run(event, 'broadcast', { text }, `Broadcast "${text}"`);
	},
	save: (event) => run(event, 'save', {}, 'Save'),
	clean: (event) => run(event, 'clean', {}, 'Clean map'),
	reload: async (event) => {
		const type = String((await event.request.formData()).get('type') ?? '');
		if (!(RELOAD_TYPES as readonly string[]).includes(type)) return fail(400, { error: 'Pick what to reload.' });
		return run(event, 'reload', { target: type }, `Reload ${type}`);
	},
	restart: async (event) => {
		const minutes = Number((await event.request.formData()).get('minutes'));
		if (![0, 5, 15].includes(minutes)) return fail(400, { error: 'Pick when to restart.' });
		return run(event, 'restart', { number: minutes }, minutes ? `Restart in ${minutes} minutes` : 'Restart now');
	}
};
