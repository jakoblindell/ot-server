# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> 360px, god >> /admin/news
- Location: tests/layout.spec.ts:159:5

# Error details

```
Error: /admin/news fits 360px

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 27

- Array []
+ Array [
+   "scrolls sideways: <nav.side> \"OVERVIEW DashboardSERVER ConsoleServer f\" is 1501px in 360px",
+   "off screen: <div.group> \"SERVER ConsoleServer filesMonstersLibrar\" spans 105..762px",
+   "off screen: <a> \"Monsters\" spans 279..361px",
+   "off screen: <a> \"Library\" spans 363..430px",
+   "off screen: <a> \"Pending changes\" spans 432..566px",
+   "off screen: <a> \"Config & rates\" spans 568..682px",
+   "off screen: <a> \"Backups\" spans 684..762px",
+   "off screen: <div.group> \"PLAYERS Players & accountsReports1Client\" spans 766..1200px",
+   "off screen: <a> \"Players & accounts\" spans 766..914px",
+   "off screen: <a> \"Reports1\" spans 916..1010px",
+   "off screen: <span.count.mono> \"1\" spans 979..1000px",
+   "off screen: <a> \"Client reports1\" spans 1012..1145px",
+   "off screen: <span.count.mono> \"1\" spans 1113..1135px",
+   "off screen: <a> \"Bans\" spans 1147..1200px",
+   "off screen: <div.group> \"CONTENT News posts\" spans 1204..1305px",
+   "off screen: <a> \"News posts\" spans 1204..1305px",
+   "off screen: <div.group> \"SYSTEM Audit logStaff & roles\" spans 1309..1493px",
+   "off screen: <a> \"Audit log\" spans 1309..1388px",
+   "off screen: <a> \"Staff & roles\" spans 1390..1493px",
+   "scrolls sideways: <div.scroll.s-L_znsn6udVRn> \"KindTitleSignedPublishedtickerGamemaster\" is 542px in 326px",
+   "off screen: <table.s-L_znsn6udVRn> \"KindTitleSignedPublishedtickerGamemaster\" spans 17..559px",
+   "off screen: <thead.s-L_znsn6udVRn> \"KindTitleSignedPublished\" spans 17..559px",
+   "off screen: <tr.s-L_znsn6udVRn> \"KindTitleSignedPublished\" spans 17..559px",
+   "off screen: <th.s-L_znsn6udVRn> \"Published\" spans 306..401px",
+   "off screen: <th.s-L_znsn6udVRn> spans 401..559px",
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
        - heading "News posts" [level=1] [ref=e44]
        - paragraph [ref=e45]: Articles show on the home page; ticker lines are the short one-liners above them.
      - generic [ref=e46]:
        - heading "New post" [level=2] [ref=e48]
        - generic [ref=e49]:
          - generic [ref=e50]:
            - generic [ref=e51]:
              - text: Kind
              - combobox "Kind" [ref=e52]:
                - option "Article" [selected]
                - option "Ticker line"
            - generic [ref=e53]:
              - text: Title (the whole text for a ticker line)
              - textbox "Title (the whole text for a ticker line)" [ref=e54]
            - generic [ref=e55]:
              - text: Signed
              - textbox "Signed" [ref=e56]:
                - /placeholder: layoutgod
          - generic [ref=e57]:
            - text: Text
            - textbox "Text Plain text. A blank line starts a new paragraph; lines starting with \"- \" become a list." [ref=e58]
            - generic [ref=e59]: Plain text. A blank line starts a new paragraph; lines starting with "- " become a list.
          - generic [ref=e60]:
            - generic [ref=e61]:
              - text: Publish
              - combobox "Publish" [ref=e62]:
                - option "Now" [selected]
                - option "As draft (not shown)"
            - button "Publish" [ref=e63] [cursor=pointer]
      - generic [ref=e64]:
        - heading "All posts" [level=2] [ref=e66]
        - table [ref=e68]:
          - rowgroup [ref=e69]:
            - row [ref=e70]:
              - columnheader "Kind" [ref=e71]
              - columnheader "Title" [ref=e72]
              - columnheader "Signed" [ref=e73]
              - columnheader "Published" [ref=e74]
              - columnheader [ref=e75]
          - rowgroup [ref=e76]:
            - row [ref=e77]:
              - cell "ticker" [ref=e78]
              - cell [ref=e80]
              - cell "Gamemaster Layout" [ref=e81]
              - cell "19 Nov 2026, 16:39" [ref=e82]
              - cell [ref=e83]:
                - link "Edit" [ref=e84] [cursor=pointer]:
                  - /url: "?edit=9402"
                - button "Delete" [ref=e86] [cursor=pointer]
            - row [ref=e87]:
              - cell "article" [ref=e88]
              - cell [ref=e90]:
                - 'link "Patch notes: rotworms behave, the post office opens, and a much longer headline" [ref=e91] [cursor=pointer]':
                  - /url: /news/9401
              - cell "Gamemaster Layout" [ref=e92]
              - cell "19 Nov 2026, 16:39" [ref=e93]
              - cell [ref=e94]:
                - link "Edit" [ref=e95] [cursor=pointer]:
                  - /url: "?edit=9401"
                - button "Delete" [ref=e97] [cursor=pointer]
            - row [ref=e98]:
              - cell "article" [ref=e99]
              - cell [ref=e101]:
                - link "The gates of Elderwood open" [ref=e102] [cursor=pointer]:
                  - /url: /news/1
              - cell "The Elderwood team" [ref=e103]
              - cell "19 Nov 2026, 16:38" [ref=e104]
              - cell [ref=e105]:
                - link "Edit" [ref=e106] [cursor=pointer]:
                  - /url: "?edit=1"
                - button "Delete" [ref=e108] [cursor=pointer]
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
      |                                                                             ^ Error: /admin/news fits 360px
  168 | 				});
  169 | 			}
  170 | 		});
  171 | 	}
  172 | }
  173 | 
```