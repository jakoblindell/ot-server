import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { db } from './db';

// Applies the SQL files in site/migrations that have not run yet, in name
// order. Each file runs once; its name is recorded in site_migrations.
export async function migrate(directory = path.resolve('migrations')) {
	await db.query(
		'CREATE TABLE IF NOT EXISTS site_migrations (name VARCHAR(255) PRIMARY KEY, applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB'
	);
	const [rows] = await db.query<import('./db').Row[]>('SELECT name FROM site_migrations');
	const applied = new Set(rows.map((row) => row.name as string));
	const files = (await readdir(directory)).filter((file) => file.endsWith('.sql')).sort();
	for (const file of files) {
		if (applied.has(file)) continue;
		const sql = await readFile(path.join(directory, file), 'utf8');
		const connection = await db.getConnection();
		try {
			for (const statement of splitStatements(sql)) {
				await connection.query(statement);
			}
			await connection.query('INSERT INTO site_migrations (name) VALUES (?)', [file]);
			console.log(`migration ${file} applied`);
		} finally {
			connection.release();
		}
	}
}

/** Statements separated by ";" at the end of a line; "--" comments dropped */
function splitStatements(sql: string) {
	return sql
		.split('\n')
		.filter((line) => !line.trim().startsWith('--'))
		.join('\n')
		.split(/;\s*$/m)
		.map((statement) => statement.trim())
		.filter(Boolean);
}
