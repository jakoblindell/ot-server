import { fail } from '@sveltejs/kit';
import { createRecoveryKey, siteAccount } from '$lib/server/accounts';
import { queryOne } from '$lib/server/db';
import { checkPassword } from '$lib/server/passwords';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const site = await siteAccount(locals.account!.id);
	return { created: site?.recovery_key_created?.getTime() ?? 0 };
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const account = locals.account!;
		const form = await request.formData();
		const stored = await queryOne<{ password: string }>('SELECT password FROM accounts WHERE id = :id', { id: account.id });
		if (!stored || !(await checkPassword(String(form.get('current') ?? ''), stored.password))) {
			return fail(400, { error: 'Your password is not correct.' });
		}
		// Shown this once; only its hash is kept
		return { key: await createRecoveryKey(account.id) };
	}
};
