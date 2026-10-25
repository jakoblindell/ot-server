// Colour schemes. Every colour on the site comes from one of these tokens
// (CSS variables --<token>), so a scheme changes the whole look, not only the
// accent. Players switch schemes in the footer (remembered in a cookie);
// staff choose the default.

export type ThemeTokens = {
	/** Page background, header, footer */
	bg: string;
	surface: string;
	footer: string;
	border: string;
	borderStrong: string;
	/** Text on the dark page */
	text: string;
	textBright: string;
	textSoft: string;
	textMuted: string;
	/** Parchment cards */
	paper: string;
	paperText: string;
	paperMuted: string;
	paperRule: string;
	inputBg: string;
	inputBorder: string;
	/** Card headers */
	head: string;
	headEdge: string;
	headText: string;
	/** Buttons, highlights */
	accent: string;
	accentText: string;
	accentLight: string;
	accentDark: string;
	accentBorder: string;
	/** Links on parchment, warnings */
	danger: string;
	dangerDark: string;
	/** Hero sky (its illustration keeps its own colours) */
	sky: string;
	heroText: string;
	heroSoft: string;
	/** "Online" badges */
	online: string;
	onlineText: string;
	onlineBg: string;
	onlineBorder: string;
};

export type Theme = { id: string; name: string; description: string; tokens: ThemeTokens };

const gold: ThemeTokens = {
	bg: '#15110c',
	surface: '#1d1710',
	footer: '#110d09',
	border: '#3a2e1f',
	borderStrong: '#4a3b27',
	text: '#efe2c4',
	textBright: '#f6ecd4',
	textSoft: '#cdbd9a',
	textMuted: '#b8a888',
	paper: '#efe2c4',
	paperText: '#2a1f14',
	paperMuted: '#6b5636',
	paperRule: '#c9b48a',
	inputBg: '#fbf4e2',
	inputBorder: '#8a7350',
	head: '#2f4a2a',
	headEdge: '#1e3019',
	headText: '#f6ecd4',
	accent: '#e0b04a',
	accentText: '#1d1408',
	accentLight: '#f6d58a',
	accentDark: '#5a3f15',
	accentBorder: '#9a7426',
	danger: '#7a2418',
	dangerDark: '#4f150d',
	sky: '#1b2140',
	heroText: '#f6ecd4',
	heroSoft: '#e3d4b2',
	online: '#8fcf4f',
	onlineText: '#b9d98a',
	onlineBg: '#1f2a17',
	onlineBorder: '#3c5329'
};

export const themes: Theme[] = [
	{ id: 'gold', name: 'Gold', description: 'Parchment, forest green and gold (the design)', tokens: gold },
	{
		id: 'ember',
		name: 'Ember',
		description: 'Oxblood headers and a copper accent',
		tokens: {
			...gold,
			bg: '#140f0c',
			surface: '#1e1611',
			footer: '#100b08',
			border: '#3b2a1f',
			borderStrong: '#4d3626',
			head: '#5a2418',
			headEdge: '#3d170f',
			accent: '#d98a3a',
			accentLight: '#f2b877',
			accentDark: '#5a2c10',
			accentBorder: '#9a5a22',
			sky: '#2a1622'
		}
	},
	{
		id: 'bone',
		name: 'Bone',
		description: 'Cool slate and bone white',
		tokens: {
			...gold,
			bg: '#111214',
			surface: '#191b1e',
			footer: '#0d0e10',
			border: '#2c2f34',
			borderStrong: '#3a3e44',
			text: '#e6e2d6',
			textBright: '#f4f1e8',
			textSoft: '#c4bfb0',
			textMuted: '#a39e90',
			paper: '#e9e4d6',
			paperText: '#23211c',
			paperMuted: '#5f5a4c',
			paperRule: '#c4bca6',
			inputBg: '#f7f4ec',
			inputBorder: '#7d7867',
			head: '#3a4048',
			headEdge: '#262a30',
			headText: '#f4f1e8',
			accent: '#c9c2a8',
			accentText: '#1a1915',
			accentLight: '#ece6d0',
			accentDark: '#4a463a',
			accentBorder: '#8f8a76',
			danger: '#8a2c22',
			sky: '#1a2030'
		}
	},
	{
		id: 'moss',
		name: 'Moss',
		description: 'Deep forest with a bright moss accent',
		tokens: {
			...gold,
			bg: '#10140e',
			surface: '#171d13',
			footer: '#0c0f0a',
			border: '#2c3624',
			borderStrong: '#3a4730',
			textMuted: '#a9ad8f',
			textSoft: '#c6c8a6',
			head: '#3b2e1e',
			headEdge: '#271e13',
			accent: '#8fcf4f',
			accentText: '#0f1a07',
			accentLight: '#c4ec95',
			accentDark: '#24400f',
			accentBorder: '#5e9431',
			sky: '#142218'
		}
	},
	{
		id: 'frost',
		name: 'Frost',
		description: 'Night blue with an ice accent',
		tokens: {
			...gold,
			bg: '#0e1118',
			surface: '#151a24',
			footer: '#0a0d13',
			border: '#262d3c',
			borderStrong: '#333c50',
			text: '#e2e6ef',
			textBright: '#f2f5fa',
			textSoft: '#c0c8d6',
			textMuted: '#9aa3b2',
			paper: '#e7ebf2',
			paperText: '#1a2030',
			paperMuted: '#4a5670',
			paperRule: '#b9c3d4',
			inputBg: '#f7f9fc',
			inputBorder: '#6f7d99',
			head: '#2b3f6b',
			headEdge: '#1b2a4b',
			headText: '#f2f5fa',
			accent: '#8ab4ff',
			accentText: '#0b1630',
			accentLight: '#c3d8ff',
			accentDark: '#1d2f5a',
			accentBorder: '#5577b5',
			danger: '#9a2b2b',
			dangerDark: '#6b1d1d',
			sky: '#10182e'
		}
	},
	{
		id: 'scroll',
		name: 'Scroll',
		description: 'Light: the whole page as parchment',
		tokens: {
			...gold,
			bg: '#e6d8b8',
			surface: '#d6c49c',
			footer: '#cbb78c',
			border: '#b59f74',
			borderStrong: '#9c865b',
			text: '#2a1f14',
			textBright: '#1d1408',
			textSoft: '#4a3b27',
			textMuted: '#6b5636',
			paper: '#f7efdc',
			paperRule: '#d3c09a',
			accent: '#c9952f',
			accentDark: '#6b4a12',
			online: '#4f8a1f',
			onlineText: '#2f5a16',
			onlineBg: '#dfe8c8',
			onlineBorder: '#9bb87a'
		}
	}
];

export const themeIds = themes.map((theme) => theme.id);

export function findTheme(id: string | undefined | null): Theme | undefined {
	return themes.find((theme) => theme.id === id);
}

function cssName(token: string) {
	return '--' + token.replace(/[A-Z]/g, (letter) => '-' + letter.toLowerCase());
}

/** CSS for every scheme: :root[data-theme="id"] { --token: value; ... } */
export function themeCss(): string {
	return themes
		.map(
			(theme) =>
				`:root[data-theme="${theme.id}"]{` +
				Object.entries(theme.tokens)
					.map(([token, value]) => `${cssName(token)}:${value}`)
					.join(';') +
				'}'
		)
		.join('\n');
}

/** Cookie with the player's chosen scheme */
export const THEME_COOKIE = 'ew_theme';
