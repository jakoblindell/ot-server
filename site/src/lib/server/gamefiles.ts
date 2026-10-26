import { execFile } from 'node:child_process';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import luaparse from 'luaparse';
import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { config } from './config';

// The game server's editable files: a git repository in the game-files
// volume (see deploy/game-files.sh). Staff edit the "staged" working copy;
// the server runs "live". Staged changes go live at the next server start
// (the daily server save), or file by file with "apply now" when the server
// can reload that part.

const run = promisify(execFile);
const staged = () => path.join(config.gameFiles, 'staged');
const live = () => path.join(config.gameFiles, 'live');

/** Text files staff may edit or create */
const EDITABLE = /\.(lua|xml|txt|srv|npc|ndb)$/i;
const MAX_SIZE = 4 * 1024 * 1024;

// One git operation at a time
let queue: Promise<unknown> = Promise.resolve();
function serial<T>(work: () => Promise<T>): Promise<T> {
	const next = queue.then(work, work);
	queue = next.catch(() => undefined);
	return next;
}

async function git(cwd: string, args: string[], env: Record<string, string> = {}) {
	const { stdout } = await run('git', ['-c', 'safe.directory=*', '-c', 'core.quotePath=false', ...args], {
		cwd,
		maxBuffer: 32 * 1024 * 1024,
		env: { ...process.env, GIT_TERMINAL_PROMPT: '0', ...env }
	});
	return stdout;
}

function author(name: string) {
	const email = `${name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'staff'}@elderwood.invalid`;
	return {
		GIT_AUTHOR_NAME: name,
		GIT_AUTHOR_EMAIL: email,
		GIT_COMMITTER_NAME: name,
		GIT_COMMITTER_EMAIL: email
	};
}

/** A path inside the repository, or null for anything that tries to leave it */
export function safePath(file: string) {
	const clean = path.posix.normalize(file.replace(/\\/g, '/')).replace(/^\/+/, '');
	if (!clean || clean.startsWith('..') || clean.startsWith('.git') || clean.includes('/.git')) return null;
	return clean;
}

export async function available() {
	try {
		await git(staged(), ['rev-parse', '--is-inside-work-tree']);
		return true;
	} catch {
		return false;
	}
}

/** The last server start: when, and what happened to the files */
export async function startStatus() {
	try {
		const text = await readFile(path.join(config.gameFiles, 'status'), 'utf8');
		const lines = text.split('\n').filter(Boolean);
		return {
			started: lines.find((line) => line.startsWith('started='))?.slice(8) ?? '',
			notes: lines.filter((line) => line.startsWith('note=')).map((line) => line.slice(5)),
			clashes: lines.filter((line) => line.startsWith('clash=')).map((line) => line.slice(6))
		};
	} catch {
		return { started: '', notes: [], clashes: [] };
	}
}

export async function listFiles() {
	const [files, changed] = await Promise.all([git(staged(), ['ls-files']), git(staged(), ['diff', '--name-only', 'live', 'staged'])]);
	const pending = new Set(changed.split('\n').filter(Boolean));
	return files
		.split('\n')
		.filter(Boolean)
		.map((file) => ({ path: file, editable: EDITABLE.test(file), pending: pending.has(file) }));
}

export async function readStaged(file: string) {
	const clean = safePath(file);
	if (!clean) return null;
	try {
		const content = await readFile(path.join(staged(), clean));
		if (content.length > MAX_SIZE) return { content: '', tooBig: true };
		// The server's files are Latin-1 (Windows-1252); kept byte for byte
		return { content: content.toString('latin1'), tooBig: false };
	} catch {
		return null;
	}
}

/** Problems that would stop the server loading the file, or null */
export function checkContent(file: string, content: string): string | null {
	if (file.endsWith('.lua')) {
		try {
			luaparse.parse(content, { luaVersion: 'LuaJIT' });
		} catch (error) {
			return `Lua: ${(error as Error).message}`;
		}
	} else if (file.endsWith('.xml')) {
		const result = XMLValidator.validate(content);
		if (result !== true) return `XML, line ${result.err.line}: ${result.err.msg}`;
		const text = strayText(content);
		if (text) return `XML: text outside the tags ("${text.slice(0, 40)}"); the game's XML files keep everything in tags and attributes`;
	}
	return null;
}

// The game's XML files have no text between tags, so text there is a typo
// (valid XML, but the server would ignore it silently)
const textFinder = new XMLParser({ preserveOrder: true, ignoreAttributes: true, ignoreDeclaration: true, commentPropName: '#comment' });
type OrderedNode = Record<string, OrderedNode[] | string>;
function strayText(content: string): string | null {
	const walk = (nodes: OrderedNode[]): string | null => {
		for (const node of nodes) {
			for (const [key, value] of Object.entries(node)) {
				if (key === '#text' && String(value).trim()) return String(value).trim();
				if (key !== '#comment' && Array.isArray(value)) {
					const found = walk(value);
					if (found) return found;
				}
			}
		}
		return null;
	};
	return walk(textFinder.parse(content) as OrderedNode[]);
}

