# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> 360px, player >> /account
- Location: tests/layout.spec.ts:159:5

# Error details

```
Error: /account fits 360px

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 27

- Array []
+ Array [
+   "scrolls sideways: <nav.s-8UBR2zed9y7S> \"OverviewNew characterPasswordEmailRecove\" is 851px in 326px",
+   "off screen: <a.s-8UBR2zed9y7S> \"Email\" spans 343..408px",
+   "off screen: <a.s-8UBR2zed9y7S> \"Recovery key\" spans 412..525px",
+   "off screen: <a.s-8UBR2zed9y7S> \"Two-step login\" spans 529..653px",
+   "off screen: <a.s-8UBR2zed9y7S> \"Login history\" spans 657..770px",
+   "off screen: <form.s-8UBR2zed9y7S> \"Log out\" spans 778..860px",
+   "off screen: <button.s-8UBR2zed9y7S> \"Log out\" spans 783..860px",
+   "scrolls sideways: <div.scroll.s-PLmhobIa9nN9> \"NameVocationLevelStatusActionsElara Moon\" is 584px in 328px",
+   "off screen: <table.table.s-PLmhobIa9nN9> \"NameVocationLevelStatusActionsElara Moon\" spans 28..588px",
+   "off screen: <thead.s-PLmhobIa9nN9> \"NameVocationLevelStatusActions\" spans 28..588px",
+   "off screen: <tr.s-PLmhobIa9nN9> \"NameVocationLevelStatusActions\" spans 28..588px",
+   "off screen: <th.s-PLmhobIa9nN9> \"Vocation\" spans 222..367px",
+   "off screen: <th.s-PLmhobIa9nN9> \"Level\" spans 367..428px",
+   "off screen: <th.s-PLmhobIa9nN9> \"Status\" spans 428..499px",
+   "off screen: <th.right.s-PLmhobIa9nN9> \"Actions\" spans 499..588px",
+   "off screen: <tbody.s-PLmhobIa9nN9> \"Elara MoonwhisperMS Master Sorcerer132Of\" spans 28..588px",
+   "off screen: <tr.s-PLmhobIa9nN9> \"Elara MoonwhisperMS Master Sorcerer132Of\" spans 28..588px",
+   "off screen: <td.s-PLmhobIa9nN9> \"MS Master Sorcerer\" spans 222..367px",
+   "off screen: <td.pixel.s-PLmhobIa9nN9> \"132\" spans 367..428px",
+   "off screen: <td.s-PLmhobIa9nN9> \"Offline\" spans 428..499px",
+   "off screen: <span.s-PLmhobIa9nN9> \"Offline\" spans 440..486px",
+   "off screen: <td.right.s-PLmhobIa9nN9> \"Delete\" spans 499..588px",
+   "off screen: <form.s-PLmhobIa9nN9> \"Delete\" spans 511..576px",
+   "off screen: <button.small.danger.s-PLmhobIa9nN9> \"Delete\" spans 511..576px",
+   "off screen: <tr.s-PLmhobIa9nN9> \"Sir Bartholomew LongnameEK Elite Knight1\" spans 28..588px",
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
    - generic [ref=e47]:
      - paragraph [ref=e48]:
        - text: Your account has no recovery key yet. Without one, a lost password cannot be reset.
        - link "Create a recovery key ›" [ref=e49] [cursor=pointer]:
          - /url: /account/recovery-key
      - region [ref=e50]:
        - generic [ref=e51]:
          - heading "Characters" [level=2] [ref=e52]
          - link "+ New character" [ref=e53] [cursor=pointer]:
            - /url: /account/characters/new
        - table [ref=e55]:
          - rowgroup [ref=e56]:
            - row [ref=e57]:
              - columnheader "Name" [ref=e58]
              - columnheader "Vocation" [ref=e59]
              - columnheader "Level" [ref=e60]
              - columnheader "Status" [ref=e61]
              - columnheader "Actions" [ref=e62]
          - rowgroup [ref=e63]:
            - row [ref=e64]:
              - cell [ref=e65]:
                - strong [ref=e66]: Elara Moonwhisper
              - cell "MS Master Sorcerer" [ref=e67]
              - cell "132" [ref=e68]
              - cell "Offline" [ref=e69]
              - cell [ref=e70]:
                - button "Delete" [ref=e72] [cursor=pointer]
            - row [ref=e73]:
              - cell [ref=e74]:
                - strong [ref=e75]: Sir Bartholomew Longname
              - cell "EK Elite Knight" [ref=e76]
              - cell "187" [ref=e77]
              - cell "Online" [ref=e78]
              - cell [ref=e79]:
                - button "Delete" [disabled] [ref=e81]
      - generic [ref=e82]:
        - generic [ref=e83]: Your characters list each other on their public pages.
        - button "Hide them" [ref=e84] [cursor=pointer]
      - generic [ref=e85]:
        - generic [ref=e86]:
          - text: Character comment
          - combobox "Character comment" [ref=e87]:
            - option "Elara Moonwhisper" [selected]
            - option "Sir Bartholomew Longname"
        - textbox "Comment" [ref=e88]:
          - /placeholder: Shown on the character's page
        - button "Save" [ref=e89] [cursor=pointer]
      - generic [ref=e90]:
        - region [ref=e91]:
          - heading "Account" [level=2] [ref=e93]
          - generic [ref=e95]:
            - term [ref=e96]: Account name
            - definition [ref=e97]: layoutplayer
            - term [ref=e98]: Email
            - definition [ref=e99]:
              - text: a.rather.long.email.address@example.com
              - link "Change" [ref=e100] [cursor=pointer]:
                - /url: /account/email
            - term [ref=e101]: Password
            - definition [ref=e102]:
              - link "Change" [ref=e103] [cursor=pointer]:
                - /url: /account/password
            - term [ref=e104]: Recovery key
            - definition [ref=e105]:
              - text: Not set
              - link "Create" [ref=e106] [cursor=pointer]:
                - /url: /account/recovery-key
            - term [ref=e107]: Created
            - definition [ref=e108]: 10 Oct 2026
        - region [ref=e109]:
          - heading "Premium" [level=2] [ref=e111]
          - generic [ref=e112]:
            - paragraph [ref=e113]: Premium · 30 days left
            - paragraph [ref=e114]: "Premium opens the whole world: more cities, hunting grounds, spells and outfits."
            - button "Get premium" [ref=e116] [cursor=pointer]
            - paragraph [ref=e117]: For now this adds one free day of premium, once a day.
      - region [ref=e118]:
        - generic [ref=e119]:
          - heading "Recent logins" [level=2] [ref=e120]
          - link "All" [ref=e121] [cursor=pointer]:
            - /url: /account/history
        - table [ref=e123]:
          - rowgroup [ref=e124]:
            - row [ref=e125]:
              - columnheader "When" [ref=e126]
              - columnheader "Address" [ref=e127]
              - columnheader "Result" [ref=e128]
          - rowgroup [ref=e129]:
            - row [ref=e130]:
              - cell "19 Nov 2026, 16:39" [ref=e131]
              - cell "2001:db8:85a3:0000:0000:8a2e:0370:7334" [ref=e132]
              - cell "Wrong password" [ref=e133]
            - row [ref=e134]:
              - cell "19 Nov 2026, 16:39" [ref=e135]
              - cell "203.0.113.17" [ref=e136]
              - cell "Logged in" [ref=e137]
  - contentinfo [ref=e138]:
    - generic [ref=e139]:
      - generic [ref=e140]: Elderwood · A fan-run server, not affiliated with CipSoft.
      - navigation "Footer" [ref=e141]:
        - link "Rules" [ref=e142] [cursor=pointer]:
          - /url: /rules
        - link "Houses" [ref=e143] [cursor=pointer]:
          - /url: /houses
        - link "Latest deaths" [ref=e144] [cursor=pointer]:
          - /url: /deaths
        - link "Support" [ref=e145] [cursor=pointer]:
          - /url: /support
        - link "Privacy" [ref=e146] [cursor=pointer]:
          - /url: /privacy
      - generic [ref=e147]:
        - generic [ref=e148]: Colours
        - combobox "Colours" [ref=e149]:
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