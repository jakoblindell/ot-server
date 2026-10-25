import { query, queryOne } from '$lib/server/db';
import { highscoreCategories, RANKED_PLAYER, vocationBadge, vocationFilters, vocationName } from '$lib/server/game';
import type { PageServerLoad } from './$types';

const PER_PAGE = 25;

export const load: PageServerLoad = async ({ url, setHeaders }) => {
	const category = highscoreCategories.find((c) => c.id === url.searchParams.get('category')) ?? highscoreCategories[0];
	const vocation = vocationFilters.find((v) => v.id === url.searchParams.get('vocation')) ?? vocationFilters[0];
	const page = Math.max(1, Math.min(200, Number(url.searchParams.get('page')) || 1));

	// Columns come from the fixed lists above, never from the request
	const where = RANKED_PLAYER + (vocation.ids.length ? ` AND p.vocation IN (${vocation.ids.join(',')})` : '');
	const [rows, total] = await Promise.all([
		query<{ name: string; vocation: number; level: number; value: number; points: number }>(
			`SELECT p.name, p.vocation, p.level, p.${category.column} AS value, p.${category.tie} AS points
			 FROM players p WHERE ${where}
			 ORDER BY p.${category.column} DESC, p.${category.tie} DESC, p.name LIMIT :limit OFFSET :offset`,
			{ limit: PER_PAGE, offset: (page - 1) * PER_PAGE }
		),
		queryOne<{ count: number }>(`SELECT COUNT(*) AS count FROM players p WHERE ${where}`)
	]);
	setHeaders({ 'cache-control': 'public, max-age=60' });

	return {
		categories: highscoreCategories.map((c) => ({ id: c.id, label: c.label })),
		vocations: vocationFilters.map((v) => ({ id: v.id, label: v.label })),
		category: category.id,
		categoryLabel: category.label,
		vocation: vocation.id,
		page,
		pages: Math.max(1, Math.ceil((total?.count ?? 0) / PER_PAGE)),
		rows: rows.map((row, index) => ({
			rank: (page - 1) * PER_PAGE + index + 1,
			name: row.name,
			vocation: vocationName(row.vocation),
			badge: vocationBadge(row.vocation),
			level: row.level,
			value: Number(row.value),
			points: Number(row.points)
		}))
	};
};
