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
