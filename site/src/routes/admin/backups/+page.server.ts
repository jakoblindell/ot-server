import { fail } from '@sveltejs/kit';
import { backupRequested, listBackups, requestBackup } from '$lib/server/backups';
import { audit, requireStaff } from '$lib/server/staff';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	await requireStaff(event, 'server');
	return { backups: await listBackups(), requested: await backupRequested() };
};

export const actions: Actions = {
	now: async (event) => {
		await requireStaff(event, 'server');
		try {
			await requestBackup();
		} catch {
			return fail(500, { error: 'Could not reach the backups folder.' });
		}
		await audit(event, 'backup.request', 'Asked for a backup now');
		return { message: 'The backup service makes a dump within 30 seconds. Reload this page to see it.' };
	}
};
