import { clientReports } from '$lib/server/clientreports';
import { requireStaff } from '$lib/server/staff';
import type { PageServerLoad } from './$types';

// Bug reports sent from inside the game client (ot-server#48)
export const load: PageServerLoad = async (event) => {
	await requireStaff(event, 'players');
	const status = event.url.searchParams.get('status') === 'closed' ? 'closed' : 'open';
	const rows = await clientReports(status);
	return {
		status,
		reports: rows.map((row) => {
			let device = '';
			try {
				const info = JSON.parse(row.info);
				device = [info?.device?.platform, info?.device?.screen, info?.client?.build].filter(Boolean).join(' · ');
			} catch {
				// (shown without)
			}
			return {
				id: row.id,
				player: row.player_name,
				text: row.text,
				device,
				screenshot: Boolean(row.has_screenshot),
				created_at: row.created_at.getTime(),
				handled_by: row.handled_by,
				handled_at: row.handled_at?.getTime() ?? 0,
				outcome: row.outcome
			};
		})
	};
};
