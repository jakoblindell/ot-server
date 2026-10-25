import { fail, redirect } from '@sveltejs/kit';
import { RateLimit } from '$lib/server/ratelimit';
import { createSession, endPendingLogin, getPendingLogin } from '$lib/server/sessions';
import { checkAccountCode } from '$lib/server/totp';
import type { Actions, PageServerLoad } from './$types';

// Wrong codes per account: 5 within 15 minutes, then the login starts over
const failures = new RateLimit(5, 15 * 60_000);

function target(url: URL) {
	const next = url.searchParams.get('next') ?? '';
	return next.startsWith('/') && !next.startsWith('//') ? next : '/account';
}

export const load: PageServerLoad = async ({ cookies }) => {
	if (!(await getPendingLogin(cookies))) redirect(303, '/login');
};

export const actions: Actions = {
	default: async ({ cookies, request, url, getClientAddress }) => {
		const pending = await getPendingLogin(cookies);
		if (!pending) redirect(303, '/login');
		const key = String(pending.accountId);
		const code = String((await request.formData()).get('code') ?? '');
		if (!(await checkAccountCode(pending.accountId, code))) {
			failures.hit(key);
			if (failures.blocked(key)) {
				failures.reset(key);
				await endPendingLogin(cookies);
				redirect(303, '/login');
			}
			return fail(400, { error: 'That code is not correct. Use the newest one in your app.' });
		}
		failures.reset(key);
		await endPendingLogin(cookies);
		await createSession(cookies, pending.accountId, pending.remember, getClientAddress(), request.headers.get('user-agent') ?? '');
		redirect(303, target(url));
	}
};
