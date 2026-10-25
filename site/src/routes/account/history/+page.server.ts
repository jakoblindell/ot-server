import { query } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const logins = await query<{ id: number; created_at: Date; ip: string; user_agent: string; success: number }>(
		'SELECT id, created_at, ip, user_agent, success FROM site_login_history WHERE account_id = :id ORDER BY id DESC LIMIT 50',
		{ id: locals.account!.id }
	);
	return {
		logins: logins.map((login) => ({
			id: login.id,
			at: login.created_at.getTime(),
			ip: login.ip,
			browser: login.user_agent,
			success: !!login.success
		}))
	};
};
