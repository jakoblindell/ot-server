import { fail } from '@sveltejs/kit';
import { commandResult, sendCommand } from '$lib/server/commands';
import { config } from '$lib/server/config';
import { applyNow, available, discard, pendingChanges, resolveImageClash, startStatus } from '$lib/server/gamefiles';
import { audit, requireStaff } from '$lib/server/staff';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	await requireStaff(event, 'files');
	if (!(await available())) return { available: false as const };
	const [changes, start] = await Promise.all([pendingChanges(), startStatus()]);
	return { available: true as const, ...changes, start, serverSave: config.serverSaveTime };
};

export const actions: Actions = {
	discard: async (event) => {
		const staff = await requireStaff(event, 'files');
		const file = String((await event.request.formData()).get('file') ?? '');
		await discard(file, staff.name);
		await audit(event, 'files.discard', `Discarded the pending change to ${file}`);
		return { message: `Discarded the change to ${file}.` };
	},
	apply: async (event) => {
		const staff = await requireStaff(event, 'files');
		const file = String((await event.request.formData()).get('file') ?? '');
		let reload: string;
		try {
			reload = await applyNow(file, staff.name);
		} catch (error) {
			return fail(400, { error: (error as Error).message });
		}
		const result = await commandResult(await sendCommand('reload', staff.name, { target: reload }));
		await audit(event, 'files.apply', `Applied ${file} now (reload ${reload})`);
		return result.status === 'failed' ? fail(400, { error: `Applied, but the reload failed: ${result.result}` }) : { message: `${file} is live: ${result.result}.` };
	},
	resolve: async (event) => {
		const staff = await requireStaff(event, 'files');
		const keep = (await event.request.formData()).get('keep') === 'image' ? 'image' : 'ours';
		try {
			await resolveImageClash(keep, staff.name);
		} catch (error) {
			return fail(400, { error: `Could not merge: ${(error as Error).message}` });
		}
		await audit(event, 'files.resolve', keep === 'image' ? "Took the server image's versions of clashing files" : 'Kept the staff versions of clashing files');
		return { message: 'Merged. It goes live at the next server save.' };
	}
};
