import { query, queryOne } from './db';

export type NewsItem = { id: number; kind: 'article' | 'ticker'; title: string; body: string; author: string; publishedAt: number; comments: number };

type NewsRow = { id: number; kind: 'article' | 'ticker'; title: string; body: string; author: string; published_at: Date; comments?: number };

const toItem = (row: NewsRow): NewsItem => ({
	id: row.id,
	kind: row.kind,
	title: row.title,
	body: row.body,
	author: row.author,
	publishedAt: row.published_at.getTime(),
	comments: Number(row.comments ?? 0)
});

const PUBLISHED = 'published_at IS NOT NULL AND published_at <= UTC_TIMESTAMP()';

export async function latestNews(kind: 'article' | 'ticker', limit: number, offset = 0) {
	const rows = await query<NewsRow>(
		`SELECT id, kind, title, body, author, published_at,
			(SELECT COUNT(*) FROM site_news_comments c WHERE c.news_id = site_news.id AND c.hidden_by IS NULL) AS comments
		 FROM site_news WHERE kind = :kind AND ${PUBLISHED} ORDER BY published_at DESC, id DESC LIMIT :limit OFFSET :offset`,
		{ kind, limit, offset }
	);
	return rows.map(toItem);
}

export async function newsCount(kind: 'article' | 'ticker') {
	return (await queryOne<{ count: number }>(`SELECT COUNT(*) AS count FROM site_news WHERE kind = :kind AND ${PUBLISHED}`, { kind }))?.count ?? 0;
}

export async function newsArticle(id: number) {
	const row = await queryOne<NewsRow>(
		`SELECT id, kind, title, body, author, published_at FROM site_news WHERE id = :id AND kind = 'article' AND ${PUBLISHED}`,
		{ id }
	);
	if (!row) return null;
	const newer = await queryOne<{ id: number }>(
		`SELECT id FROM site_news WHERE kind = 'article' AND ${PUBLISHED} AND (published_at, id) > (:at, :id) ORDER BY published_at, id LIMIT 1`,
		{ at: row.published_at, id }
	);
	const older = await queryOne<{ id: number }>(
		`SELECT id FROM site_news WHERE kind = 'article' AND ${PUBLISHED} AND (published_at, id) < (:at, :id) ORDER BY published_at DESC, id DESC LIMIT 1`,
		{ at: row.published_at, id }
	);
	return { article: toItem(row), newerId: newer?.id ?? null, olderId: older?.id ?? null };
}
