import { fail, redirect } from '@sveltejs/kit';
import { accountCharacters, foundGuild, GUILD_MIN_LEVEL } from '$lib/server/guilds';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.account) redirect(303, `/login?next=${encodeURIComponent(url.pathname)}`);
	const characters = await accountCharacters(locals.account.id);
	return {
		minLevel: GUILD_MIN_LEVEL,
		characters: characters.map((character) => ({
			id: character.id,
			name: character.name,
			level: character.level,
			usable: !character.guild_id && character.level >= GUILD_MIN_LEVEL,
			why: character.guild_id ? `in ${character.guild}` : character.level < GUILD_MIN_LEVEL ? `level ${character.level}` : ''
		}))
	};
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		if (!locals.account) redirect(303, '/login');
		const form = await request.formData();
		const name = String(form.get('name') ?? '').trim();
		const result = await foundGuild(locals.account.id, Number(form.get('leader')), name);
		if ('error' in result) return fail(400, { name, error: result.error });
		redirect(303, `/guilds/${encodeURIComponent(result.name!)}`);
	}
};
