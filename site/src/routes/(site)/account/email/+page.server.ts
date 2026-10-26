import { fail } from '@sveltejs/kit';
import { emailError, emailTaken, setEmail } from '$lib/server/accounts';
import { queryOne } from '$lib/server/db';
import { clearVerified, mailEnabled, sendVerification } from '$lib/server/mail';
import { checkPassword } from '$lib/server/passwords';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const account = locals.account!;
		const form = await request.formData();
		const email = String(form.get('email') ?? '').trim();
		const stored = await queryOne<{ password: string }>('SELECT password FROM accounts WHERE id = :id', { id: account.id });
		if (!stored || !(await checkPassword(String(form.get('current') ?? ''), stored.password))) {
			return fail(400, { email, error: 'Your password is not correct.' });
		}
		const error = emailError(email);
		if (error) return fail(400, { email, error });
		if (await emailTaken(email, account.id)) return fail(400, { email, error: 'This email address is used by another account.' });
		await setEmail(account.id, email);
		await clearVerified(account.id);
		const sent = await sendVerification(account.id, account.name, email).catch(() => false);
		return { email, done: true, sent, mail: mailEnabled() };
	}
};
