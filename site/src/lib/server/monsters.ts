import { XMLParser } from 'fast-xml-parser';
import type { MonsterDoc, MonsterNode } from '$lib/monster';
import { listFiles, readStaged } from './gamefiles';

// Monster files as an editable tree, for the admin's monster editor. The
// tree keeps every element, attribute and comment in file order, and is
// written back in the files' own style (tabs, `<flag a="1" />`, list
// elements always open and closed), so an unchanged monster is written byte
// for byte as it was and an edit only changes the lines it touches.

// Elements written as <x ...>\n</x> even when empty (the files' style)
const LIST_TAGS = new Set(['flags', 'attacks', 'defenses', 'immunities', 'elements', 'summons', 'voices', 'loot', 'script', 'inside']);
const NAME = /^[A-Za-z_][A-Za-z0-9_]*$/;

const parser = new XMLParser({
	preserveOrder: true,
	ignoreAttributes: false,
	attributeNamePrefix: '',
	commentPropName: '#comment',
	parseAttributeValue: false,
	parseTagValue: false,
	processEntities: false
});

type Ordered = Record<string, unknown>;

function toNode(entry: Ordered): MonsterNode | null {
	const tag = Object.keys(entry).find((key) => key !== ':@');
	if (!tag || tag === '?xml' || tag === '#text') return null;
	if (tag === '#comment') {
		const parts = entry[tag] as { '#text': string }[];
		return { tag, attrs: [], children: [], text: String(parts[0]?.['#text'] ?? '') };
	}
	const attrs = Object.entries((entry[':@'] ?? {}) as Record<string, unknown>).map(([key, value]) => [key, String(value)] as [string, string]);
	const children = ((entry[tag] ?? []) as Ordered[]).map(toNode).filter((node): node is MonsterNode => node !== null);
	return { tag, attrs, children };
}

export function parseMonster(text: string): MonsterDoc {
	const root = (parser.parse(text) as Ordered[]).map(toNode).find((node) => node && node.tag === 'monster');
	if (!root) throw new Error('No <monster> element in the file.');
	const start = text.search(/<monster[\s>]/);
	const end = text.lastIndexOf('</monster>');
	return {
		prefix: text.slice(0, start),
		suffix: end >= 0 ? text.slice(end + '</monster>'.length) : '',
		commentGap: /\/><!--/.test(text) && !/\/> <!--/.test(text) ? '' : ' ',
		root
	};
}

// Values are kept as written in the file (entities included); only
// characters that would break the XML are escaped
const escapeValue = (value: string) => value.replace(/&(?!(?:[a-z]+|#\d+|#x[0-9a-f]+);)/gi, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

export function writeMonster(doc: MonsterDoc): string {
	const lines: { text: string; leaf: boolean }[] = [];
	const write = (node: MonsterNode, depth: number) => {
		const indent = '\t'.repeat(depth);
		if (node.tag === '#comment') {
			// a comment right after a one-line element stays on its line
			const last = lines[lines.length - 1];
			if (last?.leaf) last.text += `${doc.commentGap}<!--${node.text}-->`;
			else lines.push({ text: `${indent}<!--${node.text}-->`, leaf: false });
			return;
		}
		const attrs = node.attrs.map(([key, value]) => ` ${key}="${escapeValue(value)}"`).join('');
		if (!node.children.length && !LIST_TAGS.has(node.tag)) {
			lines.push({ text: `${indent}<${node.tag}${attrs} />`, leaf: true });
			return;
		}
		lines.push({ text: `${indent}<${node.tag}${attrs}>`, leaf: false });
		for (const child of node.children) write(child, depth + 1);
		lines.push({ text: `${indent}</${node.tag}>`, leaf: false });
	};
	write(doc.root, 0);
	return doc.prefix + lines.map((line) => line.text).join('\n') + doc.suffix;
}

/** Checks a tree sent by the editor (tags and attribute names, sizes) */
export function cleanNode(value: unknown, depth = 0): MonsterNode {
	if (depth > 8 || !value || typeof value !== 'object') throw new Error('Bad monster data.');
	const node = value as MonsterNode;
	if (node.tag === '#comment') {
		return { tag: '#comment', attrs: [], children: [], text: String(node.text ?? '').replace(/--/g, '- -').slice(0, 200) };
	}
	if (typeof node.tag !== 'string' || !NAME.test(node.tag)) throw new Error(`Bad element name: ${String(node.tag)}`);
	if (!Array.isArray(node.attrs) || !Array.isArray(node.children) || node.attrs.length > 60 || node.children.length > 400) {
		throw new Error('Bad monster data.');
	}
	const attrs = node.attrs
		.filter((pair) => Array.isArray(pair) && String(pair[0] ?? '').trim() !== '')
		.map(([key, val]) => {
			const name = String(key).trim();
			if (!NAME.test(name)) throw new Error(`Bad attribute name: ${name}`);
			return [name, String(val ?? '').slice(0, 500)] as [string, string];
		});
	return { tag: node.tag, attrs, children: node.children.map((child) => cleanNode(child, depth + 1)) };
}

const attr = (node: MonsterNode | undefined, key: string) => node?.attrs.find(([name]) => name === key)?.[1];
const child = (node: MonsterNode, tag: string) => node.children.find((entry) => entry.tag === tag);

/** The monsters in data/monster/monsters.xml (staged), with a few stats */
export async function listMonsters() {
	const index = await readStaged('data/monster/monsters.xml');
	if (!index) return [];
	const pending = new Set((await listFiles()).filter((file) => file.pending).map((file) => file.path));
	const entries = [...index.content.matchAll(/<monster\s+([^>]*?)\/?>/g)].map((match) => {
		const attrs = Object.fromEntries([...match[1].matchAll(/(\w+)="([^"]*)"/g)].map((pair) => [pair[1], pair[2]]));
		return { name: attrs.name ?? '', file: attrs.file ?? '' };
	});
	const monsters = await Promise.all(
		entries
			.filter((entry) => entry.file && !entry.file.includes('..'))
			.map(async (entry) => {
				const path = `data/monster/${entry.file}`;
				const file = await readStaged(path);
				let health = 0, experience = 0, look = '';
				try {
					const root = file ? parseMonster(file.content).root : null;
					if (root) {
						health = Number(attr(child(root, 'health'), 'max') ?? 0);
						experience = Number(attr(root, 'experience') ?? 0);
						const looks = child(root, 'look');
						const typeEx = Number(attr(looks, 'typeex') ?? 0);
						look = typeEx
							? `/item/${typeEx}.png`
							: `/outfit/${['type', 'head', 'body', 'legs', 'feet'].map((key) => Number(attr(looks, key) ?? 0)).join('-')}.png`;
					}
				} catch {
					// listed without stats; the editor shows the error
				}
				return { ...entry, path, health, experience, look, pending: pending.has(path), missing: !file };
			})
	);
	return monsters.sort((a, b) => a.name.localeCompare(b.name));
}
