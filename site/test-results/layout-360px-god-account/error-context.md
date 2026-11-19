# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> 360px, god >> /account
- Location: tests/layout.spec.ts:159:5

# Error details

```
Error: /account fits 360px

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 27

- Array []
+ Array [
+   "scrolls sideways: <nav.s-8UBR2zed9y7S> \"OverviewNew characterPasswordEmailRecove\" is 935px in 326px",
+   "off screen: <a.s-8UBR2zed9y7S> \"Email\" spans 343..408px",
+   "off screen: <a.s-8UBR2zed9y7S> \"Recovery key\" spans 412..525px",
+   "off screen: <a.s-8UBR2zed9y7S> \"Two-step login\" spans 529..653px",
+   "off screen: <a.s-8UBR2zed9y7S> \"Login history\" spans 657..770px",
+   "off screen: <a.admin.s-8UBR2zed9y7S> \"Admin ›\" spans 774..855px",
+   "off screen: <form.s-8UBR2zed9y7S> \"Log out\" spans 863..944px",
+   "off screen: <button.s-8UBR2zed9y7S> \"Log out\" spans 868..944px",
+   "scrolls sideways: <div.scroll.s-PLmhobIa9nN9> \"NameVocationLevelStatusActionsGamemaster\" is 584px in 328px",
+   "off screen: <table.table.s-PLmhobIa9nN9> \"NameVocationLevelStatusActionsGamemaster\" spans 28..588px",
+   "off screen: <thead.s-PLmhobIa9nN9> \"NameVocationLevelStatusActions\" spans 28..588px",
+   "off screen: <tr.s-PLmhobIa9nN9> \"NameVocationLevelStatusActions\" spans 28..588px",
+   "off screen: <th.s-PLmhobIa9nN9> \"Level\" spans 346..413px",
+   "off screen: <th.s-PLmhobIa9nN9> \"Status\" spans 413..491px",
+   "off screen: <th.right.s-PLmhobIa9nN9> \"Actions\" spans 491..588px",
+   "off screen: <tbody.s-PLmhobIa9nN9> \"Gamemaster LayoutRK No vocation8Offline \" spans 28..588px",
+   "off screen: <tr.s-PLmhobIa9nN9> \"Gamemaster LayoutRK No vocation8Offline \" spans 28..588px",
+   "off screen: <td.pixel.s-PLmhobIa9nN9> \"8\" spans 346..413px",
+   "off screen: <td.s-PLmhobIa9nN9> \"Offline\" spans 413..491px",
+   "off screen: <span.s-PLmhobIa9nN9> \"Offline\" spans 425..472px",
+   "off screen: <td.right.s-PLmhobIa9nN9> \"Delete\" spans 491..588px",
+   "off screen: <form.s-PLmhobIa9nN9> \"Delete\" spans 503..576px",
+   "off screen: <button.small.danger.s-PLmhobIa9nN9> \"Delete\" spans 511..576px",
+   "scrolls sideways: <div.scroll.s-PLmhobIa9nN9> \"WhenAddressResultNo website logins yet.\" is 584px in 328px",
+   "off screen: <table.table.s-PLmhobIa9nN9> \"WhenAddressResultNo website logins yet.\" spans 28..588px",
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
      - link "Admin ›" [ref=e45] [cursor=pointer]:
        - /url: /admin
      - button "Log out" [ref=e47] [cursor=pointer]
    - generic [ref=e48]:
      - paragraph [ref=e49]:
        - text: Your account has no recovery key yet. Without one, a lost password cannot be reset.
        - link "Create a recovery key ›" [ref=e50] [cursor=pointer]:
          - /url: /account/recovery-key
      - region [ref=e51]:
        - generic [ref=e52]:
          - heading "Characters" [level=2] [ref=e53]
          - link "+ New character" [ref=e54] [cursor=pointer]:
            - /url: /account/characters/new
        - table [ref=e56]:
          - rowgroup [ref=e57]:
            - row [ref=e58]:
              - columnheader "Name" [ref=e59]
              - columnheader "Vocation" [ref=e60]
              - columnheader "Level" [ref=e61]
              - columnheader "Status" [ref=e62]
              - columnheader "Actions" [ref=e63]
          - rowgroup [ref=e64]:
            - row [ref=e65]:
              - cell [ref=e66]:
                - strong [ref=e67]: Gamemaster Layout
              - cell "RK No vocation" [ref=e68]
              - cell "8" [ref=e69]
              - cell "Offline" [ref=e70]
              - cell [ref=e71]:
                - button "Delete" [ref=e73] [cursor=pointer]
      - generic [ref=e74]:
        - generic [ref=e75]: Your characters do not list each other on their public pages.
        - button "Show them" [ref=e76] [cursor=pointer]
      - generic [ref=e77]:
        - generic [ref=e78]:
          - text: Character comment
          - combobox "Character comment" [ref=e79]:
            - option "Gamemaster Layout" [selected]
        - textbox "Comment" [ref=e80]:
          - /placeholder: Shown on the character's page
        - button "Save" [ref=e81] [cursor=pointer]
      - generic [ref=e82]:
        - region [ref=e83]:
          - heading "Account" [level=2] [ref=e85]
          - generic [ref=e87]:
            - term [ref=e88]: Account name
            - definition [ref=e89]: layoutgod
            - term [ref=e90]: Email
            - definition [ref=e91]:
              - text: god@example.com
              - link "Change" [ref=e92] [cursor=pointer]:
                - /url: /account/email
            - term [ref=e93]: Password
            - definition [ref=e94]:
              - link "Change" [ref=e95] [cursor=pointer]:
                - /url: /account/password
            - term [ref=e96]: Recovery key
            - definition [ref=e97]:
              - text: Not set
              - link "Create" [ref=e98] [cursor=pointer]:
                - /url: /account/recovery-key
            - term [ref=e99]: Created
            - definition [ref=e100]: 15 Oct 2025
        - region [ref=e101]:
          - heading "Premium" [level=2] [ref=e103]
          - generic [ref=e104]:
            - paragraph [ref=e105]: Free account
            - paragraph [ref=e106]: "Premium opens the whole world: more cities, hunting grounds, spells and outfits."
            - button "Get premium" [ref=e108] [cursor=pointer]
            - paragraph [ref=e109]: For now this adds one free day of premium, once a day.
      - region [ref=e110]:
        - generic [ref=e111]:
          - heading "Recent logins" [level=2] [ref=e112]
          - link "All" [ref=e113] [cursor=pointer]:
            - /url: /account/history
        - table [ref=e115]:
          - rowgroup [ref=e116]:
            - row [ref=e117]:
              - columnheader "When" [ref=e118]
              - columnheader "Address" [ref=e119]
              - columnheader "Result" [ref=e120]
          - rowgroup [ref=e121]:
            - row [ref=e122]:
              - cell "No website logins yet." [ref=e123]
  - contentinfo [ref=e124]:
    - generic [ref=e125]:
      - generic [ref=e126]: Elderwood · A fan-run server, not affiliated with CipSoft.
      - navigation "Footer" [ref=e127]:
        - link "Rules" [ref=e128] [cursor=pointer]:
          - /url: /rules
        - link "Houses" [ref=e129] [cursor=pointer]:
          - /url: /houses
        - link "Latest deaths" [ref=e130] [cursor=pointer]:
          - /url: /deaths
        - link "Support" [ref=e131] [cursor=pointer]:
          - /url: /support
        - link "Privacy" [ref=e132] [cursor=pointer]:
          - /url: /privacy
      - generic [ref=e133]:
        - generic [ref=e134]: Colours
        - combobox "Colours" [ref=e135]:
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
      |                                                                             ^ Error: /account fits 360px
  168 | 				});
  169 | 			}
  170 | 		});
  171 | 	}
  172 | }
  173 | 
```