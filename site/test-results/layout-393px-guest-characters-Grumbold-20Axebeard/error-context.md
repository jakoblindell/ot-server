# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> 393px, guest >> /characters/Grumbold%20Axebeard
- Location: tests/layout.spec.ts:159:5

# Error details

```
Error: /characters/Grumbold%20Axebeard fits 393px

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
        - link "Log in" [ref=e33] [cursor=pointer]:
          - /url: /login
        - link "Play now" [ref=e34] [cursor=pointer]:
          - /url: /play/
  - main [ref=e36]:
    - generic [ref=e37]:
      - region [ref=e38]:
        - heading "Character information" [level=1] [ref=e40]
        - generic [ref=e43]:
          - paragraph [ref=e44]: Offline
          - heading "Grumbold Axebeard" [level=2] [ref=e46]
          - generic [ref=e47]:
            - term [ref=e48]: Sex
            - definition [ref=e49]: Male
            - term [ref=e50]: Vocation
            - definition [ref=e51]: Knight
            - term [ref=e52]: Level
            - definition [ref=e53]: "85"
            - term [ref=e54]: Residence
            - definition [ref=e55]: Thais
            - term [ref=e56]: Last login
            - definition [ref=e57]: 18 Nov 2026, 15:39
            - term [ref=e58]: Created
            - definition [ref=e59]: 19 Nov 2026, 16:39
            - term [ref=e60]: Account
            - definition [ref=e61]: Free account
            - term [ref=e62]: Guild
            - definition [ref=e63]:
              - text: Leader of
              - link "Rats" [ref=e64] [cursor=pointer]:
                - /url: /guilds/Rats
      - region [ref=e65]:
        - heading "Character deaths" [level=2] [ref=e67]
        - list [ref=e69]:
          - listitem [ref=e70]:
            - generic [ref=e71]: 19 Nov 2026, 14:09
            - generic [ref=e72]:
              - text: Died at level
              - strong [ref=e73]: "84"
              - text: by a demon skeleton.
      - region [ref=e74]:
        - generic [ref=e75]:
          - heading "Achievements" [level=2] [ref=e76]
          - generic [ref=e77]: 0 of 22 · 0 points
        - paragraph [ref=e79]: No achievements yet.
    - complementary [ref=e80]:
      - region [ref=e81]:
        - heading "Skills" [level=2] [ref=e83]
        - generic [ref=e85]:
          - term [ref=e86]: Magic level
          - definition [ref=e87]: "6"
          - term [ref=e88]: Fist fighting
          - definition [ref=e89]: "20"
          - term [ref=e90]: Club fighting
          - definition [ref=e91]: "40"
          - term [ref=e92]: Sword fighting
          - definition [ref=e93]: "30"
          - term [ref=e94]: Axe fighting
          - definition [ref=e95]: "92"
          - term [ref=e96]: Distance fighting
          - definition [ref=e97]: "25"
          - term [ref=e98]: Shielding
          - definition [ref=e99]: "88"
          - term [ref=e100]: Fishing
          - definition [ref=e101]: "10"
      - search [ref=e102]:
        - heading "Characters" [level=1] [ref=e104]
        - generic [ref=e105]:
          - generic [ref=e106]:
            - text: Character name
            - textbox "Character name" [ref=e107]
          - button "Search" [ref=e108] [cursor=pointer]
  - contentinfo [ref=e109]:
    - generic [ref=e110]:
      - generic [ref=e111]: Elderwood · A fan-run server, not affiliated with CipSoft.
      - navigation "Footer" [ref=e112]:
        - link "Rules" [ref=e113] [cursor=pointer]:
          - /url: /rules
        - link "Houses" [ref=e114] [cursor=pointer]:
          - /url: /houses
        - link "Latest deaths" [ref=e115] [cursor=pointer]:
          - /url: /deaths
        - link "Support" [ref=e116] [cursor=pointer]:
          - /url: /support
        - link "Privacy" [ref=e117] [cursor=pointer]:
          - /url: /privacy
      - generic [ref=e118]:
        - generic [ref=e119]: Colours
        - combobox "Colours" [ref=e120]:
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
      |                                                                             ^ Error: /characters/Grumbold%20Axebeard fits 393px
  168 | 				});
  169 | 			}
  170 | 		});
  171 | 	}
  172 | }
  173 | 
```