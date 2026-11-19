# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> 393px, player >> /account/two-step
- Location: tests/layout.spec.ts:159:5

# Error details

```
Error: /account/two-step fits 393px

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 9

- Array []
+ Array [
+   "scrolls sideways: <nav.s-8UBR2zed9y7S> \"OverviewNew characterPasswordEmailRecove\" is 851px in 359px",
+   "off screen: <a.s-8UBR2zed9y7S> \"Email\" spans 340..406px",
+   "off screen: <a.s-8UBR2zed9y7S> \"Recovery key\" spans 410..522px",
+   "off screen: <a.s-8UBR2zed9y7S> \"Two-step login\" spans 526..653px",
+   "off screen: <a.s-8UBR2zed9y7S> \"Login history\" spans 657..770px",
+   "off screen: <form.s-8UBR2zed9y7S> \"Log out\" spans 778..860px",
+   "off screen: <button.s-8UBR2zed9y7S> \"Log out\" spans 783..860px",
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
      - heading "Two-step login" [level=1] [ref=e50]
      - generic [ref=e51]:
        - paragraph [ref=e52]: "Protect your account with a second step: after your password, the website asks for a 6-digit code from an authenticator app on your phone (for example Google Authenticator, Microsoft Authenticator, Aegis or 2FAS)."
        - list [ref=e53]:
          - listitem [ref=e54]: "Open the app and add an account by scanning this code:"
        - paragraph [ref=e58]: "Or enter this key by hand: P2V5 YE3F E6CG KUHZ PG7S MS35 5X7K N4VG"
        - generic [ref=e59]:
          - generic [ref=e60]:
            - text: Then enter the code the app shows
            - textbox "Then enter the code the app shows" [ref=e61]
          - button "Turn on two-step login" [ref=e63] [cursor=pointer]
  - contentinfo [ref=e64]:
    - generic [ref=e65]:
      - generic [ref=e66]: Elderwood · A fan-run server, not affiliated with CipSoft.
      - navigation "Footer" [ref=e67]:
        - link "Rules" [ref=e68] [cursor=pointer]:
          - /url: /rules
        - link "Houses" [ref=e69] [cursor=pointer]:
          - /url: /houses
        - link "Latest deaths" [ref=e70] [cursor=pointer]:
          - /url: /deaths
        - link "Support" [ref=e71] [cursor=pointer]:
          - /url: /support
        - link "Privacy" [ref=e72] [cursor=pointer]:
          - /url: /privacy
      - generic [ref=e73]:
        - generic [ref=e74]: Colours
        - combobox "Colours" [ref=e75]:
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
      |                                                                             ^ Error: /account/two-step fits 393px
  168 | 				});
  169 | 			}
  170 | 		});
  171 | 	}
  172 | }
  173 | 
```