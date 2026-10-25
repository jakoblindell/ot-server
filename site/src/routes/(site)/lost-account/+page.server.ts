import { fail } from '@sveltejs/kit';
import { checkRecoveryKey, setPassword } from '$lib/server/accounts';
import { config } from '$lib/server/config';
import { PASSWORD_MAX, PASSWORD_MIN } from '$lib/server/passwords';
import { RateLimit } from '$lib/server/ratelimit';
import { endAllSessions } from '$lib/server/sessions';
import { checkTurnstile, turnstileEnabled } from '$lib/server/turnstile';
import type { Actions, PageServerLoad } from './$types';

// Wrong recovery keys per address: 5 within an hour
const failures = new RateLimit(5, 3600_000);

export const load: PageServerLoad = async () => ({ turnstileSiteKey: turnstileEnabled() ? config.turnstile.siteKey : '' });

export const actions: Actions = {
	default: async ({ request, getClientAddress }) => {
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
