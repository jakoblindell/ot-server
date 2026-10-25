import { config } from '$lib/server/config';
import { latestNews, newsCount } from '$lib/server/news';
import { query } from '$lib/server/db';
import { RANKED_PLAYER, vocationBadge } from '$lib/server/game';
import { getServerStatus } from '$lib/server/status';
import type { PageServerLoad } from './$types';

const PER_PAGE = 3;

export const load: PageServerLoad = async ({ url }) => {
	const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
	const [status, articles, total, ticker, top] = await Promise.all([
		getServerStatus(),
		latestNews('article', PER_PAGE, (page - 1) * PER_PAGE),
		newsCount('article'),
		latestNews('ticker', 5),
		query<{ name: string; level: number; vocation: number }>(
			`SELECT p.name, p.level, p.vocation FROM players p WHERE ${RANKED_PLAYER} ORDER BY p.level DESC, p.experience DESC LIMIT 5`
		)
	]);
	return {
		status,
		serverSave: { time: config.serverSaveTime, timeZone: config.timeZone },
		articles,
		ticker,
		page,
		pages: Math.max(1, Math.ceil(total / PER_PAGE)),
		top: top.map((player) => ({ name: player.name, level: player.level, badge: vocationBadge(player.vocation) }))
	};
};
