import { openReportCount } from '$lib/server/reports';
import { can, GOD, requireStaff, type Permission } from '$lib/server/staff';
import type { LayoutServerLoad } from './$types';

const ALL: Permission[] = ['players', 'punish', 'punishHard', 'news', 'server', 'staff', 'files'];

export const load: LayoutServerLoad = async (event) => {
	const account = await requireStaff(event);
	return {
		openReports: can(account, 'players') ? Number(await openReportCount()) : 0,
		staff: {
			name: account.name,
			role: account.type >= GOD ? 'God' : 'Gamemaster',
			can: Object.fromEntries(ALL.map((permission) => [permission, can(account, permission)])) as Record<Permission, boolean>
		}
	};
};
