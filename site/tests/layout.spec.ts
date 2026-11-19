import { expect, test, type Page } from '@playwright/test';

// Every page must fit a phone: no sideways scrolling of the page, and no
// content cut off by a box that hides its overflow (the cards do). Run
// against a site with tests/seed.sql loaded (see "Layout check" in README.md).
//
// A row that is meant to scroll sideways (the highscore skills, for
// example) carries data-scroll-x; anything else that scrolls or sticks out
// is a failure.

type Visitor = 'guest' | 'player' | 'god';

// Sessions made by tests/seed.sql
const SESSIONS: Record<Visitor, string | null> = {
	guest: null,
	player: 'layout-test-player',
	god: 'layout-test-god'
};

const GUILD = '/guilds/Knights%20of%20the%20Eternal%20Twilight';
const CHARACTER = '/characters/Sir%20Bartholomew%20Longname';

const PAGES: Record<Visitor, string[]> = {
	guest: [
		'/',
		'/highscores',
		'/highscores?category=distance&vocation=paladins',
		'/characters',
		CHARACTER,
		'/characters/Grumbold%20Axebeard',
		'/guilds',
		GUILD,
		'/deaths',
		'/houses',
		'/online',
		'/news/9401',
		'/library',
		'/library/creatures',
		'/library/creatures/dragon-lord',
		'/library/creatures/demon',
		'/library/items',
		'/library/items?c=swords',
		'/library/items?q=sword',
		'/library/items/3264',
		'/library/npcs',
		'/library/spells',
		'/library/daily-hunts',
		'/download',
		'/rules',
		'/privacy',
		'/support',
		'/login',
		'/create-account',
		'/lost-account',
		'/reset-password',
		'/verify-email'
	],
	player: [
		'/',
		'/account',
		'/account/characters/new',
		'/account/email',
		'/account/history',
		'/account/password',
		'/account/recovery-key',
		'/account/two-step',
		'/guilds/create',
		GUILD,
		CHARACTER,
		'/news/9401',
		'/highscores'
	],
	god: [
		'/account',
		'/admin',
		'/admin/players',
		'/admin/players?q=a',
		'/admin/players?player=Grumbold%20Axebeard',
		'/admin/bans',
		'/admin/reports',
		'/admin/client-reports',
		'/admin/client-reports/9501',
		'/admin/news',
		'/admin/news?edit=9401',
		'/admin/audit',
		'/admin/staff',
		'/admin/backups',
		'/admin/changes',
		'/admin/config',
		'/admin/files',
		'/admin/files?file=data%2FXML%2Fcommands.xml',
		'/admin/library',
		'/admin/log',
		'/admin/monsters',
		'/admin/monsters?file=data%2Fmonster%2Famazon.xml'
	]
};

const VIEWPORTS = [
	{ width: 393, height: 660 }, // iPhone 15 Pro
	{ width: 360, height: 640 } // small Android phones
];

/** What does not fit, as readable lines; empty when the page fits */
async function layoutProblems(page: Page) {
	return page.evaluate(() => {
		const problems: string[] = [];
		const root = document.documentElement;
		const width = root.clientWidth;
		if (root.scrollWidth > width) problems.push(`the page scrolls sideways: ${root.scrollWidth}px wide on a ${width}px screen`);

		const describe = (el: Element) => {
			const id = el.id ? `#${el.id}` : '';
			const cls = typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/).join('.') : '';
			const text = (el.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 40);
			return `<${el.tagName.toLowerCase()}${id}${cls}>${text ? ` "${text}"` : ''}`;
		};
		const visible = (el: Element) => {
			const box = el.getBoundingClientRect();
			if (box.width <= 1 || box.height <= 1) return false;
			const style = getComputedStyle(el);
			return style.visibility !== 'hidden' && style.display !== 'none';
		};
		// Form fields scroll their own text; rows marked data-scroll-x scroll on purpose
		const skip = (el: Element) =>
			el.matches('input, textarea, select, option, svg *, .visually-hidden, .visually-hidden *') || !!el.closest('[data-scroll-x]');

		const offScreen = (el: Element) => {
			const box = el.getBoundingClientRect();
			return box.width > 1 && (box.right > width + 1 || box.left < -1);
		};

		for (const el of document.body.querySelectorAll('*')) {
			if (skip(el) || !visible(el)) continue;
			const style = getComputedStyle(el);
			const overflowX = style.overflowX;
			// Cut off: a box that hides what does not fit (not an intended ellipsis)
			if ((overflowX === 'hidden' || overflowX === 'clip') && style.textOverflow !== 'ellipsis' && el.scrollWidth > el.clientWidth + 1) {
				problems.push(`cut off: ${describe(el)} shows ${el.clientWidth}px of ${el.scrollWidth}px`);
			}
			// Scrolls sideways without being meant to
			if ((overflowX === 'auto' || overflowX === 'scroll') && el.scrollWidth > el.clientWidth + 1) {
				problems.push(`scrolls sideways: ${describe(el)} is ${el.scrollWidth}px in ${el.clientWidth}px`);
			}
			// Sticks out of the screen; reported for the outermost such element only
			if (offScreen(el) && !(el.parentElement && offScreen(el.parentElement))) {
				const box = el.getBoundingClientRect();
				problems.push(`off screen: ${describe(el)} spans ${Math.round(box.left)}..${Math.round(box.right)}px`);
			}
		}
		return [...new Set(problems)].slice(0, 30);
	});
}

for (const viewport of VIEWPORTS) {
	for (const [visitor, paths] of Object.entries(PAGES) as [Visitor, string[]][]) {
		test.describe(`${viewport.width}px, ${visitor}`, () => {
			test.use({ viewport, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });

			for (const path of paths) {
				test(path, async ({ page, context, baseURL }) => {
					const session = SESSIONS[visitor];
					if (session) await context.addCookies([{ name: 'ew_session', value: session, url: baseURL! }]);
					const response = await page.goto(path, { waitUntil: 'load' });
					expect(response?.status(), `${path} answers`).toBeLessThan(400);
					// Logged-in pages must not bounce to the login page
					if (session) expect(new URL(page.url()).pathname).not.toBe('/login');
					await page.evaluate(() => document.fonts.ready);
					expect(await layoutProblems(page), `${path} fits ${viewport.width}px`).toEqual([]);
				});
			}
		});
	}
}
