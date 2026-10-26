import { execute, query, queryOne } from './db';

// Reports from players to staff: a character (name, behaviour) or a news
// comment. Staff handle them under Admin > Reports.
export const REPORT_REASONS = ['Offensive name', 'Offensive statement', 'Botting or cheating', 'Bug abuse', 'Harassment', 'Other'];

export async function report(input: {
	kind: 'character' | 'comment';
	targetPlayer: string;
	commentId?: number;
	reason: string;
	text: string;
	accountId: number;
	reporter: string;
}) {
	// one open report per reporter and target is enough
	const open = await queryOne(
		`SELECT 1 FROM site_reports WHERE status = 'open' AND reporter_account_id = :accountId AND kind = :kind
		 AND target_player = :targetPlayer AND (comment_id <=> :commentId)`,
		{ accountId: input.accountId, kind: input.kind, targetPlayer: input.targetPlayer, commentId: input.commentId ?? null }
	);
	if (open) return false;
	await execute(
		`INSERT INTO site_reports (kind, target_player, comment_id, reason, text, reporter_account_id, reporter)
		 VALUES (:kind, :targetPlayer, :commentId, :reason, :text, :accountId, :reporter)`,
		{ ...input, commentId: input.commentId ?? null, text: input.text.slice(0, 1000) }
	);
	return true;
}

export async function openReportCount() {
	return (await queryOne<{ count: number }>("SELECT COUNT(*) AS count FROM site_reports WHERE status = 'open'"))?.count ?? 0;
}

export async function reports(status: 'open' | 'closed') {
	return query<{
		id: number;
		kind: string;
		target_player: string;
		comment_id: number | null;
		comment: string | null;
		news_id: number | null;
		reason: string;
		text: string;
		reporter: string;
		created_at: Date;
		handled_by: string | null;
		handled_at: Date | null;
		outcome: string;
	}>(
		`SELECT r.*, c.text AS comment, c.news_id FROM site_reports r LEFT JOIN site_news_comments c ON c.id = r.comment_id
		 WHERE r.status = :status ORDER BY r.id ${status === 'open' ? 'ASC' : 'DESC'} LIMIT 200`,
		{ status }
	);
}

export async function closeReport(id: number, by: string, outcome: string) {
	await execute(
		"UPDATE site_reports SET status = 'closed', handled_by = :by, handled_at = UTC_TIMESTAMP(), outcome = :outcome WHERE id = :id",
		{ id, by, outcome: outcome.slice(0, 255) }
	);
}
