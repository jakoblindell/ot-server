import { error, fail } from '@sveltejs/kit';
import { clientReport, closeClientReport } from '$lib/server/clientreports';
import { audit, requireStaff } from '$lib/server/staff';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	await requireStaff(event, 'players');
	const report = await clientReport(Number(event.params.id));
	if (!report) error(404, 'No such report');
	let info: unknown = {};
	try {
		info = JSON.parse(report.info);
	} catch {
		info = { unreadable: report.info.slice(0, 2000) };
	}
	return {
		report: {
			id: report.id,
			player: report.player_name,
			text: report.text,
			info: JSON.stringify(info, null, 2),
			logs: report.logs,
			screenshot: Boolean(report.has_screenshot),
			created_at: report.created_at.getTime(),
			status: report.status,
			handled_by: report.handled_by,
			handled_at: report.handled_at?.getTime() ?? 0,
			outcome: report.outcome
		}
	};
};

export const actions: Actions = {
	close: async (event) => {
		const staff = await requireStaff(event, 'players');
		const form = await event.request.formData();
		const outcome = String(form.get('outcome') ?? '').trim();
		if (!outcome) return fail(400, { error: 'Write what was done (for example "fixed in the next build", "not a bug").' });
		const id = Number(event.params.id);
		await closeClientReport(id, staff.name, outcome);
		await audit(event, 'clientreport.close', `Closed client report ${id}: ${outcome}`);
		return { message: 'Report closed.' };
	}
};
