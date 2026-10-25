import { fail } from '@sveltejs/kit';
import { commandResult, sendCommand } from '$lib/server/commands';
import { applyNow, available, CONFIG_FIELDS, readConfig, readStaged, saveStaged, writeConfig } from '$lib/server/gamefiles';
import { audit, requireStaff } from '$lib/server/staff';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	await requireStaff(event, 'files');
	if (!(await available())) return { available: false as const };
	const file = await readStaged('config.lua');
	return { available: true as const, fields: CONFIG_FIELDS, values: file ? readConfig(file.content) : {} };
};

export const actions: Actions = {
	default: async (event) => {
		const staff = await requireStaff(event, 'files');
		const form = await event.request.formData();
		const file = await readStaged('config.lua');
		if (!file) return fail(500, { error: 'config.lua is missing.' });
		const before = readConfig(file.content);
		const values: Record<string, string> = {};
		for (const field of CONFIG_FIELDS) {
			values[field.key] = field.kind === 'boolean' ? (form.get(field.key) === 'on' ? 'true' : 'false') : String(form.get(field.key) ?? '').trim();
		}
		let content: string;
		try {
			content = writeConfig(file.content, values);
		} catch (error) {
			return fail(400, { error: (error as Error).message });
		}
		const changed = CONFIG_FIELDS.filter((field) => before[field.key] !== values[field.key]).map((field) => `${field.key} ${before[field.key]} → ${values[field.key]}`);
		if (!changed.length) return { message: 'Nothing changed.' };
		await saveStaged('config.lua', content, staff.name, `Config: ${changed.join(', ')}`);
		await audit(event, 'files.config', `Config: ${changed.join(', ')}`);
		if (form.get('reload') !== 'on') return { message: `Saved: ${changed.join(', ')}. Goes live at the next server save.` };
		await applyNow('config.lua', staff.name);
		const result = await commandResult(await sendCommand('reload', staff.name, { target: 'config' }));
		await audit(event, 'files.apply', 'Applied config.lua now (reload config)');
		return result.status === 'failed' ? fail(400, { error: `Saved, but the reload failed: ${result.result}` }) : { message: `Live now: ${changed.join(', ')}.` };
	}
};
