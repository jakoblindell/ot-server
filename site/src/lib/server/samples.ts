import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { config } from './config';
import { execute, query } from './db';
import { getServerStatus } from './status';

export async function recordOnlineSample() {
	const status = await getServerStatus();
	if (!status.online) return;
	await execute('INSERT IGNORE INTO site_online_samples (sampled_at, players) VALUES (UTC_TIMESTAMP(), :players)', {
		players: status.playersOnline
	});
	await execute('DELETE FROM site_online_samples WHERE sampled_at < UTC_TIMESTAMP() - INTERVAL 14 DAY');
}

/** Players online per hour over the last 24 hours (the highest sample of each hour) */
export async function onlineLastDay() {
	const rows = await query<{ hour: Date; players: number }>(
		`SELECT DATE_FORMAT(sampled_at, '%Y-%m-%d %H:00:00') AS hour, MAX(players) AS players
		 FROM site_online_samples WHERE sampled_at >= UTC_TIMESTAMP() - INTERVAL 24 HOUR GROUP BY hour ORDER BY hour`
	);
	const byHour = new Map(rows.map((row) => [String(row.hour).slice(0, 13), Number(row.players)]));
	const now = new Date();
	return Array.from({ length: 24 }, (_, index) => {
		const at = new Date(now.getTime() - (23 - index) * 3600_000);
		const key = at.toISOString().slice(0, 13).replace('T', ' ');
		return { at: Date.UTC(at.getUTCFullYear(), at.getUTCMonth(), at.getUTCDate(), at.getUTCHours()), players: byHour.get(key) ?? null };
	});
}

/** The newest database dump: when, and how big */
export async function latestBackup() {
	try {
		const files = (await readdir(config.backupsDir)).filter((file) => file.endsWith('.sql.gz')).sort();
		const newest = files.at(-1);
		if (!newest) return null;
		const info = await stat(path.join(config.backupsDir, newest));
		return { name: newest, at: info.mtime.getTime(), size: info.size, count: files.length };
	} catch {
		return null;
	}
}
