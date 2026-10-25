import { redirect } from '@sveltejs/kit';
import { premiumDaysLeft } from '$lib/server/accounts';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	if (!locals.account) redirect(303, `/login?next=${encodeURIComponent(url.pathname)}`);
	return {
		me: {
			name: locals.account.name,
			email: locals.account.email,
			premiumDays: premiumDaysLeft(locals.account.premdays, locals.account.lastday),
			created: locals.account.creation
		}
	};
};
