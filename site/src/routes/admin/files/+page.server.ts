import { error, fail, redirect } from '@sveltejs/kit';
import { commandResult, sendCommand } from '$lib/server/commands';
import { applyNow, available, checkContent, commitDiff, discard, history, listFiles, readStaged, reloadTypeFor, restore, safePath, saveStaged } from '$lib/server/gamefiles';
import { audit, requireStaff } from '$lib/server/staff';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	await requireStaff(event, 'files');
	if (!(await available())) return { available: false as const };
	const files = await listFiles();
	const selected = safePath(event.url.searchParams.get('file') ?? 'config.lua') ?? 'config.lua';
	const file = await readStaged(selected);
	const diffHash = event.url.searchParams.get('diff') ?? '';
	return {
		available: true as const,
		files,
		selected,
		file: file ? { ...file, editable: files.find((entry) => entry.path === selected)?.editable ?? /\.(lua|xml|txt)$/.test(selected) } : null,
		pending: files.find((entry) => entry.path === selected)?.pending ?? false,
		reload: reloadTypeFor(selected),
		history: file ? await history(selected) : [],
		diff: diffHash ? { hash: diffHash, text: await commitDiff(diffHash, selected) } : null
	};
};

export const actions: Actions = {
	save: async (event) => {
		const staff = await requireStaff(event, 'files');
		const form = await event.request.formData();
		const file = safePath(String(form.get('file') ?? ''));
		const content = String(form.get('content') ?? '');
		const message = String(form.get('message') ?? '').trim().slice(0, 200);
		const reloadNow = form.get('reload') === 'on';
		if (!file) return fail(400, { error: 'No file.' });
		const problem = checkContent(file, content);
		if (problem) return fail(400, { error: `Not saved: ${problem}`, content });
		let changed: boolean;
		try {
			changed = await saveStaged(file, content, staff.name, message || `Edit ${file}`);
		} catch (cause) {
			return fail(400, { error: (cause as Error).message, content });
		}
		if (!changed) return { message: 'No changes to save.' };
		await audit(event, 'files.edit', `Edited ${file}${message ? `: ${message}` : ''}`);
		if (!reloadNow) return { message: `Saved. ${file} goes live at the next server save.` };
		const reload = await applyNow(file, staff.name);
		const result = await commandResult(await sendCommand('reload', staff.name, { target: reload }));
		await audit(event, 'files.apply', `Applied ${file} now (reload ${reload})`);
		return result.status === 'failed'
			? fail(400, { error: `Saved and applied, but the reload failed: ${result.result}` })
			: { message: `Saved and live: ${result.result}.` };
	},
	create: async (event) => {
		const staff = await requireStaff(event, 'files');
		const file = safePath(String((await event.request.formData()).get('path') ?? '').trim());
		if (!file || !/^(data\/.+\.(lua|xml|txt))$/.test(file)) return fail(400, { error: 'New files go under data/ and end in .lua, .xml or .txt.' });
		if (await readStaged(file)) redirect(303, `?file=${encodeURIComponent(file)}`);
		await saveStaged(file, file.endsWith('.xml') ? '<?xml version="1.0" encoding="UTF-8"?>\n' : '', staff.name, `New file ${file}`);
		await audit(event, 'files.create', `Created ${file}`);
		redirect(303, `?file=${encodeURIComponent(file)}`);
	},
	revert: async (event) => {
		const staff = await requireStaff(event, 'files');
		const file = String((await event.request.formData()).get('file') ?? '');
		await discard(file, staff.name);
		await audit(event, 'files.discard', `Discarded the pending change to ${file}`);
		return { message: `${file} is back to the live version.` };
	},
	restore: async (event) => {
		const staff = await requireStaff(event, 'files');
		const form = await event.request.formData();
		const file = String(form.get('file') ?? '');
		const hash = String(form.get('hash') ?? '');
		try {
			await restore(file, hash, staff.name);
		} catch {
			error(400, 'Could not restore that version');
		}
		await audit(event, 'files.restore', `Restored ${file} from ${hash}`);
		return { message: `${file} restored from ${hash} (as a pending change).` };
	}
};
