import { execute, query, queryOne } from './db';

// Bug reports sent from inside the game client (ot-server#48, ot-client#67).
// The client gets a one-time token from the game server (opcode 106,
// data/lib/reports/client_reports.lua) and posts the report here with it.

export const TOKEN_LIFETIME = 10 * 60;
export const LIMITS = { text: 2000, info: 200_000, logs: 200_000, screenshot: 6 * 1024 * 1024 };

const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

export type Submission = { token: string; text: string; info: unknown; logs: string; screenshot?: string };

// Stores a report; an error message when it can't
export async function submit(input: Submission, ip: string): Promise<{ id: number } | { error: string; status: number }> {
	if (typeof input?.token !== 'string' || !/^[0-9a-f]{32}$/.test(input.token)) return { error: 'Invalid token.', status: 403 };
	const text = typeof input.text === 'string' ? input.text.trim().slice(0, LIMITS.text) : '';
	const info = JSON.stringify(input.info ?? {});
	const logs = typeof input.logs === 'string' ? input.logs : '';
	if (info.length > LIMITS.info || logs.length > LIMITS.logs) return { error: 'The report is too large.', status: 413 };
	let screenshot: Buffer | null = null;
	if (typeof input.screenshot === 'string' && input.screenshot) {
		screenshot = Buffer.from(input.screenshot, 'base64');
		if (screenshot.length > LIMITS.screenshot) return { error: 'The screenshot is too large.', status: 413 };
		if (!screenshot.subarray(0, 8).equals(PNG)) screenshot = null;
	}

	// the token, once: taking it out first means a second post with it fails
	const owner = await queryOne<{ account_id: number; player_id: number; player_name: string; created_at: number }>(
		'SELECT account_id, player_id, player_name, created_at FROM client_report_tokens WHERE token = :token',
		{ token: input.token }
	);
	if (!owner) return { error: 'This report was already sent or its token is unknown. Open the report again.', status: 403 };
	const taken = await execute('DELETE FROM client_report_tokens WHERE token = :token', { token: input.token });
	if (taken.affectedRows !== 1) return { error: 'This report was already sent.', status: 403 };
	if (Date.now() / 1000 - owner.created_at > TOKEN_LIFETIME) return { error: 'The report took too long. Open it again.', status: 403 };

	const result = await execute(
		`INSERT INTO client_reports (account_id, player_id, player_name, text, info, logs, screenshot, ip)
		 VALUES (:accountId, :playerId, :playerName, :text, :info, :logs, :screenshot, :ip)`,
		{ accountId: owner.account_id, playerId: owner.player_id, playerName: owner.player_name, text, info, logs, screenshot, ip: ip.slice(0, 64) }
	);
	return { id: result.insertId };
}

export async function openClientReportCount() {
	return (await queryOne<{ count: number }>("SELECT COUNT(*) AS count FROM client_reports WHERE status = 'open'"))?.count ?? 0;
}

export async function clientReports(status: 'open' | 'closed') {
	return query<{
		id: number;
		player_name: string;
		text: string;
		info: string;
		has_screenshot: number;
		created_at: Date;
		handled_by: string | null;
		handled_at: Date | null;
		outcome: string;
	}>(
		`SELECT id, player_name, text, info, screenshot IS NOT NULL AS has_screenshot, created_at, handled_by, handled_at, outcome
		 FROM client_reports WHERE status = :status ORDER BY id ${status === 'open' ? 'ASC' : 'DESC'} LIMIT 100`,
		{ status }
	);
}

export async function clientReport(id: number) {
	return queryOne<{
		id: number;
		player_name: string;
		text: string;
		info: string;
		logs: string;
		has_screenshot: number;
		created_at: Date;
		status: string;
		handled_by: string | null;
		handled_at: Date | null;
		outcome: string;
	}>(
		`SELECT id, player_name, text, info, logs, screenshot IS NOT NULL AS has_screenshot, created_at, status, handled_by, handled_at, outcome
		 FROM client_reports WHERE id = :id`,
		{ id }
	);
}

export async function clientReportScreenshot(id: number) {
	return (await queryOne<{ screenshot: Buffer | null }>('SELECT screenshot FROM client_reports WHERE id = :id', { id }))?.screenshot ?? null;
}

export async function closeClientReport(id: number, by: string, outcome: string) {
	await execute(
		"UPDATE client_reports SET status = 'closed', handled_by = :by, handled_at = UTC_TIMESTAMP(), outcome = :outcome WHERE id = :id",
		{ id, by, outcome: outcome.slice(0, 255) }
	);
}
