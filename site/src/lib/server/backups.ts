import { readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { config } from './config';

// The backup service's dumps (deploy/backup.sh). "Back up now" leaves a
// file there that the service looks for every 30 seconds.
const TRIGGER = '.backup-now';

export async function listBackups() {
	try {
		const names = (await readdir(config.backupsDir)).filter((name) => /^[\w.-]+\.sql\.gz$/.test(name)).sort().reverse();
		return Promise.all(
			names.map(async (name) => {
				const info = await stat(path.join(config.backupsDir, name));
				return { name, size: info.size, at: info.mtime.getTime() };
			})
		);
	} catch {
		return null;
	}
}

export function backupPath(name: string) {
	return /^[\w.-]+\.sql\.gz$/.test(name) ? path.join(config.backupsDir, name) : null;
}

export async function requestBackup() {
	await writeFile(path.join(config.backupsDir, TRIGGER), new Date().toISOString());
}

export async function backupRequested() {
	return stat(path.join(config.backupsDir, TRIGGER)).then(
		() => true,
		() => false
	);
}
