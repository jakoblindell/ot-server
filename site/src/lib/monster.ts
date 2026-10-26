// A monster file as an editable tree (see $lib/server/monsters.ts)
export type MonsterNode = {
	tag: string; // '#comment' for a comment
	attrs: [string, string][];
	children: MonsterNode[];
	text?: string; // comment text
};
export type MonsterDoc = {
	// the text before <monster> (declaration, comments) and after </monster>,
	// kept as written
	prefix: string;
	suffix: string;
	// what the file puts between an element and a comment on its line
	commentGap: string;
	root: MonsterNode;
};
