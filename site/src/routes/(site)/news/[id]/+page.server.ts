import { error } from '@sveltejs/kit';
import { newsArticle } from '$lib/server/news';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const found = /^\d+$/.test(params.id) ? await newsArticle(Number(params.id)) : null;
	if (!found) error(404, 'No such news article');
	return found;
};
