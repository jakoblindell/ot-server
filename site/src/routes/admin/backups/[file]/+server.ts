import { error } from '@sveltejs/kit';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { Readable } from 'node:stream';
import { backupPath } from '$lib/server/backups';
import { audit, requireStaff } from '$lib/server/staff';
import type { RequestHandler } from './$types';

// The dump as a download (it holds password hashes: gods only, logged)
export const GET: RequestHandler = async (event) => {
	await requireStaff(event, 'server');
	const file = backupPath(event.params.file);
	if (!file) error(404);
	const info = await stat(file).catch(() => null);
	if (!info) error(404);
	await audit(event, 'backup.download', `Downloaded ${event.params.file}`);
	return new Response(Readable.toWeb(createReadStream(file)) as ReadableStream, {
		headers: {
			'content-type': 'application/gzip',
			'content-length': String(info.size),
			'content-disposition': `attachment; filename="${event.params.file}"`
		}
	});
};