export async function saveStaged(file: string, content: string, by: string, message: string) {
	const clean = safePath(file);
	if (!clean || !EDITABLE.test(clean)) throw new Error('This file cannot be edited here.');
	if (content.length > MAX_SIZE) throw new Error('The file is too big.');
	return serial(async () => {
		const target = path.join(staged(), clean);
		await mkdir(path.dirname(target), { recursive: true });
		await writeFile(target, Buffer.from(content.replace(/\r\n/g, '\n'), 'latin1'));
		await git(staged(), ['add', '--', clean]);
		const nothing = await git(staged(), ['diff', '--cached', '--quiet']).then(
			() => true,
			() => false
		);
		if (nothing) return false;
		await git(staged(), ['commit', '-q', '-m', message || `Edit ${clean}`], author(by));
		return true;
	});
}

export async function history(file: string, limit = 20) {
	const clean = safePath(file);
	if (!clean) return [];
	const out = await git(staged(), ['log', '--no-merges', `-${limit}`, '--format=%h%x1f%an%x1f%at%x1f%s', '--', clean]);
	return out
		.split('\n')
		.filter(Boolean)
		.map((line) => {
			const [hash, by, at, subject] = line.split('\x1f');
			return { hash, by, at: Number(at) * 1000, subject };
		});
}

export async function commitDiff(hash: string, file: string) {
	const clean = safePath(file);
	if (!clean || !/^[0-9a-f]{4,40}$/.test(hash)) return '';
	return git(staged(), ['show', '--format=', '--patch', hash, '--', clean]);
}

/** Puts an older version of the file back (as a new staged change) */
export async function restore(file: string, hash: string, by: string) {
	const clean = safePath(file);
	if (!clean || !/^[0-9a-f]{4,40}$/.test(hash)) throw new Error('Bad request');
	return serial(async () => {
		await git(staged(), ['checkout', hash, '--', clean]);
		await git(staged(), ['commit', '-q', '-m', `Restore ${clean} from ${hash}`], author(by)).catch(() => undefined);
	});
}

/** Everything that changes at the next server start */
export async function pendingChanges() {
	const [statusOut, logOut] = await Promise.all([
		git(staged(), ['diff', '--name-status', 'live', 'staged']),
		git(staged(), ['log', '--no-merges', '--format=%h%x1f%an%x1f%at%x1f%s', 'live..staged'])
	]);
	const files = await Promise.all(
		statusOut
			.split('\n')
			.filter(Boolean)
			.map(async (line) => {
				const [status, file] = line.split('\t');
				const diff = await git(staged(), ['diff', 'live', 'staged', '--', file]);
				return { path: file, status: status[0], diff, reload: reloadTypeFor(file) };
			})
	);
	const commits = logOut
		.split('\n')
		.filter(Boolean)
		.map((line) => {
			const [hash, by, at, subject] = line.split('\x1f');
			return { hash, by, at: Number(at) * 1000, subject };
		});
	return { files, commits };
}

/** Takes a pending change back: the staged file becomes the live one again */
export async function discard(file: string, by: string) {
	const clean = safePath(file);
	if (!clean) throw new Error('Bad request');
	return serial(async () => {
		const inLive = await git(staged(), ['cat-file', '-e', `live:${clean}`]).then(
			() => true,
			() => false
		);
		if (inLive) await git(staged(), ['checkout', 'live', '--', clean]);
		else await git(staged(), ['rm', '-q', '--', clean]);
		await git(staged(), ['commit', '-q', '-m', `Discard the pending change to ${clean}`], author(by)).catch(() => undefined);
	});
}

/**
 * Which part of the server a file belongs to, for Game.reload; null when
 * the server has to restart (map, vocations, groups, ...).
 */
