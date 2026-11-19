# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> 393px, player >> /account/history
- Location: tests/layout.spec.ts:159:5

# Error details

```
Error: /account/history fits 393px

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 25

- Array []
+ Array [
+   "scrolls sideways: <nav.s-8UBR2zed9y7S> \"OverviewNew characterPasswordEmailRecove\" is 851px in 359px",
+   "off screen: <a.s-8UBR2zed9y7S> \"Email\" spans 340..406px",
+   "off screen: <a.s-8UBR2zed9y7S> \"Recovery key\" spans 410..522px",
+   "off screen: <a.s-8UBR2zed9y7S> \"Two-step login\" spans 526..651px",
+   "off screen: <a.s-8UBR2zed9y7S> \"Login history\" spans 655..771px",
+   "off screen: <form.s-8UBR2zed9y7S> \"Log out\" spans 779..860px",
+   "off screen: <button.s-8UBR2zed9y7S> \"Log out\" spans 784..860px",
+   "scrolls sideways: <div.scroll.s-_tgUJDvmxJ7x> \"The last 50 logins on this website. Game\" is 814px in 361px",
+   "off screen: <table.table.s-_tgUJDvmxJ7x> \"WhenAddressBrowserResult19 Nov 2026, 16:\" spans 28..818px",
+   "off screen: <thead.s-_tgUJDvmxJ7x> \"WhenAddressBrowserResult\" spans 28..818px",
+   "off screen: <tr.s-_tgUJDvmxJ7x> \"WhenAddressBrowserResult\" spans 28..818px",
+   "off screen: <th.s-_tgUJDvmxJ7x> \"Address\" spans 93..451px",
+   "off screen: <th.s-_tgUJDvmxJ7x> \"Browser\" spans 451..731px",
+   "off screen: <th.s-_tgUJDvmxJ7x> \"Result\" spans 731..818px",
+   "off screen: <tbody.s-_tgUJDvmxJ7x> \"19 Nov 2026, 16:392001:db8:85a3:0000:000\" spans 28..818px",
+   "off screen: <tr.s-_tgUJDvmxJ7x> \"19 Nov 2026, 16:392001:db8:85a3:0000:000\" spans 28..818px",
+   "off screen: <td.pixel.s-_tgUJDvmxJ7x> \"2001:db8:85a3:0000:0000:8a2e:0370:7334\" spans 93..451px",
+   "off screen: <td.browser.s-_tgUJDvmxJ7x> \"Mozilla/5.0 (X11; Linux x86_64) AppleWeb\" spans 451..731px",
+   "off screen: <td.s-_tgUJDvmxJ7x> \"Wrong password\" spans 731..818px",
+   "off screen: <tr.s-_tgUJDvmxJ7x> \"19 Nov 2026, 16:39203.0.113.17Mozilla/5.\" spans 28..818px",
+   "off screen: <td.pixel.s-_tgUJDvmxJ7x> \"203.0.113.17\" spans 93..451px",
+   "off screen: <td.browser.s-_tgUJDvmxJ7x> \"Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 \" spans 451..731px",
+   "off screen: <td.s-_tgUJDvmxJ7x> \"Logged in\" spans 731..818px",
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
    - navigation "Account" [ref=e37]:
      - link "Overview" [ref=e38] [cursor=pointer]:
        - /url: /account
      - link "New character" [ref=e39] [cursor=pointer]:
        - /url: /account/characters/new
      - link "Password" [ref=e40] [cursor=pointer]:
        - /url: /account/password
      - link "Email" [ref=e41] [cursor=pointer]:
        - /url: /account/email
      - link "Recovery key" [ref=e42] [cursor=pointer]:
        - /url: /account/recovery-key
      - link "Two-step login" [ref=e43] [cursor=pointer]:
        - /url: /account/two-step
      - link "Login history" [ref=e44] [cursor=pointer]:
        - /url: /account/history
      - button "Log out" [ref=e46] [cursor=pointer]
    - region [ref=e48]:
      - heading "Login history" [level=1] [ref=e50]
      - generic [ref=e51]:
        - paragraph [ref=e52]: The last 50 logins on this website. Game logins are not listed here.
        - table [ref=e53]:
          - rowgroup [ref=e54]:
            - row [ref=e55]:
              - columnheader "When" [ref=e56]
              - columnheader "Address" [ref=e57]
              - columnheader "Browser" [ref=e58]
              - columnheader "Result" [ref=e59]
          - rowgroup [ref=e60]:
            - row [ref=e61]:
              - cell "19 Nov 2026, 16:39" [ref=e62]
              - cell "2001:db8:85a3:0000:0000:8a2e:0370:7334" [ref=e63]
              - cell "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36" [ref=e64]
              - cell "Wrong password" [ref=e65]
            - row [ref=e66]:
              - cell "19 Nov 2026, 16:39" [ref=e67]
              - cell "203.0.113.17" [ref=e68]
              - cell "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1" [ref=e69]
              - cell "Logged in" [ref=e70]
  - contentinfo [ref=e71]:
    - generic [ref=e72]:
      - generic [ref=e73]: Elderwood · A fan-run server, not affiliated with CipSoft.
      - navigation "Footer" [ref=e74]:
        - link "Rules" [ref=e75] [cursor=pointer]:
          - /url: /rules
        - link "Houses" [ref=e76] [cursor=pointer]:
          - /url: /houses
        - link "Latest deaths" [ref=e77] [cursor=pointer]:
          - /url: /deaths
        - link "Support" [ref=e78] [cursor=pointer]:
          - /url: /support
        - link "Privacy" [ref=e79] [cursor=pointer]:
          - /url: /privacy
      - generic [ref=e80]:
        - generic [ref=e81]: Colours
        - combobox "Colours" [ref=e82]:
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
      |                                                                             ^ Error: /account/history fits 393px
  168 | 				});
  169 | 			}
  170 | 		});
  171 | 	}
  172 | }
  173 | 
```