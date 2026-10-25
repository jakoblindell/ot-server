import { config } from '$lib/server/config';
import { getServerStatus } from '$lib/server/status';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const status = await getServerStatus();
	return { status, serverSave: { time: config.serverSaveTime, timeZone: config.timeZone } };
};
