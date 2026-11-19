# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> 360px, god >> /admin
- Location: tests/layout.spec.ts:159:5

# Error details

```
Error: /admin fits 360px

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 27

- Array []
+ Array [
+   "scrolls sideways: <nav.side> \"OVERVIEW DashboardSERVER ConsoleServer f\" is 1501px in 360px",
+   "off screen: <div.group> \"SERVER ConsoleServer filesMonstersLibrar\" spans 108..764px",
+   "off screen: <a> \"Monsters\" spans 281..364px",
+   "off screen: <a> \"Library\" spans 366..432px",
+   "off screen: <a> \"Pending changes\" spans 434..568px",
+   "off screen: <a> \"Config & rates\" spans 570..685px",
+   "off screen: <a> \"Backups\" spans 687..764px",
+   "off screen: <div.group> \"PLAYERS Players & accountsReports1Client\" spans 768..1203px",
+   "off screen: <a> \"Players & accounts\" spans 768..916px",
+   "off screen: <a> \"Reports1\" spans 918..1012px",
+   "off screen: <span.count.mono> \"1\" spans 981..1002px",
+   "off screen: <a> \"Client reports1\" spans 1014..1147px",
+   "off screen: <span.count.mono> \"1\" spans 1116..1137px",
+   "off screen: <a> \"Bans\" spans 1149..1203px",
+   "off screen: <div.group> \"CONTENT News posts\" spans 1207..1305px",
+   "off screen: <a> \"News posts\" spans 1207..1305px",
+   "off screen: <div.group> \"SYSTEM Audit logStaff & roles\" spans 1309..1493px",
+   "off screen: <a> \"Audit log\" spans 1309..1389px",
+   "off screen: <a> \"Staff & roles\" spans 1391..1493px",
+   "scrolls sideways: <div.scroll.s-7rWotIBe7yq4> \"WhenWhoActionDetails19 Nov, 16:39layoutg\" is 368px in 326px",
+   "off screen: <table.s-7rWotIBe7yq4> \"WhenWhoActionDetails19 Nov, 16:39layoutg\" spans 17..385px",
+   "off screen: <thead.s-7rWotIBe7yq4> \"WhenWhoActionDetails\" spans 17..385px",
+   "off screen: <tr.s-7rWotIBe7yq4> \"WhenWhoActionDetails\" spans 17..385px",
+   "off screen: <th.s-7rWotIBe7yq4> \"Details\" spans 294..385px",
+   "off screen: <tbody.s-7rWotIBe7yq4> \"19 Nov, 16:39layoutgodnews.publishPatch \" spans 17..385px",
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
        - heading "Dashboard" [level=1] [ref=e44]
        - paragraph [ref=e45]: Staff area. Every action here is logged with your name.
      - generic [ref=e46]:
        - generic [ref=e47]:
          - generic [ref=e48]: Game server
          - generic [ref=e49]: Offline
          - generic [ref=e51]: not answering
        - generic [ref=e52]:
          - generic [ref=e53]: Players online
          - generic [ref=e54]: "0"
          - generic [ref=e55]: record 0
        - generic [ref=e56]:
          - generic [ref=e57]: Next server save
          - generic [ref=e58]: 08:00
          - generic [ref=e59]: the server restarts then
        - generic [ref=e60]:
          - generic [ref=e61]: Last backup
          - generic [ref=e62]: 16:41
          - generic [ref=e63]: 19 Nov, 16:41 · 0 kB · 2 kept
      - generic [ref=e64]:
        - generic [ref=e65]:
          - heading "Players online, last 24 hours" [level=2] [ref=e66]
          - generic [ref=e67]: Highest count per hour
        - generic [ref=e68]:
          - img "Players online per hour over the last 24 hours" [ref=e69]
          - generic [ref=e118]:
            - generic [ref=e119]: 17:00
            - generic [ref=e120]: 05:00
            - generic [ref=e121]: 16:00
      - generic [ref=e122]:
        - generic [ref=e123]:
          - heading "Server actions" [level=2] [ref=e125]
          - generic [ref=e126]:
            - generic [ref=e127]:
              - generic [ref=e128]:
                - text: Broadcast to all players
                - textbox "Broadcast to all players" [ref=e129]
              - button "Send" [ref=e130] [cursor=pointer]
            - generic [ref=e131]:
              - button "Save now" [ref=e133] [cursor=pointer]
              - button "Clean map" [ref=e135] [cursor=pointer]
            - generic [ref=e136]:
              - generic [ref=e137]:
                - text: Reload
                - combobox "Reload" [ref=e138]:
                  - option "actions" [selected]
                  - option "chat"
                  - option "config"
                  - option "creaturescripts"
                  - option "events"
                  - option "global"
                  - option "globalevents"
                  - option "items"
                  - option "monsters"
                  - option "movements"
                  - option "npcs"
                  - option "quests"
                  - option "raids"
                  - option "spells"
                  - option "talkactions"
                  - option "weapons"
              - button "Reload" [ref=e139] [cursor=pointer]
            - generic [ref=e140]:
              - generic [ref=e141]: DANGER ZONE
              - generic [ref=e142]:
                - generic [ref=e143]:
                  - text: Restart
                  - combobox "Restart" [ref=e144]:
                    - option "in 5 minutes" [selected]
                    - option "in 15 minutes"
                    - option "now"
                - button "Restart server" [ref=e145] [cursor=pointer]
              - paragraph [ref=e146]: Players get warnings; the server saves, stops and starts again.
        - generic [ref=e147]:
          - heading "Recent server commands" [level=2] [ref=e149]
          - table [ref=e151]:
            - rowgroup [ref=e152]:
              - row [ref=e153]:
                - columnheader "When" [ref=e154]
                - columnheader "Command" [ref=e155]
                - columnheader "By" [ref=e156]
                - columnheader "Result" [ref=e157]
            - rowgroup [ref=e158]:
              - row [ref=e159]:
                - cell "19 Nov, 16:39" [ref=e160]
                - cell "broadcast" [ref=e161]
                - cell "layoutgod" [ref=e162]
                - cell "done sent" [ref=e163]:
                  - generic [ref=e164]: done
                  - text: sent
      - generic [ref=e165]:
        - generic [ref=e166]:
          - heading "Recent staff actions" [level=2] [ref=e167]
          - link "Audit log" [ref=e168] [cursor=pointer]:
            - /url: /admin/audit
        - table [ref=e170]:
          - rowgroup [ref=e171]:
            - row [ref=e172]:
              - columnheader "When" [ref=e173]
              - columnheader "Who" [ref=e174]
              - columnheader "Action" [ref=e175]
              - columnheader "Details" [ref=e176]
          - rowgroup [ref=e177]:
            - row [ref=e178]:
              - cell "19 Nov, 16:39" [ref=e179]
              - cell "layoutgod" [ref=e180]
              - cell "news.publish" [ref=e181]
              - 'cell "Patch notes: rotworms behave, the post office opens, and a much longer headline" [ref=e182]'
            - row [ref=e183]:
              - cell "19 Nov, 16:39" [ref=e184]
              - cell "layoutgod" [ref=e185]
              - cell "ban" [ref=e186]
              - 'cell "7 days: Insulting other players repeatedly in the trade channel" [ref=e187]'
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
      |                                                                             ^ Error: /admin fits 360px
  168 | 				});
  169 | 			}
  170 | 		});
  171 | 	}
  172 | }
  173 | 
```