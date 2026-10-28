import { fail } from '@sveltejs/kit';
import { commandResult, sendCommand } from '$lib/server/commands';
import { applyNow, available, checkContent, readStaged, safePath, saveStaged } from '$lib/server/gamefiles';
import { getLibrary } from '$lib/server/library';
import { cleanNode, listMonsters, parseMonster, writeMonster } from '$lib/server/monsters';
import { audit, requireStaff } from '$lib/server/staff';
import type { Actions, PageServerLoad } from './$types';

const monsterPath = (value: string | null) => {
	const file = safePath(value ?? '');
	return file && /^data\/monster\/.+\.xml$/.test(file) && !file.endsWith('/monsters.xml') ? file : null;
};

export const load: PageServerLoad = async (event) => {
	await requireStaff(event, 'files');
	if (!(await available())) return { available: false as const };
	const monsters = await listMonsters();
	const selected = monsterPath(event.url.searchParams.get('file'));
	let editor = null;
	if (selected) {
		const file = await readStaged(selected);
		if (file) {
			try {
				editor = { path: selected, doc: parseMonster(file.content), error: null };
			} catch (cause) {
				editor = { path: selected, doc: null, error: (cause as Error).message };
			}
		}
	}
	// Item names for the loot editor
	const { items } = await getLibrary();
	return {
		available: true as const,
		monsters,
		editor,
		items: editor ? [...items.values()].map((item) => [item.id, item.name] as [number, string]) : []
	};
};

export const actions: Actions = {
	save: async (event) => {
		const staff = await requireStaff(event, 'files');
		const form = await event.request.formData();
		const file = monsterPath(String(form.get('file') ?? ''));
		if (!file) return fail(400, { error: 'No monster file.' });
		const current = await readStaged(file);
		if (!current) return fail(404, { error: 'That file is gone.' });

		let content: string;
		try {
			const doc = parseMonster(current.content);
			const root = cleanNode(JSON.parse(String(form.get('root') ?? 'null')));
			if (root.tag !== 'monster') throw new Error('The root element must be <monster>.');
			// nothing edited: the file stays as it is (also its spacing)
			if (JSON.stringify(root) === JSON.stringify(cleanNode(doc.root))) return { message: 'No changes to save.' };
			doc.root = root;
			content = writeMonster(doc);
		} catch (cause) {
			return fail(400, { error: `Not saved: ${(cause as Error).message}` });
		}
		const problem = checkContent(file, content);
		if (problem) return fail(400, { error: `Not saved: ${problem}` });

		const message = String(form.get('message') ?? '').trim().slice(0, 200);
		const changed = await saveStaged(file, content, staff.name, message || `Edit monster ${file}`);
		if (!changed) return { message: 'No changes to save.' };
		await audit(event, 'files.edit', `Edited ${file} (monster editor)${message ? `: ${message}` : ''}`);
		if (form.get('reload') !== 'on') return { message: `Saved. The change goes live at the next server save.` };

		await applyNow(file, staff.name);
		const result = await commandResult(await sendCommand('reload', staff.name, { target: 'monsters' }));
		await audit(event, 'files.apply', `Applied ${file} now (reload monsters)`);
		return result.status === 'failed'
			? fail(400, { error: `Saved and applied, but the reload failed: ${result.result}` })
			: { message: `Saved and live (${result.result}). Monsters already on the map keep their old values until they respawn.` };
	}
};
