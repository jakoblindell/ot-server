import { config } from '$lib/server/config';
import { getServerStatus } from '$lib/server/status';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const status = await getServerStatus();
	return {
		serverName: config.serverName,
		theme: locals.theme,
		account: locals.account ? { name: locals.account.name } : null,
		status: { online: status.online, playersOnline: status.playersOnline }
	};
};
