import { json } from '@sveltejs/kit';
import { characterNameError } from '$lib/server/names';
import { RateLimit } from '$lib/server/ratelimit';
import type { RequestHandler } from './$types';

// "Is this character name free?" while typing on the sign-up page
const checks = new RateLimit(120, 60_000);

export const GET: RequestHandler = async ({ url, getClientAddress }) => {
	const ip = getClientAddress();
	if (checks.blocked(ip)) return json({ error: 'Too many checks, slow down a little.' }, { status: 429 });
	checks.hit(ip);
	const name = (url.searchParams.get('name') ?? '').slice(0, 40);
	return json({ error: await characterNameError(name) });
};
