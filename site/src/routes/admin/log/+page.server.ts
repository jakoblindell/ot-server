import { requireStaff } from '$lib/server/staff';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	await requireStaff(event, 'server');
};
