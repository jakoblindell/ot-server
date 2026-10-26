import { fail, redirect } from '@sveltejs/kit';
import { createAccount, emailError, emailTaken, type Sex } from '$lib/server/accounts';
import { config } from '$lib/server/config';
import { accountNameError, accountNameTaken, characterNameError } from '$lib/server/names';
import { PASSWORD_MAX, PASSWORD_MIN } from '$lib/server/passwords';
import { sendVerification } from '$lib/server/mail';
import { createSession } from '$lib/server/sessions';
import { checkTurnstile, turnstileEnabled } from '$lib/server/turnstile';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.account) redirect(303, '/account');
	return { turnstileSiteKey: turnstileEnabled() ? config.turnstile.siteKey : '' };
};

export const actions: Actions = {
	default: async ({ request, cookies, getClientAddress }) => {
		const form = await request.formData();
		const field = (name: string) => String(form.get(name) ?? '');
		const values = {
			account: field('account').trim(),
			email: field('email').trim(),
			character: field('character').trim(),
			sex: (field('sex') === 'female' ? 'female' : 'male') as Sex,
			rules: form.get('rules') === 'on'
		};
		const password = field('password');
		const errors: Record<string, string> = {};

		const ip = getClientAddress();
		if (!(await checkTurnstile(field('cf-turnstile-response'), ip))) {
			errors.captcha = 'Please confirm that you are human.';
		}

		const accountError = accountNameError(values.account);
		if (accountError) errors.account = accountError;
		else if (await accountNameTaken(values.account)) errors.account = 'This account name is already taken.';

		const mailError = emailError(values.email);
		if (mailError) errors.email = mailError;
		else if (await emailTaken(values.email)) errors.email = 'This email address is already used by another account.';

		if (password.length < PASSWORD_MIN || password.length > PASSWORD_MAX) {
			errors.password = `The password needs ${PASSWORD_MIN} to ${PASSWORD_MAX} characters.`;
		} else if (password.toLowerCase() === values.account.toLowerCase()) {
			errors.password = 'The password may not be the account name.';
		} else if (password !== field('password2')) {
			errors.password2 = 'The passwords are not the same.';
		}

		const nameError = await characterNameError(values.character);
		if (nameError) errors.character = nameError;

		if (!values.rules) errors.rules = 'Please accept the rules.';

		if (Object.keys(errors).length) return fail(400, { values, errors });

		let accountId: number;
		try {
			accountId = await createAccount({ name: values.account, email: values.email, password, character: values.character, sex: values.sex });
		} catch (error) {
			// Two sign-ups racing for the same name: the unique keys refuse one
			if ((error as { code?: string }).code === 'ER_DUP_ENTRY') {
				return fail(400, { values, errors: { form: 'The account or character name was just taken. Please choose another.' } });
			}
			throw error;
		}
		await sendVerification(accountId, values.account, values.email).catch((error) => console.error('verification email:', error));
		await createSession(cookies, accountId, false, ip, request.headers.get('user-agent') ?? '');
		redirect(303, '/account?welcome=1');
	}
};
