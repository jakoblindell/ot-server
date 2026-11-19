# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> 360px, god >> /admin/bans
- Location: tests/layout.spec.ts:159:5

# Error details

```
Error: /admin/bans fits 360px

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 27

- Array []
+ Array [
+   "scrolls sideways: <nav.side> \"OVERVIEW DashboardSERVER ConsoleServer f\" is 1500px in 360px",
+   "off screen: <div.group> \"SERVER ConsoleServer filesMonstersLibrar\" spans 105..762px",
+   "off screen: <a> \"Monsters\" spans 279..361px",
+   "off screen: <a> \"Library\" spans 363..430px",
+   "off screen: <a> \"Pending changes\" spans 432..566px",
+   "off screen: <a> \"Config & rates\" spans 568..682px",
+   "off screen: <a> \"Backups\" spans 684..762px",
+   "off screen: <div.group> \"PLAYERS Players & accountsReports1Client\" spans 766..1201px",
+   "off screen: <a> \"Players & accounts\" spans 766..914px",
+   "off screen: <a> \"Reports1\" spans 916..1010px",
+   "off screen: <span.count.mono> \"1\" spans 979..1000px",
+   "off screen: <a> \"Client reports1\" spans 1012..1145px",
+   "off screen: <span.count.mono> \"1\" spans 1113..1135px",
+   "off screen: <a> \"Bans\" spans 1147..1201px",
+   "off screen: <div.group> \"CONTENT News posts\" spans 1205..1303px",
+   "off screen: <a> \"News posts\" spans 1205..1303px",
+   "off screen: <div.group> \"SYSTEM Audit logStaff & roles\" spans 1307..1492px",
+   "off screen: <a> \"Audit log\" spans 1307..1387px",
+   "off screen: <a> \"Staff & roles\" spans 1389..1492px",
+   "scrolls sideways: <div.scroll> \"AccountCharactersReasonBySinceUntillayou\" is 634px in 326px",
+   "off screen: <table> \"AccountCharactersReasonBySinceUntillayou\" spans 17..651px",
+   "off screen: <thead> \"AccountCharactersReasonBySinceUntil\" spans 17..651px",
+   "off screen: <tr> \"AccountCharactersReasonBySinceUntil\" spans 17..651px",
+   "off screen: <th> \"By\" spans 340..445px",
+   "off screen: <th> \"Since\" spans 445..511px",
+ ]
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e5]:
    - link "Elderwood ADMIN" [ref=e6] [cursor=pointer]:
      - /url: /admin
      - generic [ref=e7]: Elderwood
      - generic [ref=e8]: ADMIN
    - search [ref=e9]:
      - generic [ref=e10]: Search players and accounts
      - searchbox "Search players and accounts" [ref=e11]
    - generic [ref=e12]:
      - link "View site ↗" [ref=e13] [cursor=pointer]:
        - /url: /
      - generic [ref=e14]:
        - generic [ref=e15]: GD
        - text: layoutgod
        - generic [ref=e16]: · God
  - generic [ref=e17]:
    - navigation "Admin" [ref=e18]:
      - link "Dashboard" [ref=e20] [cursor=pointer]:
        - /url: /admin
      - generic [ref=e21]:
        - link "Console" [ref=e22] [cursor=pointer]:
          - /url: /admin/log
        - link "Server files" [ref=e23] [cursor=pointer]:
          - /url: /admin/files
        - link "Monsters" [ref=e24] [cursor=pointer]:
          - /url: /admin/monsters
        - link "Library" [ref=e25] [cursor=pointer]:
          - /url: /admin/library
        - link "Pending changes" [ref=e26] [cursor=pointer]:
          - /url: /admin/changes
        - link "Config & rates" [ref=e27] [cursor=pointer]:
          - /url: /admin/config
        - link "Backups" [ref=e28] [cursor=pointer]:
          - /url: /admin/backups
      - generic [ref=e29]:
        - link "Players & accounts" [ref=e30] [cursor=pointer]:
          - /url: /admin/players
        - link "Reports 1" [ref=e31] [cursor=pointer]:
          - /url: /admin/reports
          - text: Reports
          - generic [ref=e32]: "1"
        - link "Client reports 1" [ref=e33] [cursor=pointer]:
          - /url: /admin/client-reports
          - text: Client reports
          - generic [ref=e34]: "1"
        - link "Bans" [ref=e35] [cursor=pointer]:
          - /url: /admin/bans
      - link "News posts" [ref=e37] [cursor=pointer]:
        - /url: /admin/news
      - generic [ref=e38]:
        - link "Audit log" [ref=e39] [cursor=pointer]:
          - /url: /admin/audit
        - link "Staff & roles" [ref=e40] [cursor=pointer]:
          - /url: /admin/staff
    - main [ref=e41]:
      - generic [ref=e43]:
        - heading "Bans" [level=1] [ref=e44]
        - paragraph [ref=e45]:
          - text: Current bans and namelocks. Punish players from
          - link "Players & accounts" [ref=e46] [cursor=pointer]:
            - /url: /admin/players
          - text: .
      - generic [ref=e47]:
        - generic [ref=e48]:
          - heading "Banned accounts" [level=2] [ref=e49]
          - generic [ref=e50]: "1"
        - table [ref=e52]:
          - rowgroup [ref=e53]:
            - row [ref=e54]:
              - columnheader "Account" [ref=e55]
              - columnheader "Characters" [ref=e56]
              - columnheader "Reason" [ref=e57]
              - columnheader "By" [ref=e58]
              - columnheader "Since" [ref=e59]
              - columnheader "Until" [ref=e60]
              - columnheader [ref=e61]
          - rowgroup [ref=e62]:
            - row [ref=e63]:
              - cell "layoutothers" [ref=e64]
              - cell "Quickshot Hawkeye, Druidess Fernleaf, Grumbold Axebeard, Archmage Vel, Paladin Sarah, Tiny Tim" [ref=e65]
              - cell "Insulting other players repeatedly in the trade channel" [ref=e66]
              - cell "Gamemaster Layout" [ref=e67]
              - cell "19 Nov 2026, 15:39" [ref=e68]
              - cell "26 Nov 2026, 16:39" [ref=e69]
              - cell [ref=e70]:
                - button "Lift" [ref=e72] [cursor=pointer]
      - generic [ref=e73]:
        - generic [ref=e74]:
          - heading "Banned addresses" [level=2] [ref=e75]
          - generic [ref=e76]: "1"
        - table [ref=e78]:
          - rowgroup [ref=e79]:
            - row [ref=e80]:
              - columnheader "Address" [ref=e81]
              - columnheader "Reason" [ref=e82]
              - columnheader "By" [ref=e83]
              - columnheader "Since" [ref=e84]
              - columnheader "Until" [ref=e85]
              - columnheader [ref=e86]
          - rowgroup [ref=e87]:
            - row [ref=e88]:
              - cell [ref=e89]:
                - link "17.113.0.203" [ref=e90] [cursor=pointer]:
                  - /url: /admin/players?q=17.113.0.203
              - cell "Spam" [ref=e91]
              - cell "Gamemaster Layout" [ref=e92]
              - cell "19 Nov 2026, 16:29" [ref=e93]
              - cell "20 Nov 2026, 16:39" [ref=e94]
              - cell [ref=e95]:
                - button "Lift" [ref=e97] [cursor=pointer]
      - generic [ref=e98]:
        - generic [ref=e99]:
          - heading "Namelocks" [level=2] [ref=e100]
          - generic [ref=e101]: "1"
        - table [ref=e103]:
          - rowgroup [ref=e104]:
            - row [ref=e105]:
              - columnheader "Character" [ref=e106]
              - columnheader "Reason" [ref=e107]
              - columnheader "By" [ref=e108]
              - columnheader "Since" [ref=e109]
              - columnheader [ref=e110]
          - rowgroup [ref=e111]:
            - row [ref=e112]:
              - cell [ref=e113]:
                - link "Paladin Sarah" [ref=e114] [cursor=pointer]:
                  - /url: /admin/players?player=Paladin%20Sarah
              - cell "Offensive name" [ref=e115]
              - cell "Gamemaster Layout" [ref=e116]
              - cell "19 Nov 2026, 16:29" [ref=e117]
              - cell [ref=e118]:
                - button "Remove" [ref=e120] [cursor=pointer]
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
      |                                                                             ^ Error: /admin/bans fits 360px
  168 | 				});
  169 | 			}
  170 | 		});
  171 | 	}
  172 | }
  173 | 
```