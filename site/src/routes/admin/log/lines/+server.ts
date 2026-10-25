import { json } from '@sveltejs/kit';
import { serverLog } from '$lib/server/gamefiles';
import { requireStaff } from '$lib/server/staff';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	await requireStaff(event, 'server');
	return json({ lines: await serverLog(400) });
};
