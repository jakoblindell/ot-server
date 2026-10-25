import { query } from '$lib/server/db';
import { requireStaff } from '$lib/server/staff';
import type { PageServerLoad } from './$types';

const PER_PAGE = 50;

export const load: PageServerLoad = async (event) => {
	await requireStaff(event);
	const q = (event.url.searchParams.get('q') ?? '').trim().slice(0, 64);
	const page = Math.max(1, Number(event.url.searchParams.get('page')) || 1);
	const where = q ? 'WHERE actor = :q OR target_player LIKE :like OR action LIKE :like OR details LIKE :like' : '';
	const rows = await query<{ id: number; created_at: Date; actor: string; action: string; target_player: string | null; details: string; ip: string }>(
		`SELECT id, created_at, actor, action, target_player, details, ip FROM site_audit_log ${where}
		 ORDER BY id DESC LIMIT :limit OFFSET :offset`,
		{ q, like: `%${q.replace(/[%_\\]/g, '\\$&')}%`, limit: PER_PAGE + 1, offset: (page - 1) * PER_PAGE }
	);
	return {
		q,
		page,
		more: rows.length > PER_PAGE,
		rows: rows.slice(0, PER_PAGE).map((row) => ({ ...row, created_at: row.created_at.getTime() }))
	};
};
