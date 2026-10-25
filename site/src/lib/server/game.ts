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
