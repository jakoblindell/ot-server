# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> 360px, player >> /
- Location: tests/layout.spec.ts:159:5

# Error details

```
Error: / fits 360px

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "cut off: <article.card.s-CiK0hBYVfN6Z> \"Patch notes: rotworms behave, the post o\" shows 328px of 614px",
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
  - generic [ref=e35]:
    - generic [ref=e36]:
      - generic [ref=e38]:
        - generic [ref=e39]: Protocol 7.92 · Classic experience · No bots tolerated
        - heading "The old world, as you remember it." [level=1] [ref=e40]: The old world,as you remember it.
        - paragraph [ref=e41]: Rookgaard at dawn, a backpack full of worms, and a long walk to Thais. Our classic rules keep the server slow, social and fair.
        - generic [ref=e42]:
          - link "Play now" [ref=e43] [cursor=pointer]:
            - /url: /play/
          - link "My account" [ref=e44] [cursor=pointer]:
            - /url: /account
      - generic [ref=e46]:
        - generic [ref=e47]:
          - generic [ref=e48]: Server
          - generic [ref=e49]: Offline
        - generic [ref=e51]:
          - generic [ref=e52]: Players online
          - generic [ref=e53]:
            - text: "0"
            - generic [ref=e54]: / record 0
        - generic [ref=e55]:
          - generic [ref=e56]: Uptime
          - generic [ref=e57]: –
        - generic [ref=e58]:
          - generic [ref=e59]: Next server save
          - generic [ref=e60]:
            - text: 08:00
            - generic [ref=e61]: CET
        - generic [ref=e62]:
          - generic [ref=e63]: Client
          - generic [ref=e64]: "7.92"
    - main [ref=e65]:
      - generic [ref=e66]:
        - region [ref=e67]:
          - heading "News ticker" [level=2] [ref=e69]
          - list [ref=e70]:
            - listitem [ref=e71]:
              - generic [ref=e72]: 19 Nov
              - generic [ref=e73]: Server save at 08:00 every morning.
        - article [ref=e74]:
          - generic [ref=e75]:
            - heading [level=2] [ref=e76]:
              - 'link "Patch notes: rotworms behave, the post office opens, and a much longer headline" [ref=e77] [cursor=pointer]':
                - /url: /news/9401
            - generic [ref=e78]: 19 Nov 2026
          - generic [ref=e79]:
            - paragraph [ref=e80]: Rotworms no longer walk through walls.
            - list [ref=e81]:
              - listitem [ref=e82]: The post office in Thais is open
              - listitem [ref=e83]: Letters cost 8 gold
            - paragraph [ref=e84]: See https://example.com/a/very/long/link/that/should/wrap/instead/of/overflowing/the/page for details.
            - paragraph [ref=e85]: — Gamemaster Layout
            - paragraph [ref=e86]:
              - link "2 comments ›" [ref=e87] [cursor=pointer]:
                - /url: /news/9401#comments
        - article [ref=e88]:
          - generic [ref=e89]:
            - heading [level=2] [ref=e90]:
              - link "The gates of Elderwood open" [ref=e91] [cursor=pointer]:
                - /url: /news/1
            - generic [ref=e92]: 19 Nov 2026
          - generic [ref=e93]:
            - paragraph [ref=e94]: "Elderwood is a classic Tibia 7.92 world. Everyone starts on Rookgaard: no shop, no shortcuts, just the world as it was."
            - paragraph [ref=e95]: Create your account ahead of time to reserve your character name, then press Play now. The game runs in your browser, on a computer or a phone.
            - list [ref=e96]:
              - listitem [ref=e97]: Play in the browser, or install it as an app
              - listitem [ref=e98]: One free premium day a day while we test
              - listitem [ref=e99]: Report bugs to a gamemaster
            - paragraph [ref=e100]: — The Elderwood team
            - paragraph [ref=e101]:
              - link "Comment on this news ›" [ref=e102] [cursor=pointer]:
                - /url: /news/1#comments
      - complementary [ref=e103]:
        - region [ref=e104]:
          - generic [ref=e105]:
            - heading "Top players" [level=2] [ref=e106]
            - link "All" [ref=e107] [cursor=pointer]:
              - /url: /highscores
          - list [ref=e108]:
            - listitem [ref=e109]:
              - generic [ref=e110]: "1"
              - generic [ref=e111]: EK
              - link "Sir Bartholomew Longname" [ref=e112] [cursor=pointer]:
                - /url: /characters/Sir%20Bartholomew%20Longname
              - generic [ref=e113]: "187"
            - listitem [ref=e114]:
              - generic [ref=e115]: "2"
              - generic [ref=e116]: MS
              - link "Elara Moonwhisper" [ref=e117] [cursor=pointer]:
                - /url: /characters/Elara%20Moonwhisper
              - generic [ref=e118]: "132"
            - listitem [ref=e119]:
              - generic [ref=e120]: "3"
              - generic [ref=e121]: RP
              - link "Quickshot Hawkeye" [ref=e122] [cursor=pointer]:
                - /url: /characters/Quickshot%20Hawkeye
              - generic [ref=e123]: "104"
            - listitem [ref=e124]:
              - generic [ref=e125]: "4"
              - generic [ref=e126]: D
              - link "Druidess Fernleaf" [ref=e127] [cursor=pointer]:
                - /url: /characters/Druidess%20Fernleaf
              - generic [ref=e128]: "98"
            - listitem [ref=e129]:
              - generic [ref=e130]: "5"
              - generic [ref=e131]: K
              - link "Grumbold Axebeard" [ref=e132] [cursor=pointer]:
                - /url: /characters/Grumbold%20Axebeard
              - generic [ref=e133]: "85"
        - region [ref=e134]:
          - heading "Server rates" [level=2] [ref=e136]
          - generic [ref=e138]:
            - term [ref=e139]: Experience
            - definition [ref=e140]: stages
            - term [ref=e141]: Skills
            - definition [ref=e142]: –
            - term [ref=e143]: Magic level
            - definition [ref=e144]: –
            - term [ref=e145]: Loot
            - definition [ref=e146]: –
  - contentinfo [ref=e147]:
    - generic [ref=e148]:
      - generic [ref=e149]: Elderwood · A fan-run server, not affiliated with CipSoft.
      - navigation "Footer" [ref=e150]:
        - link "Rules" [ref=e151] [cursor=pointer]:
          - /url: /rules
        - link "Houses" [ref=e152] [cursor=pointer]:
          - /url: /houses
        - link "Latest deaths" [ref=e153] [cursor=pointer]:
          - /url: /deaths
        - link "Support" [ref=e154] [cursor=pointer]:
          - /url: /support
        - link "Privacy" [ref=e155] [cursor=pointer]:
          - /url: /privacy
      - generic [ref=e156]:
        - generic [ref=e157]: Colours
        - combobox "Colours" [ref=e158]:
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
      |                                                                             ^ Error: / fits 360px
  168 | 				});
  169 | 			}
  170 | 		});
  171 | 	}
  172 | }
  173 | 
```