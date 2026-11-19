# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> 393px, player >> /characters/Sir%20Bartholomew%20Longname
- Location: tests/layout.spec.ts:159:5

# Error details

```
Error: /characters/Sir%20Bartholomew%20Longname fits 393px

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "cut off: <div.figure.s-R-vs-u5WVVzu> shows 124px of 128px",
+ ]
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - link "Elderwood Classic 7.92 world" [ref=e6] [cursor=pointer]:
        - /url: /
        - generic [ref=e18]:
          - generic [ref=e19]: Elderwood
          - generic [ref=e20]: Classic 7.92 world
      - navigation "Main" [ref=e21]:
        - link "News" [ref=e22] [cursor=pointer]:
          - /url: /
        - link "Highscores" [ref=e23] [cursor=pointer]:
          - /url: /highscores
        - link "Characters" [ref=e24] [cursor=pointer]:
          - /url: /characters
        - link "Library" [ref=e25] [cursor=pointer]:
          - /url: /library
        - link "Guilds" [ref=e26] [cursor=pointer]:
          - /url: /guilds
        - link "Online" [ref=e27] [cursor=pointer]:
          - /url: /online
        - link "Play" [ref=e28] [cursor=pointer]:
          - /url: /download
        - link "Support" [ref=e29] [cursor=pointer]:
          - /url: /support
      - generic [ref=e30]:
        - link "Offline" [ref=e31] [cursor=pointer]:
          - /url: /online
        - link "My account" [ref=e33] [cursor=pointer]:
          - /url: /account
        - link "Play now" [ref=e34] [cursor=pointer]:
          - /url: /play/
  - main [ref=e36]:
    - generic [ref=e37]:
      - region [ref=e38]:
        - heading "Character information" [level=1] [ref=e40]
        - generic [ref=e43]:
          - paragraph [ref=e44]: Online now
          - heading "Sir Bartholomew Longname" [level=2] [ref=e46]
          - paragraph [ref=e47]: “Knight of the old order. Looking for a guild that hunts on weekends; send a letter to the depot in Thais.”
          - generic [ref=e48]:
            - term [ref=e49]: Sex
            - definition [ref=e50]: Male
            - term [ref=e51]: Vocation
            - definition [ref=e52]: Elite Knight
            - term [ref=e53]: Level
            - definition [ref=e54]: "187"
            - term [ref=e55]: Residence
            - definition [ref=e56]: Thais
            - term [ref=e57]: Last login
            - definition [ref=e58]: 19 Nov 2026, 15:39
            - term [ref=e59]: Created
            - definition [ref=e60]: 10 Oct 2026, 16:39
            - term [ref=e61]: Account
            - definition [ref=e62]: Premium account
            - term [ref=e63]: Guild
            - definition [ref=e64]:
              - text: Grand Commander of
              - link "Knights of the Eternal Twilight" [ref=e65] [cursor=pointer]:
                - /url: /guilds/Knights%20of%20the%20Eternal%20Twilight
              - text: (The Unbreakable)
      - region [ref=e66]:
        - heading "Character deaths" [level=2] [ref=e68]
        - list [ref=e70]:
          - listitem [ref=e71]:
            - generic [ref=e72]: 19 Nov 2026, 15:39
            - generic [ref=e73]:
              - text: Died at level
              - strong [ref=e74]: "186"
              - text: by a dragon lord and
              - link "Quickshot Hawkeye" [ref=e75] [cursor=pointer]:
                - /url: /characters/Quickshot%20Hawkeye
              - text: .
      - region [ref=e76]:
        - generic [ref=e77]:
          - heading "Achievements" [level=2] [ref=e78]
          - generic [ref=e79]: 0 of 22 · 0 points
        - paragraph [ref=e81]: No achievements yet.
      - region [ref=e82]:
        - heading "Other characters" [level=2] [ref=e84]
        - list [ref=e86]:
          - listitem [ref=e87]:
            - generic [ref=e88]: MS
            - link "Elara Moonwhisper" [ref=e89] [cursor=pointer]:
              - /url: /characters/Elara%20Moonwhisper
            - generic [ref=e90]: Lv 132
    - complementary [ref=e91]:
      - region [ref=e92]:
        - heading "Skills" [level=2] [ref=e94]
        - generic [ref=e96]:
          - term [ref=e97]: Magic level
          - definition [ref=e98]: "11"
          - term [ref=e99]: Fist fighting
          - definition [ref=e100]: "12"
          - term [ref=e101]: Club fighting
          - definition [ref=e102]: "30"
          - term [ref=e103]: Sword fighting
          - definition [ref=e104]: "102"
          - term [ref=e105]: Axe fighting
          - definition [ref=e106]: "95"
          - term [ref=e107]: Distance fighting
          - definition [ref=e108]: "40"
          - term [ref=e109]: Shielding
          - definition [ref=e110]: "98"
          - term [ref=e111]: Fishing
          - definition [ref=e112]: "20"
      - search [ref=e113]:
        - heading "Characters" [level=1] [ref=e115]
        - generic [ref=e116]:
          - generic [ref=e117]:
            - text: Character name
            - textbox "Character name" [ref=e118]
          - button "Search" [ref=e119] [cursor=pointer]
      - generic [ref=e120]:
        - heading "Report" [level=2] [ref=e122]
        - button "Report Sir Bartholomew Longname" [ref=e124] [cursor=pointer]
  - contentinfo [ref=e125]:
    - generic [ref=e126]:
      - generic [ref=e127]: Elderwood · A fan-run server, not affiliated with CipSoft.
      - navigation "Footer" [ref=e128]:
        - link "Rules" [ref=e129] [cursor=pointer]:
          - /url: /rules
        - link "Houses" [ref=e130] [cursor=pointer]:
          - /url: /houses
        - link "Latest deaths" [ref=e131] [cursor=pointer]:
          - /url: /deaths
        - link "Support" [ref=e132] [cursor=pointer]:
          - /url: /support
        - link "Privacy" [ref=e133] [cursor=pointer]:
          - /url: /privacy
      - generic [ref=e134]:
        - generic [ref=e135]: Colours
        - combobox "Colours" [ref=e136]:
          - option "Gold" [selected]
          - option "Ember"
          - option "Bone"
          - option "Moss"
          - option "Frost"
          - option "Scroll"
```

