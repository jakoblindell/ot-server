import { redirect } from '@sveltejs/kit';
import { query } from '$lib/server/db';
import { PUBLIC_PLAYER } from '$lib/server/game';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const name = (url.searchParams.get('name') ?? '').trim().slice(0, 30);
	if (!name) return { name, matches: [] };
	const matches = await query<{ name: string; level: number }>(
		`SELECT p.name, p.level FROM players p WHERE ${PUBLIC_PLAYER} AND p.name LIKE :pattern ORDER BY p.name = :name DESC, p.name LIMIT 20`,
		{ pattern: name.replace(/[%_\\]/g, '\\$&') + '%', name }
	);
	if (matches.length && matches[0].name.toLowerCase() === name.toLowerCase()) {
		redirect(303, `/characters/${encodeURIComponent(matches[0].name)}`);
	}
	return { name, matches };
};
