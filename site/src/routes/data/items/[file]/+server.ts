import { error } from '@sveltejs/kit';
import { getItemData } from '$lib/server/itemdata';
import type { RequestHandler } from './$types';

// The item data file (ot-client#31) by version: never changes, so it may be
// cached forever; compressed when the client accepts it
export const GET: RequestHandler = async ({ params, request }) => {
	const { version, json, gzip } = await getItemData();
	if (params.file !== `${version}.json`) error(404, 'Not an item data version');
	const headers: Record<string, string> = {
		'content-type': 'application/json',
		'cache-control': 'public, max-age=31536000, immutable',
		'access-control-allow-origin': '*'
	};
	if (request.headers.get('accept-encoding')?.includes('gzip')) {
		return new Response(new Uint8Array(gzip), { headers: { ...headers, 'content-encoding': 'gzip' } });
	}
	return new Response(json, { headers });
};