# Test source

```ts
  67  | 		'/guilds/create',
  68  | 		GUILD,
  69  | 		CHARACTER,
  70  | 		'/news/9401',
  71  | 		'/highscores'
  72  | 	],
  73  | 	god: [
  74  | 		'/account',
  75  | 		'/admin',
  76  | 		'/admin/players',
  77  | 		'/admin/players?q=a',
  78  | 		'/admin/players?player=Grumbold%20Axebeard',
  79  | 		'/admin/bans',
  80  | 		'/admin/reports',
  81  | 		'/admin/client-reports',
  82  | 		'/admin/client-reports/9501',
  83  | 		'/admin/news',
  84  | 		'/admin/news?edit=9401',
  85  | 		'/admin/audit',
  86  | 		'/admin/staff',
  87  | 		'/admin/backups',
  88  | 		'/admin/changes',
  89  | 		'/admin/config',
  90  | 		'/admin/files',
  91  | 		'/admin/files?file=data%2FXML%2Fcommands.xml',
  92  | 		'/admin/library',
  93  | 		'/admin/log',
  94  | 		'/admin/monsters',
  95  | 		'/admin/monsters?file=data%2Fmonster%2Famazon.xml'
  96  | 	]
  97  | };
  98  | 
  99  | const VIEWPORTS = [
  100 | 	{ width: 393, height: 660 }, // iPhone 15 Pro
  101 | 	{ width: 360, height: 640 } // small Android phones
  102 | ];
  103 | 
  104 | /** What does not fit, as readable lines; empty when the page fits */
  105 | async function layoutProblems(page: Page) {
  106 | 	return page.evaluate(() => {
  107 | 		const problems: string[] = [];
  108 | 		const root = document.documentElement;
  109 | 		const width = root.clientWidth;
  110 | 		if (root.scrollWidth > width) problems.push(`the page scrolls sideways: ${root.scrollWidth}px wide on a ${width}px screen`);
  111 | 
  112 | 		const describe = (el: Element) => {
  113 | 			const id = el.id ? `#${el.id}` : '';
  114 | 			const cls = typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/).join('.') : '';
  115 | 			const text = (el.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 40);
  116 | 			return `<${el.tagName.toLowerCase()}${id}${cls}>${text ? ` "${text}"` : ''}`;
  117 | 		};
  118 | 		const visible = (el: Element) => {
  119 | 			const box = el.getBoundingClientRect();
  120 | 			if (box.width <= 1 || box.height <= 1) return false;
  121 | 			const style = getComputedStyle(el);
  122 | 			return style.visibility !== 'hidden' && style.display !== 'none';
  123 | 		};
  124 | 		// Form fields scroll their own text; rows marked data-scroll-x scroll on purpose
  125 | 		const skip = (el: Element) =>
  126 | 			el.matches('input, textarea, select, option, svg *, .visually-hidden, .visually-hidden *') || !!el.closest('[data-scroll-x]');
  127 | 
  128 | 		for (const el of document.body.querySelectorAll('*')) {
  129 | 			if (skip(el) || !visible(el)) continue;
  130 | 			const style = getComputedStyle(el);
  131 | 			const overflowX = style.overflowX;
  132 | 			// Cut off: a box that hides what does not fit (not an intended ellipsis)
  133 | 			if ((overflowX === 'hidden' || overflowX === 'clip') && style.textOverflow !== 'ellipsis' && el.scrollWidth > el.clientWidth + 1) {
  134 | 				problems.push(`cut off: ${describe(el)} shows ${el.clientWidth}px of ${el.scrollWidth}px`);
  135 | 			}
  136 | 			// Scrolls sideways without being meant to
  137 | 			if ((overflowX === 'auto' || overflowX === 'scroll') && el.scrollWidth > el.clientWidth + 1) {
  138 | 				problems.push(`scrolls sideways: ${describe(el)} is ${el.scrollWidth}px in ${el.clientWidth}px`);
  139 | 			}
  140 | 			// Sticks out of the screen (fixed and absolutely placed things included)
  141 | 			const box = el.getBoundingClientRect();
  142 | 			if (box.right > width + 1 || box.left < -1) {
  143 | 				if (style.position !== 'fixed' || box.left < width) {
  144 | 					problems.push(`off screen: ${describe(el)} spans ${Math.round(box.left)}..${Math.round(box.right)}px`);
  145 | 				}
  146 | 			}
  147 | 		}
  148 | 		// One line per element: the innermost causes are enough
  149 | 		return [...new Set(problems)].slice(0, 25);
  150 | 	});
  151 | }
  152 | 
  153 | for (const viewport of VIEWPORTS) {
  154 | 	for (const [visitor, paths] of Object.entries(PAGES) as [Visitor, string[]][]) {
  155 | 		test.describe(`${viewport.width}px, ${visitor}`, () => {
  156 | 			test.use({ viewport, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  157 | 
  158 | 			for (const path of paths) {
  159 | 				test(path, async ({ page, context, baseURL }) => {
  160 | 					const session = SESSIONS[visitor];
  161 | 					if (session) await context.addCookies([{ name: 'ew_session', value: session, url: baseURL! }]);
  162 | 					const response = await page.goto(path, { waitUntil: 'load' });
  163 | 					expect(response?.status(), `${path} answers`).toBeLessThan(400);
  164 | 					// Logged-in pages must not bounce to the login page
  165 | 					if (session) expect(new URL(page.url()).pathname).not.toBe('/login');
  166 | 					await page.evaluate(() => document.fonts.ready);
> 167 | 					expect(await layoutProblems(page), `${path} fits ${viewport.width}px`).toEqual([]);
      |                                                                             ^ Error: /characters/Sir%20Bartholomew%20Longname fits 393px
  168 | 				});
  169 | 			}
  170 | 		});
  171 | 	}
  172 | }
  173 | 
```