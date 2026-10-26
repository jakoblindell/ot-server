import { fail } from '@sveltejs/kit';
import { closeReport, reports } from '$lib/server/reports';
import { audit, requireStaff } from '$lib/server/staff';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	await requireStaff(event, 'players');
	const status = event.url.searchParams.get('status') === 'closed' ? 'closed' : 'open';
	const rows = await reports(status);
	return {
		status,
		reports: rows.map((row) => ({ ...row, created_at: row.created_at.getTime(), handled_at: row.handled_at?.getTime() ?? 0 }))
	};
};

export const actions: Actions = {
	close: async (event) => {
		const staff = await requireStaff(event, 'players');
		const form = await event.request.formData();
		const id = Number(form.get('id'));
		const outcome = String(form.get('outcome') ?? '').trim();
		if (!outcome) return fail(400, { error: 'Write what was done (for example "warned", "no rule broken").' });
		await closeReport(id, staff.name, outcome);
		await audit(event, 'report.close', `Closed report ${id}: ${outcome}`, { player: String(form.get('player') ?? '') || null });
		return { message: 'Report closed.' };
	}
};
