import { redirect } from '@sveltejs/kit';
import { query } from '$lib/server/db';
import { vocationName } from '$lib/server/game';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.account) redirect(303, `/login?next=${encodeURIComponent(url.pathname)}`);
	const characters = await query<{ name: string; level: number; vocation: number; online: number }>(
		`SELECT p.name, p.level, p.vocation, (o.player_id IS NOT NULL) AS online
		 FROM players p LEFT JOIN players_online o ON o.player_id = p.id
		 WHERE p.account_id = :id AND p.deletion = 0 ORDER BY p.name`,
		{ id: locals.account.id }
	);
	return {
		account: { name: locals.account.name, premdays: locals.account.premdays, email: locals.account.email },
		characters: characters.map((character) => ({
			name: character.name,
			level: character.level,
			vocation: vocationName(character.vocation),
			online: !!character.online
		}))
	};
};
