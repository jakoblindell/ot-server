// The server rules (from the design's Rules board). Later editable by staff.
export const rulesUpdated = '2026-10-25';

export const ruleSections = [
	{
		id: 'names',
		title: 'Names',
		rules: [
			'No insulting, racist, sexual or otherwise offensive names.',
			'No names of real people, staff members or that pretend to be staff.',
			'No names that advertise other servers or websites.'
		]
	},
	{
		id: 'statements',
		title: 'Statements',
		rules: [
			'No insults, threats or harassment towards other players or staff.',
			'No spamming in public channels.',
			'No advertising of other servers, sites or trading of game items for real money.'
		]
	},
	{
		id: 'cheating',
		title: 'Cheating',
		rules: [
			'No bots, macros, modified clients or any software that plays for you.',
			'Report bugs to staff. Using a bug for your own gain is exploiting.',
			'One character may be online per person at the same time.'
		]
	},
	{
		id: 'accounts',
		title: 'Accounts',
		rules: [
			'You are responsible for everything that happens on your account.',
			'Account trading and sharing is not allowed.',
			'Staff will never ask for your password.'
		]
	},
	{
		id: 'staff',
		title: 'Staff',
		rules: [
			'Follow instructions from gamemasters.',
			'Pretending to be staff is not allowed.',
			'Complaints about staff go to the server owner.'
		]
	}
];

export const punishments = [
	{ offence: 'Offensive name', first: 'Forced rename', repeated: 'Deletion' },
	{ offence: 'Offensive statement', first: 'Notation / 24h mute', repeated: '7 day ban' },
	{ offence: 'Bug exploiting', first: '7 day ban', repeated: 'Deletion' },
	{ offence: 'Botting or cheat tools', first: 'Deletion', repeated: '–' }
];
