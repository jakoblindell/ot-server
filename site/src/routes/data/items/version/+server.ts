import { json } from '@sveltejs/kit';
import { getItemData } from '$lib/server/itemdata';
import type { RequestHandler } from './$types';

// The item data file's version (ot-client#31): the client checks this at
// login and downloads /data/items/<version>.json only when it changed
export const GET: RequestHandler = async () => {
	const { version } = await getItemData();
	return json({ version, url: `/data/items/${version}.json` }, { headers: { 'cache-control': 'no-cache' } });
};