export function reloadTypeFor(file: string): string | null {
	if (file === 'config.lua') return 'config';
	const rules: [RegExp, string][] = [
		[/^data\/actions\//, 'actions'],
		[/^data\/chatchannels\//, 'chat'],
		[/^data\/creaturescripts\//, 'creaturescripts'],
		[/^data\/events\//, 'events'],
		[/^data\/(global\.lua|lib\/)/, 'global'],
		[/^data\/globalevents\//, 'globalevents'],
		[/^data\/items\d*\//, 'items'],
		[/^data\/monster\//, 'monsters'],
		[/^data\/movements\//, 'movements'],
		[/^data\/npc\//, 'npcs'],
		[/^data\/XML\/quests\.xml$/, 'quests'],
		[/^data\/raids\//, 'raids'],
		[/^data\/spells\//, 'spells'],
		[/^data\/talkactions\//, 'talkactions'],
		[/^data\/weapons\//, 'weapons']
	];
	return rules.find(([pattern]) => pattern.test(file))?.[1] ?? null;
}

/** Puts one staged file live right away. Returns the reload type to send. */
export async function applyNow(file: string, by: string) {
	const clean = safePath(file);
	if (!clean) throw new Error('Bad request');
	const reload = reloadTypeFor(clean);
	if (!reload) throw new Error('This file needs a server restart; it goes live at the next server save.');
	return serial(async () => {
		const inStaged = await git(staged(), ['cat-file', '-e', `staged:${clean}`]).then(
			() => true,
			() => false
		);
		if (inStaged) await git(live(), ['checkout', 'staged', '--', clean]);
		else await git(live(), ['rm', '-q', '--', clean]);
		await git(live(), ['commit', '-q', '-m', `Apply now: ${clean}`], author(by));
		// staged builds on live again (the same content: no conflict)
		await git(staged(), ['merge', '-q', '--no-edit', 'live'], author(by));
		return reload;
	});
}

/** After a clash with new image files: keep the staff versions, or take the image's */
export async function resolveImageClash(keep: 'ours' | 'image', by: string) {
	return serial(async () => {
		await git(staged(), ['merge', '-q', '--no-edit', '-X', keep === 'ours' ? 'ours' : 'theirs', '-m', `Merge the server image (${keep === 'ours' ? 'keeping our edits' : "taking the image's files"})`, 'image'], author(by));
	});
}

// config.lua as a form: these settings, with how to read and write them

export const CONFIG_FIELDS = [
	{ key: 'worldType', label: 'World type', kind: 'choice', choices: ['pvp', 'no-pvp', 'pvp-enforced'] },
	{ key: 'rateExp', label: 'Experience rate', kind: 'number', hint: 'Only used when experience stages are off (data/XML/stages.xml)' },
	{ key: 'rateSkill', label: 'Skill rate', kind: 'number' },
	{ key: 'rateMagic', label: 'Magic level rate', kind: 'number' },
	{ key: 'rateLoot', label: 'Loot rate', kind: 'number' },
	{ key: 'rateSpawn', label: 'Spawn rate', kind: 'number', hint: '0: by players online (minRateSpawn–maxRateSpawn)' },
	{ key: 'protectionLevel', label: 'Protection level', kind: 'number', hint: 'Players below it cannot be attacked by players' },
	{ key: 'deathLosePercent', label: 'Death loss (%)', kind: 'number' },
	{ key: 'kickIdlePlayerAfterMinutes', label: 'Kick idle players after (minutes)', kind: 'number' },
	{ key: 'maxPlayers', label: 'Max players online', kind: 'number', hint: '0: no limit' },
	{ key: 'freePremium', label: 'Everyone is premium', kind: 'boolean' },
	{ key: 'killsDayRedSkull', label: 'Kills a day for a red skull', kind: 'number' },
	{ key: 'killsWeekRedSkull', label: 'Kills a week for a red skull', kind: 'number' },
	{ key: 'killsMonthRedSkull', label: 'Kills a month for a red skull', kind: 'number' },
	{ key: 'houseRentPeriod', label: 'House rent period', kind: 'choice', choices: ['daily', 'weekly', 'monthly', 'yearly', 'never'] }
] as const;

type ConfigValues = Record<string, string>;

function lineFor(key: string) {
	return new RegExp(`^(${key}\\s*=\\s*)(.*?)(\\s*(--.*)?)$`, 'm');
}

export function readConfig(content: string): ConfigValues {
	const values: ConfigValues = {};
	for (const field of CONFIG_FIELDS) {
		const match = content.match(lineFor(field.key));
		if (match) values[field.key] = match[2].replace(/^"(.*)"$/, '$1');
	}
	return values;
}

/** config.lua with the form's values written in place */
export function writeConfig(content: string, values: ConfigValues) {
	let out = content;
	for (const field of CONFIG_FIELDS) {
		const value = values[field.key];
		if (value === undefined) continue;
		let literal: string;
		if (field.kind === 'number') {
			if (!/^-?\d+(\.\d+)?$/.test(value)) throw new Error(`${field.label}: enter a number`);
			literal = value;
		} else if (field.kind === 'boolean') {
			literal = value === 'true' ? 'true' : 'false';
		} else {
			if (!(field.choices as readonly string[]).includes(value)) throw new Error(`${field.label}: pick one of the choices`);
			literal = `"${value}"`;
		}
		if (!lineFor(field.key).test(out)) throw new Error(`${field.key} is missing from config.lua`);
		out = out.replace(lineFor(field.key), (_, start, _old, end) => `${start}${literal}${end}`);
	}
	return out;
}

// The server's output (run-server.sh writes it to the game-files volume)
export async function serverLog(lines = 300) {
	try {
		const content = await readFile(path.join(config.gameFiles, 'logs', 'server.log'), 'utf8');
		return content.split('\n').slice(-lines - 1);
	} catch {
		return null;
	}
}
