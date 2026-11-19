# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> 393px, player >> /news/9401
- Location: tests/layout.spec.ts:159:5

# Error details

```
Error: /news/9401 fits 393px

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "cut off: <article.card.s-dv9Ti_kA1S_p> \"Patch notes: rotworms behave, the post o\" shows 361px of 614px",
+   "cut off: <section#comments.card.s-dv9Ti_kA1S_p> \"Comments2 Sir Bartholomew Longname Level\" shows 361px of 632px",
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
    - navigation "Breadcrumbs" [ref=e37]:
      - link "News" [ref=e38] [cursor=pointer]:
        - /url: /
      - text: › 19 Nov 2026
    - article [ref=e39]:
      - 'heading "Patch notes: rotworms behave, the post office opens, and a much longer headline" [level=1] [ref=e41]'
      - generic [ref=e42]:
        - paragraph [ref=e43]: 19 Nov 2026
        - paragraph [ref=e44]: Rotworms no longer walk through walls.
        - list [ref=e45]:
          - listitem [ref=e46]: The post office in Thais is open
          - listitem [ref=e47]: Letters cost 8 gold
        - paragraph [ref=e48]: See https://example.com/a/very/long/link/that/should/wrap/instead/of/overflowing/the/page for details.
        - paragraph [ref=e49]: — Gamemaster Layout
    - region [ref=e50]:
      - generic [ref=e51]:
        - heading "Comments" [level=2] [ref=e52]
        - generic [ref=e53]: "2"
      - generic [ref=e54]:
        - list [ref=e55]:
          - listitem [ref=e56]:
            - generic [ref=e57]:
              - link "Sir Bartholomew Longname" [ref=e58] [cursor=pointer]:
                - /url: /characters/Sir%20Bartholomew%20Longname
              - generic [ref=e59]: Level 187 · Elite Knight
              - generic [ref=e60]: 19 Nov, 16:39
            - paragraph [ref=e61]: Finally! Thanks for the fix.
            - button "Report" [ref=e63] [cursor=pointer]
          - listitem [ref=e64]:
            - generic [ref=e65]:
              - link "Elara Moonwhisper" [ref=e66] [cursor=pointer]:
                - /url: /characters/Elara%20Moonwhisper
              - generic [ref=e67]: Level 132 · Master Sorcerer
              - generic [ref=e68]: 19 Nov, 16:39
            - paragraph [ref=e69]: Averyveryveryverylongwordwithoutanyspacesthatshouldstillwrapinsidethecommentbox.
            - button "Report" [ref=e71] [cursor=pointer]
        - generic [ref=e72]:
          - generic [ref=e73]:
            - text: Post as
            - combobox "Post as" [ref=e74]:
              - option "Sir Bartholomew Longname" [selected]
              - option "Elara Moonwhisper"
          - generic [ref=e75]:
            - text: Comment
            - textbox "Comment" [ref=e76]
          - button "Post comment" [ref=e78] [cursor=pointer]
    - navigation "More news" [ref=e79]:
      - link "‹ Older" [ref=e80] [cursor=pointer]:
        - /url: /news/1
  - contentinfo [ref=e81]:
    - generic [ref=e82]:
      - generic [ref=e83]: Elderwood · A fan-run server, not affiliated with CipSoft.
      - navigation "Footer" [ref=e84]:
        - link "Rules" [ref=e85] [cursor=pointer]:
          - /url: /rules
        - link "Houses" [ref=e86] [cursor=pointer]:
          - /url: /houses
        - link "Latest deaths" [ref=e87] [cursor=pointer]:
          - /url: /deaths
        - link "Support" [ref=e88] [cursor=pointer]:
          - /url: /support
        - link "Privacy" [ref=e89] [cursor=pointer]:
          - /url: /privacy
      - generic [ref=e90]:
        - generic [ref=e91]: Colours
        - combobox "Colours" [ref=e92]:
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
      |                                                                             ^ Error: /news/9401 fits 393px
  168 | 				});
  169 | 			}
  170 | 		});
  171 | 	}
  172 | }
  173 | 
```