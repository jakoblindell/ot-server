# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> 393px, god >> /admin/players?q=a
- Location: tests/layout.spec.ts:159:5

# Error details

```
Error: /admin/players?q=a fits 393px

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 27

- Array []
+ Array [
+   "scrolls sideways: <nav.side> \"OVERVIEW DashboardSERVER ConsoleServer f\" is 1503px in 393px",
+   "off screen: <div.group> \"SERVER ConsoleServer filesMonstersLibrar\" spans 105..762px",
+   "off screen: <a> \"Library\" spans 363..430px",
+   "off screen: <a> \"Pending changes\" spans 432..566px",
+   "off screen: <a> \"Config & rates\" spans 568..682px",
+   "off screen: <a> \"Backups\" spans 684..762px",
+   "off screen: <div.group> \"PLAYERS Players & accountsReports1Client\" spans 766..1205px",
+   "off screen: <a> \"Players & accounts\" spans 766..918px",
+   "off screen: <a> \"Reports1\" spans 920..1014px",
+   "off screen: <span.count.mono> \"1\" spans 983..1004px",
+   "off screen: <a> \"Client reports1\" spans 1016..1149px",
+   "off screen: <span.count.mono> \"1\" spans 1118..1139px",
+   "off screen: <a> \"Bans\" spans 1151..1205px",
+   "off screen: <div.group> \"CONTENT News posts\" spans 1209..1307px",
+   "off screen: <a> \"News posts\" spans 1209..1307px",
+   "off screen: <div.group> \"SYSTEM Audit logStaff & roles\" spans 1311..1495px",
+   "off screen: <a> \"Audit log\" spans 1311..1390px",
+   "off screen: <a> \"Staff & roles\" spans 1392..1495px",
+   "scrolls sideways: <div.scroll.s-JohPItu-qYKA> \"CharacterAccountLevelLast IPStatusEK Sir\" is 449px in 359px",
+   "off screen: <table.s-JohPItu-qYKA> \"CharacterAccountLevelLast IPStatusEK Sir\" spans 17..466px",
+   "off screen: <thead.s-JohPItu-qYKA> \"CharacterAccountLevelLast IPStatus\" spans 17..466px",
+   "off screen: <tr.s-JohPItu-qYKA> \"CharacterAccountLevelLast IPStatus\" spans 17..466px",
+   "off screen: <th.s-JohPItu-qYKA> \"Status\" spans 366..466px",
+   "off screen: <tbody.s-JohPItu-qYKA> \"EK Sir Bartholomew Longnamelayoutplayer1\" spans 17..466px",
+   "off screen: <tr.s-JohPItu-qYKA> \"EK Sir Bartholomew Longnamelayoutplayer1\" spans 17..466px",
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
        - heading "Players & accounts" [level=1] [ref=e44]
        - paragraph [ref=e45]: 9 characters on 3 accounts · 3 online
      - generic [ref=e46]:
        - generic [ref=e47]:
          - text: Filter by character, account, email or IP
          - searchbox "Filter by character, account, email or IP" [ref=e48]: a
        - generic [ref=e49]:
          - text: Status
          - combobox "Status" [ref=e50]:
            - option "All players" [selected]
            - option "Online"
            - option "With notes"
            - option "Banned"
        - button "Search" [ref=e51] [cursor=pointer]
      - table [ref=e55]:
        - rowgroup [ref=e56]:
          - row [ref=e57]:
            - columnheader "Character" [ref=e58]
            - columnheader "Account" [ref=e59]
            - columnheader "Level" [ref=e60]
            - columnheader "Last IP" [ref=e61]
            - columnheader "Status" [ref=e62]
        - rowgroup [ref=e63]:
          - row [ref=e64]:
            - cell "EK Sir Bartholomew Longname" [ref=e65]:
              - generic [ref=e66]: EK
              - link "Sir Bartholomew Longname" [ref=e67] [cursor=pointer]:
                - /url: "?q=a&player=Sir+Bartholomew+Longname"
            - cell "layoutplayer" [ref=e68]
            - cell "187" [ref=e69]
            - cell "–" [ref=e70]
            - cell "Online" [ref=e71]
          - row [ref=e73]:
            - cell "RP Quickshot Hawkeye" [ref=e74]:
              - generic [ref=e75]: RP
              - link "Quickshot Hawkeye" [ref=e76] [cursor=pointer]:
                - /url: "?q=a&player=Quickshot+Hawkeye"
            - cell "layoutothers" [ref=e77]
            - cell "104" [ref=e78]
            - cell "–" [ref=e79]
            - cell "Online Banned 1 note" [ref=e80]:
              - generic [ref=e81]: Online
              - generic [ref=e82]: Banned
              - generic [ref=e83]: 1 note
          - row [ref=e84]:
            - cell "S Archmage Vel" [ref=e85]:
              - generic [ref=e86]: S
              - link "Archmage Vel" [ref=e87] [cursor=pointer]:
                - /url: "?q=a&player=Archmage+Vel"
            - cell "layoutothers" [ref=e88]
            - cell "61" [ref=e89]
            - cell "–" [ref=e90]
            - cell "Online Banned 1 note" [ref=e91]:
              - generic [ref=e92]: Online
              - generic [ref=e93]: Banned
              - generic [ref=e94]: 1 note
          - row [ref=e95]:
            - cell "MS Elara Moonwhisper" [ref=e96]:
              - generic [ref=e97]: MS
              - link "Elara Moonwhisper" [ref=e98] [cursor=pointer]:
                - /url: "?q=a&player=Elara+Moonwhisper"
            - cell "layoutplayer" [ref=e99]
            - cell "132" [ref=e100]
            - cell "–" [ref=e101]
            - cell "Offline" [ref=e102]
          - row [ref=e103]:
            - cell "D Druidess Fernleaf" [ref=e104]:
              - generic [ref=e105]: D
              - link "Druidess Fernleaf" [ref=e106] [cursor=pointer]:
                - /url: "?q=a&player=Druidess+Fernleaf"
            - cell "layoutothers" [ref=e107]
            - cell "98" [ref=e108]
            - cell "–" [ref=e109]
            - cell "Offline Banned 1 note" [ref=e110]:
              - text: Offline
              - generic [ref=e111]: Banned
              - generic [ref=e112]: 1 note
          - row [ref=e113]:
            - cell "K Grumbold Axebeard" [ref=e114]:
              - generic [ref=e115]: K
              - link "Grumbold Axebeard" [ref=e116] [cursor=pointer]:
                - /url: "?q=a&player=Grumbold+Axebeard"
            - cell "layoutothers" [ref=e117]
            - cell "85" [ref=e118]
            - cell "–" [ref=e119]
            - cell "Offline Banned 1 note" [ref=e120]:
              - text: Offline
              - generic [ref=e121]: Banned
              - generic [ref=e122]: 1 note
          - row [ref=e123]:
            - cell "P Paladin Sarah" [ref=e124]:
              - generic [ref=e125]: P
              - link "Paladin Sarah" [ref=e126] [cursor=pointer]:
                - /url: "?q=a&player=Paladin+Sarah"
            - cell "layoutothers" [ref=e127]
            - cell "40" [ref=e128]
            - cell "–" [ref=e129]
            - cell "Offline Banned Namelock 1 note" [ref=e130]:
              - text: Offline
              - generic [ref=e131]: Banned
              - generic [ref=e132]: Namelock
              - generic [ref=e133]: 1 note
          - row [ref=e134]:
            - cell "RK Gamemaster Layout" [ref=e135]:
              - generic [ref=e136]: RK
              - link "Gamemaster Layout" [ref=e137] [cursor=pointer]:
                - /url: "?q=a&player=Gamemaster+Layout"
            - cell "layoutgod" [ref=e138]
            - cell "8" [ref=e139]
            - cell "–" [ref=e140]
            - cell "Offline" [ref=e141]
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
      |                                                                             ^ Error: /admin/players?q=a fits 393px
  168 | 				});
  169 | 			}
  170 | 		});
  171 | 	}
  172 | }
  173 | 
```