import { error, fail, redirect } from '@sveltejs/kit';
import { config } from '$lib/server/config';
import { execute, query, queryOne } from '$lib/server/db';
import { vocationName } from '$lib/server/game';
import { newsArticle } from '$lib/server/news';
import { RateLimit } from '$lib/server/ratelimit';
import { report, REPORT_REASONS } from '$lib/server/reports';
import { audit, can } from '$lib/server/staff';
import type { Actions, PageServerLoad, RequestEvent } from './$types';

// A comment per account every 30 seconds
const posting = new RateLimit(1, 30_000);

export const load: PageServerLoad = async ({ params, locals }) => {
	const found = /^\d+$/.test(params.id) ? await newsArticle(Number(params.id)) : null;
	if (!found) error(404, 'No such news article');
	const moderator = can(locals.account, 'news');
	const comments = await query<{ id: number; text: string; created_at: Date; hidden_by: string | null; name: string; level: number; vocation: number; type: number }>(
		`SELECT c.id, c.text, c.created_at, c.hidden_by, p.name, p.level, p.vocation, a.type
		 FROM site_news_comments c JOIN players p ON p.id = c.player_id JOIN accounts a ON a.id = c.account_id
		 WHERE c.news_id = :id ${moderator ? '' : 'AND c.hidden_by IS NULL'} ORDER BY c.id`,
		{ id: found.article.id }
	);
	const characters = locals.account
		? await query<{ id: number; name: string; level: number }>(
				'SELECT id, name, level FROM players WHERE account_id = :account AND deletion = 0 ORDER BY level DESC',
				{ account: locals.account.id }
			)
		: [];
	return {
		...found,
		comments: comments.map((comment) => ({
			id: comment.id,
			text: comment.text,
			at: comment.created_at.getTime(),
			hidden: !!comment.hidden_by,
			name: comment.name,
			meta: comment.type >= 4 ? (comment.type >= 5 ? 'God' : 'Gamemaster') : `Level ${comment.level} · ${vocationName(comment.vocation)}`,
			staff: comment.type >= 4
		})),
		loggedIn: !!locals.account,
		characters: characters.filter((character) => character.level >= config.commentMinLevel || (locals.account?.type ?? 0) >= 4),
		minLevel: config.commentMinLevel,
		moderator,
		reasons: REPORT_REASONS
	};
};

async function articleId(event: RequestEvent) {
	if (!event.locals.account) redirect(303, `/login?next=${encodeURIComponent(event.url.pathname)}`);
	return Number(event.params.id);
}

export const actions: Actions = {
	comment: async (event) => {
		const newsId = await articleId(event);
		const account = event.locals.account!;
		const form = await event.request.formData();
		const text = String(form.get('text') ?? '').trim();
		const playerId = Number(form.get('character'));
		if (text.length < 2 || text.length > 1000) return fail(400, { error: 'A comment needs 2 to 1000 characters.', text });
		const character = await queryOne<{ level: number }>('SELECT level FROM players WHERE id = :playerId AND account_id = :account AND deletion = 0', {
			playerId,
			account: account.id
		});
		if (!character) return fail(400, { error: 'Pick one of your characters.', text });
		if (character.level < config.commentMinLevel && account.type < 4) {
			return fail(400, { error: `Characters need level ${config.commentMinLevel} to comment.`, text });
		}
		if (posting.blocked(String(account.id))) return fail(429, { error: 'Wait a moment before commenting again.', text });
		posting.hit(String(account.id));
		await execute('INSERT INTO site_news_comments (news_id, player_id, account_id, text) VALUES (:newsId, :playerId, :account, :text)', {
			newsId,
			playerId,
			account: account.id,
			text
		});
		return { message: 'Comment posted.' };
	},
	hide: async (event) => {
		await articleId(event);
		if (!can(event.locals.account, 'news')) return fail(403, { error: 'Staff only.' });
		const form = await event.request.formData();
		const id = Number(form.get('comment'));
		const show = form.get('show') === '1';
		await execute('UPDATE site_news_comments SET hidden_by = :by WHERE id = :id', { by: show ? null : event.locals.account!.name, id });
		await audit(event, show ? 'news.comment.show' : 'news.comment.hide', `${show ? 'Showed' : 'Hid'} comment ${id} on news ${event.params.id}`);
		return { message: show ? 'Comment shown again.' : 'Comment hidden.' };
	},
	report: async (event) => {
		await articleId(event);
		const account = event.locals.account!;
		const form = await event.request.formData();
		const commentId = Number(form.get('comment'));
		const reason = String(form.get('reason') ?? '');
		const comment = await queryOne<{ name: string }>(
			'SELECT p.name FROM site_news_comments c JOIN players p ON p.id = c.player_id WHERE c.id = :commentId',
			{ commentId }
		);
		if (!comment || !REPORT_REASONS.includes(reason)) return fail(400, { error: 'Pick a reason.' });
		await report({ kind: 'comment', targetPlayer: comment.name, commentId, reason, text: String(form.get('text') ?? ''), accountId: account.id, reporter: account.name });
		return { message: 'Thank you, staff will look at it.' };
	}
};
