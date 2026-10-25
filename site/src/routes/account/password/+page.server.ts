import { fail } from '@sveltejs/kit';
import { setPassword } from '$lib/server/accounts';
import { queryOne } from '$lib/server/db';
import { checkPassword, PASSWORD_MAX, PASSWORD_MIN } from '$lib/server/passwords';
import { createSession, endAllSessions } from '$lib/server/sessions';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, request, cookies, getClientAddress }) => {
		const account = locals.account!;
		const form = await request.formData();
		const current = String(form.get('current') ?? '');
		const password = String(form.get('password') ?? '');
		const stored = await queryOne<{ password: string }>('SELECT password FROM accounts WHERE id = :id', { id: account.id });
		if (!stored || !(await checkPassword(current, stored.password))) return fail(400, { error: 'Your current password is not correct.' });
		if (password.length < PASSWORD_MIN || password.length > PASSWORD_MAX) {
			return fail(400, { error: `The new password needs ${PASSWORD_MIN} to ${PASSWORD_MAX} characters.` });
		}
		if (password.toLowerCase() === account.name.toLowerCase()) return fail(400, { error: 'The password may not be the account name.' });
		if (password !== String(form.get('password2') ?? '')) return fail(400, { error: 'The new passwords are not the same.' });

		await setPassword(account.id, password);
		// Every other browser logged in to this account is logged out
		await endAllSessions(account.id);
		await createSession(cookies, account.id, false, getClientAddress(), request.headers.get('user-agent') ?? '');
		return { done: true };
	}
};
