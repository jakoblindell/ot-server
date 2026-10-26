import { fail } from '@sveltejs/kit';
import { checkRecoveryKey, setPassword } from '$lib/server/accounts';
import { config } from '$lib/server/config';
import { queryOne } from '$lib/server/db';
import { mailEnabled, sendReset } from '$lib/server/mail';
import { PASSWORD_MAX, PASSWORD_MIN } from '$lib/server/passwords';
import { RateLimit } from '$lib/server/ratelimit';
import { endAllSessions } from '$lib/server/sessions';
import { checkTurnstile, turnstileEnabled } from '$lib/server/turnstile';
import type { Actions, PageServerLoad } from './$types';

// Wrong recovery keys per address: 5 within an hour
const failures = new RateLimit(5, 3600_000);

export const load: PageServerLoad = async () => ({ turnstileSiteKey: turnstileEnabled() ? config.turnstile.siteKey : '', mail: mailEnabled() });

// Reset links per address: 5 an hour
const mails = new RateLimit(5, 3600_000);

export const actions: Actions = {
	email: async ({ request, getClientAddress }) => {
		const form = await request.formData();
		const account = String(form.get('account') ?? '').trim();
		const email = String(form.get('email') ?? '').trim();
		const ip = getClientAddress();
		if (mails.blocked(ip)) return fail(429, { account, error: 'Too many requests. Please try again in an hour.' });
		if (!(await checkTurnstile(String(form.get('cf-turnstile-response') ?? ''), ip))) {
			return fail(400, { account, error: 'Please confirm that you are human.' });
		}
		mails.hit(ip);
		const found = await queryOne<{ id: number; name: string; email: string }>(
			'SELECT id, name, email FROM accounts WHERE name = :account AND email = :email AND email <> ""',
			{ account, email }
		);
		if (found) await sendReset(found.id, found.name, found.email).catch((error) => console.error('reset email:', error));
		// the same answer either way: the form does not tell who has an account
		return { mailed: true };
	},
	key: async ({ request, getClientAddress }) => {
		const form = await request.formData();
		const account = String(form.get('account') ?? '').trim();
		const key = String(form.get('key') ?? '');
		const password = String(form.get('password') ?? '');
		const ip = getClientAddress();

		if (failures.blocked(ip)) return fail(429, { account, error: 'Too many wrong attempts. Please try again in an hour.' });
		if (!(await checkTurnstile(String(form.get('cf-turnstile-response') ?? ''), ip))) {
			return fail(400, { account, error: 'Please confirm that you are human.' });
		}
		if (password.length < PASSWORD_MIN || password.length > PASSWORD_MAX) {
			return fail(400, { account, error: `The new password needs ${PASSWORD_MIN} to ${PASSWORD_MAX} characters.` });
		}
		if (password !== String(form.get('password2') ?? '')) return fail(400, { account, error: 'The new passwords are not the same.' });

		const accountId = await checkRecoveryKey(account, key);
		if (!accountId) {
			failures.hit(ip);
			return fail(400, { account, error: 'The account name or recovery key is not correct.' });
		}
		await setPassword(accountId, password);
		await endAllSessions(accountId);
		return { done: true };
	}
};
