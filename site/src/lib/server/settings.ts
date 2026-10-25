import { config } from './config';
import { execute, query } from './db';

// Site-wide settings staff can change (site_settings), with defaults
const defaults: Record<string, string> = {
	defaultTheme: config.defaultTheme
};

let cache: Record<string, string> | undefined;

export async function getSettings() {
	if (!cache) {
		const rows = await query<{ name: string; value: string }>('SELECT name, value FROM site_settings');
		cache = { ...defaults, ...Object.fromEntries(rows.map((row) => [row.name, row.value])) };
	}
	return cache;
}

export async function setSetting(name: string, value: string) {
	await execute('INSERT INTO site_settings (name, value) VALUES (:name, :value) ON DUPLICATE KEY UPDATE value = :value', { name, value });
	cache = undefined;
}
