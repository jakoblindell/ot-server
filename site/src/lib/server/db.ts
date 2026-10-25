import mysql from 'mysql2/promise';
import { config } from './config';

export const db = mysql.createPool({
	...config.db,
	connectionLimit: 10,
	namedPlaceholders: true,
	charset: 'utf8mb4',
	// DATETIME columns as Date in UTC
	timezone: 'Z'
});

export type Row = mysql.RowDataPacket;

/** Rows of a SELECT */
export async function query<T = Row>(sql: string, params: Record<string, unknown> | unknown[] = {}): Promise<T[]> {
	const [rows] = await db.query<Row[]>(sql, params);
	return rows as T[];
}

/** The first row of a SELECT, or undefined */
export async function queryOne<T = Row>(sql: string, params: Record<string, unknown> | unknown[] = {}): Promise<T | undefined> {
	return (await query<T>(sql, params))[0];
}

/** INSERT, UPDATE, DELETE */
export async function execute(sql: string, params: Record<string, unknown> | unknown[] = {}) {
	const [result] = await db.execute<mysql.ResultSetHeader>(sql, params);
	return result;
}
