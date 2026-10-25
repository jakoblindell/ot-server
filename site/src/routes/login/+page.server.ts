import { fail, redirect } from '@sveltejs/kit';
import { login } from '$lib/server/auth';
import { createSession } from '$lib/server/sessions';
import type { Actions, PageServerLoad } from './$types';

// Only paths on this site, so the login page cannot send anyone elsewhere
function target(url: URL) {
	const next = url.searchParams.get('next') ?? '';
	return next.startsWith('/') && !next.startsWith('//') ? next : '/account';
}

export const load: PageServerLoad = async ({ locals, url }) => {
	if (locals.account) redirect(303, target(url));
};

export const actions: Actions = {
	default: async ({ request, cookies, getClientAddress, url }) => {
		const form = await request.formData();
		const account = String(form.get('account') ?? '');
		const password = String(form.get('password') ?? '');
		const remember = form.get('remember') === 'on';
		const userAgent = request.headers.get('user-agent') ?? '';
		const ip = getClientAddress();

		const result = await login(account, password, ip, userAgent);
		if ('error' in result) return fail(400, { account, remember, error: result.error });

		await createSession(cookies, result.accountId, remember, ip, userAgent);
		redirect(303, target(url));
	}
};
