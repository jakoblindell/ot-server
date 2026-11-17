import { error } from '@sveltejs/kit';
import { clientReportScreenshot } from '$lib/server/clientreports';
import { requireStaff } from '$lib/server/staff';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	await requireStaff(event, 'players');
	const png = await clientReportScreenshot(Number(event.params.id));
	if (!png) error(404, 'No screenshot');
	return new Response(new Uint8Array(png), {
		headers: { 'Content-Type': 'image/png', 'Cache-Control': 'private, max-age=3600', 'X-Content-Type-Options': 'nosniff' }
	});
};
