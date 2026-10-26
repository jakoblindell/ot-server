import { error } from '@sveltejs/kit';
import { itemPng } from '$lib/server/outfits';
import type { RequestHandler } from './$types';

// /item/<id>.png
export const GET: RequestHandler = async ({ params }) => {
	const match = params.spec.match(/^(\d{1,5})\.png$/);
	if (!match) error(404);
	const image = await itemPng(Number(match[1]));
	if (!image) error(404);
	return new Response(new Uint8Array(image), { headers: { 'content-type': 'image/png', 'cache-control': 'public, max-age=86400' } });
};
