import { error } from '@sveltejs/kit';
import { outfitPng } from '$lib/server/outfits';
import type { RequestHandler } from './$types';

// /outfit/<looktype>-<head>-<body>-<legs>-<feet>.png
export const GET: RequestHandler = async ({ params }) => {
	const match = params.spec.match(/^(\d{1,4})-(\d{1,3})-(\d{1,3})-(\d{1,3})-(\d{1,3})\.png$/);
	if (!match) error(404);
	const [looktype, head, body, legs, feet] = match.slice(1).map(Number);
	const image = await outfitPng(looktype, [head, body, legs, feet]);
	if (!image) error(404);
	return new Response(new Uint8Array(image), {
		headers: { 'content-type': 'image/png', 'cache-control': 'public, max-age=86400' }
	});
};
