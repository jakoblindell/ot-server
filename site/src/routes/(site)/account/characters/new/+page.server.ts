import { fail, redirect } from '@sveltejs/kit';
import { characterCount, createCharacter, MAX_CHARACTERS, type Sex } from '$lib/server/accounts';
import { characterNameError } from '$lib/server/names';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => ({
	full: (await characterCount(locals.account!.id)) >= MAX_CHARACTERS,
	max: MAX_CHARACTERS
});

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const form = await request.formData();
		const name = String(form.get('character') ?? '').trim();
		const sex: Sex = form.get('sex') === 'female' ? 'female' : 'male';
		if ((await characterCount(locals.account!.id)) >= MAX_CHARACTERS) {
			return fail(400, { name, sex, error: `An account can have at most ${MAX_CHARACTERS} characters.` });
		}
		const error = await characterNameError(name);
		if (error) return fail(400, { name, sex, error });
		try {
			await createCharacter(locals.account!.id, name, sex);
		} catch (cause) {
			if ((cause as { code?: string }).code === 'ER_DUP_ENTRY') return fail(400, { name, sex, error: 'This name is already taken.' });
			throw cause;
		}
		redirect(303, '/account');
	}
};
