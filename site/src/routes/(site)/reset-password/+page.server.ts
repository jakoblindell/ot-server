import { fail } from '@sveltejs/kit';
import { setPassword } from '$lib/server/accounts';
import { checkToken, useToken } from '$lib/server/mail';
import { PASSWORD_MAX, PASSWORD_MIN } from '$lib/server/passwords';
import { endAllSessions } from '$lib/server/sessions';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => ({ valid: await checkToken(url.searchParams.get('token') ?? '', 'reset') });

export const actions: Actions = {
	default: async ({ request, url }) => {
		const form = await request.formData();
		const password = String(form.get('password') ?? '');
		if (password.length < PASSWORD_MIN || password.length > PASSWORD_MAX) {
			return fail(400, { error: `The password needs ${PASSWORD_MIN} to ${PASSWORD_MAX} characters.` });
		}
		if (password !== String(form.get('password2') ?? '')) return fail(400, { error: 'The passwords are not the same.' });
		const found = await useToken(url.searchParams.get('token') ?? '', 'reset');
		if (!found) return fail(400, { error: 'This link is not valid any more. Ask for a new one.' });
		await setPassword(found.accountId, password);
		await endAllSessions(found.accountId);
		return { done: true };
	}
};
