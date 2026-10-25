import { fail, redirect } from '@sveltejs/kit';
import { execute, query, queryOne } from '$lib/server/db';
import { audit, requireStaff } from '$lib/server/staff';
import type { Actions, PageServerLoad } from './$types';

type NewsRow = { id: number; kind: 'article' | 'ticker'; title: string; body: string; author: string; published_at: Date | null };

export const load: PageServerLoad = async (event) => {
	await requireStaff(event, 'news');
	const posts = await query<NewsRow>('SELECT id, kind, title, body, author, published_at FROM site_news ORDER BY COALESCE(published_at, created_at) DESC, id DESC LIMIT 100');
	const editId = Number(event.url.searchParams.get('edit')) || 0;
	const editing = editId ? await queryOne<NewsRow>('SELECT id, kind, title, body, author, published_at FROM site_news WHERE id = :id', { id: editId }) : null;
	const toPost = (row: NewsRow) => ({ ...row, published_at: row.published_at?.getTime() ?? 0 });
	return { posts: posts.map(toPost), editing: editing ? toPost(editing) : null };
};

export const actions: Actions = {
	save: async (event) => {
		const staff = await requireStaff(event, 'news');
		const form = await event.request.formData();
		const id = Number(form.get('id')) || 0;
		const kind = form.get('kind') === 'ticker' ? 'ticker' : 'article';
		const title = String(form.get('title') ?? '').trim().slice(0, 120);
		const body = String(form.get('body') ?? '').trim();
		const author = String(form.get('author') ?? '').trim().slice(0, 64) || staff.name;
		const publish = String(form.get('publish') ?? 'now');
		if (kind === 'article' && (!title || !body)) return fail(400, { error: 'An article needs a title and text.' });
		if (kind === 'ticker' && !title) return fail(400, { error: 'A ticker line needs its text in the title.' });
		const publishedAt = publish === 'draft' ? null : publish === 'keep' ? undefined : new Date();
		const values = { id, kind, title, body, author, publishedAt: publishedAt ?? null };
		if (id) {
			await execute(
				`UPDATE site_news SET kind = :kind, title = :title, body = :body, author = :author${publishedAt === undefined ? '' : ', published_at = :publishedAt'} WHERE id = :id`,
				values
			);
		} else {
			await execute(
				'INSERT INTO site_news (kind, title, body, author, published_at) VALUES (:kind, :title, :body, :author, :publishedAt)',
				values
			);
		}
		await audit(event, id ? 'news.edit' : 'news.create', `${kind === 'article' ? 'Article' : 'Ticker'} "${title}"${publish === 'draft' ? ' (draft)' : ''}`);
		redirect(303, '/admin/news');
	},
	delete: async (event) => {
		await requireStaff(event, 'news');
		const form = await event.request.formData();
		const id = Number(form.get('id'));
		const post = await queryOne<{ title: string }>('SELECT title FROM site_news WHERE id = :id', { id });
		if (!post) return fail(404, { error: 'No such post.' });
		await execute('DELETE FROM site_news WHERE id = :id', { id });
		await audit(event, 'news.delete', `Deleted "${post.title}"`);
		return { message: 'Deleted.' };
	}
};
