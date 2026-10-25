// Names for the game's numbers
const vocations: Record<number, string> = {
	0: 'No vocation',
	1: 'Sorcerer',
	2: 'Druid',
	3: 'Paladin',
	4: 'Knight',
	5: 'Master Sorcerer',
	6: 'Elder Druid',
	7: 'Royal Paladin',
	8: 'Elite Knight'
};

export function vocationName(vocation: number) {
	return vocations[vocation] ?? 'Unknown';
}

export const accountTypes: Record<number, string> = {
	1: 'Player',
	2: 'Tutor',
	3: 'Senior tutor',
	4: 'Gamemaster',
	5: 'God'
};

/** Short vocation tag and its badge colour (the design's) */
export function vocationBadge(vocation: number) {
	const base = vocation > 4 ? vocation - 4 : vocation;
	const promoted = vocation > 4;
	switch (base) {
		case 1:
			return { short: promoted ? 'MS' : 'S', color: '#2b3f6b' };
		case 2:
			return { short: promoted ? 'ED' : 'D', color: '#2f4a2a' };
		case 3:
			return { short: promoted ? 'RP' : 'P', color: '#6b4a1a' };
		case 4:
			return { short: promoted ? 'EK' : 'K', color: '#7a2418' };
		default:
			return { short: 'RK', color: '#6b5636' };
	}
}

/** Towns of the map (data/world792/map.otbm) */
export const towns: Record<number, string> = {
	1: 'Thais',
	2: 'Carlin',
	3: 'Kazordoon',
	4: "Ab'Dendriel",
	5: 'Edron',
	6: 'Darashia',
	7: 'Venore',
	8: 'Ankrahmun',
	9: 'Port Hope',
	10: 'Home',
	11: 'Rookgaard',
	12: 'Liberty Bay'
};

/** Highscore lists: the column ranked by and the one breaking ties */
export const highscoreCategories = [
	{ id: 'experience', label: 'Experience', column: 'level', tie: 'experience' },
	{ id: 'magic', label: 'Magic level', column: 'maglevel', tie: 'manaspent' },
	{ id: 'fist', label: 'Fist fighting', column: 'skill_fist', tie: 'skill_fist_tries' },
	{ id: 'club', label: 'Club fighting', column: 'skill_club', tie: 'skill_club_tries' },
	{ id: 'sword', label: 'Sword fighting', column: 'skill_sword', tie: 'skill_sword_tries' },
	{ id: 'axe', label: 'Axe fighting', column: 'skill_axe', tie: 'skill_axe_tries' },
	{ id: 'distance', label: 'Distance fighting', column: 'skill_dist', tie: 'skill_dist_tries' },
	{ id: 'shielding', label: 'Shielding', column: 'skill_shielding', tie: 'skill_shielding_tries' },
	{ id: 'fishing', label: 'Fishing', column: 'skill_fishing', tie: 'skill_fishing_tries' }
] as const;

/** Vocation filters: the vocation ids each one covers */
export const vocationFilters = [
	{ id: 'all', label: 'All vocations', ids: [] as number[] },
	{ id: 'knights', label: 'Knights', ids: [4, 8] },
	{ id: 'paladins', label: 'Paladins', ids: [3, 7] },
	{ id: 'sorcerers', label: 'Sorcerers', ids: [1, 5] },
	{ id: 'druids', label: 'Druids', ids: [2, 6] },
	{ id: 'none', label: 'No vocation', ids: [0] }
];

/** Characters that show up in public lists: players, not staff */
export const PUBLIC_PLAYER = 'p.group_id = 1 AND p.deletion = 0';
/** Characters ranked in highscores: also not the server's fake players */
export const RANKED_PLAYER = PUBLIC_PLAYER + ' AND p.fake_player = 0';
