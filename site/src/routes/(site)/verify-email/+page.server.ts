import { markVerified, useToken } from '$lib/server/mail';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const found = await useToken(url.searchParams.get('token') ?? '', 'verify');
	return { ok: !!found && (await markVerified(found.accountId, found.email)) };
};
