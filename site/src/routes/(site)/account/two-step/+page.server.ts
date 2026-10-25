import { fail } from '@sveltejs/kit';
import QRCode from 'qrcode';
import { config } from '$lib/server/config';
import { execute, queryOne } from '$lib/server/db';
import { checkPassword } from '$lib/server/passwords';
import { checkAccountCode, disableTotp, enableTotp, matchingStep, newSecret, otpauthUrl, totpSecret } from '$lib/server/totp';
import type { Actions, PageServerLoad } from './$types';

// Setting up: a new secret waits in site_accounts (totp_secret without
// totp_enabled_at) until a code from the app proves it was scanned.
async function setupSecret(accountId: number) {
	const row = await queryOne<{ totp_secret: string | null }>(
		'SELECT totp_secret FROM site_accounts WHERE account_id = :accountId AND totp_enabled_at IS NULL',
		{ accountId }
	);
	if (row?.totp_secret) return row.totp_secret;
	const secret = newSecret();
	await execute(
		`INSERT INTO site_accounts (account_id, totp_secret) VALUES (:accountId, :secret)
		 ON DUPLICATE KEY UPDATE totp_secret = :secret`,
		{ accountId, secret }
	);
	return secret;
}

export const load: PageServerLoad = async ({ locals, url }) => {
	const account = locals.account!;
	const staffAsked = url.searchParams.has('staff');
	if (await totpSecret(account.id)) return { enabled: true, staffAsked };
	const secret = await setupSecret(account.id);
	const link = otpauthUrl(secret, account.name, config.serverName);
	return {
		enabled: false,
		staffAsked,
		secret: secret.replace(/(.{4})/g, '$1 ').trim(),
		qr: await QRCode.toString(link, { type: 'svg', margin: 1, color: { dark: '#2a1f14', light: '#00000000' } })
	};
};

async function passwordCorrect(accountId: number, password: string) {
	const stored = await queryOne<{ password: string }>('SELECT password FROM accounts WHERE id = :id', { id: accountId });
	return !!stored && (await checkPassword(password, stored.password));
}

export const actions: Actions = {
	enable: async ({ locals, request }) => {
		const account = locals.account!;
		const code = String((await request.formData()).get('code') ?? '');
		const secret = await setupSecret(account.id);
		const step = matchingStep(secret, code);
		if (step === null) return fail(400, { error: 'That code is not correct. Check the time on your phone and try the newest code.' });
		await enableTotp(account.id, secret, step);
		return { message: 'Two-step login is on. From now on the website asks for a code after your password.' };
	},
	disable: async ({ locals, request }) => {
		const account = locals.account!;
		const form = await request.formData();
		if (!(await passwordCorrect(account.id, String(form.get('password') ?? '')))) {
			return fail(400, { error: 'Your password is not correct.' });
		}
		if (!(await checkAccountCode(account.id, String(form.get('code') ?? '')))) {
			return fail(400, { error: 'That code is not correct.' });
		}
		await disableTotp(account.id);
		return { message: 'Two-step login is off.' };
	}
};
