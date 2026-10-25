// Plain-text news and comments as blocks: paragraphs separated by blank
// lines, "- " lines as lists. Rendered as text, so nothing in it is HTML.
export type Block = { kind: 'paragraph'; text: string } | { kind: 'list'; items: string[] };

export function blocks(body: string): Block[] {
	return body
		.replace(/\r\n/g, '\n')
		.split(/\n\s*\n/)
		.map((chunk) => chunk.trim())
		.filter(Boolean)
		.map((chunk) => {
			const lines = chunk.split('\n');
			if (lines.every((line) => line.trim().startsWith('- '))) {
				return { kind: 'list', items: lines.map((line) => line.trim().slice(2)) };
			}
			return { kind: 'paragraph', text: lines.join(' ') };
		});
}
