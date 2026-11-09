import { json } from '@sveltejs/kit';
import { submit } from '$lib/server/clientreports';
import { RateLimit } from '$lib/server/ratelimit';
import type { RequestHandler } from './$types';

// A bug report from the game client (ot-client#67), with the one-time token
// the game server gave the player (ot-server#48)
const posts = new RateLimit(10, 10 * 60_000);

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	const ip = getClientAddress();
	if (posts.blocked(ip)) return json({ error: 'Too many reports, try again later.' }, { status: 429 });
	posts.hit(ip);
	let body;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Not a report.' }, { status: 400 });
	}
	const result = await submit(body, ip);
	if ('error' in result) return json({ error: result.error }, { status: result.status });
	return json({ ok: true, id: result.id });
};
