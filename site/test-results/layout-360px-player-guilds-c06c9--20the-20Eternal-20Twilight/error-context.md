# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> 360px, player >> /guilds/Knights%20of%20the%20Eternal%20Twilight
- Location: tests/layout.spec.ts:159:5

# Error details

```
Error: /guilds/Knights%20of%20the%20Eternal%20Twilight fits 360px

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 24

- Array []
+ Array [
+   "scrolls sideways: <div.scroll.s-NqZhIhyQsDW2> \"RankNameVocationLevelStatusGrand Command\" is 584px in 328px",
+   "off screen: <table.table.s-NqZhIhyQsDW2> \"RankNameVocationLevelStatusGrand Command\" spans 28..588px",
+   "off screen: <thead.s-NqZhIhyQsDW2> \"RankNameVocationLevelStatus\" spans 28..588px",
+   "off screen: <tr.s-NqZhIhyQsDW2> \"RankNameVocationLevelStatus\" spans 28..588px",
+   "off screen: <th.s-NqZhIhyQsDW2> \"Vocation\" spans 343..456px",
+   "off screen: <th.num.s-NqZhIhyQsDW2> \"Level\" spans 456..517px",
+   "off screen: <th.s-NqZhIhyQsDW2> \"Status\" spans 517..588px",
+   "off screen: <tbody.s-NqZhIhyQsDW2> \"Grand CommanderSir Bartholomew Longname \" spans 28..588px",
+   "off screen: <tr.s-NqZhIhyQsDW2.first> \"Grand CommanderSir Bartholomew Longname \" spans 28..588px",
+   "off screen: <td.s-NqZhIhyQsDW2> \"EK Elite Knight\" spans 343..456px",
+   "off screen: <span.badge.pixel.s-NqZhIhyQsDW2> \"EK\" spans 355..381px",
+   "off screen: <td.num.pixel.s-NqZhIhyQsDW2> \"187\" spans 456..517px",
+   "off screen: <td.s-NqZhIhyQsDW2.online> \"Online\" spans 517..588px",
+   "off screen: <tr.s-NqZhIhyQsDW2.first> \"Vice LeaderElara Moonwhisper MS Master S\" spans 28..588px",
+   "off screen: <td.s-NqZhIhyQsDW2> \"MS Master Sorcerer\" spans 343..456px",
+   "off screen: <span.badge.pixel.s-NqZhIhyQsDW2> \"MS\" spans 355..383px",
+   "off screen: <td.num.pixel.s-NqZhIhyQsDW2> \"132\" spans 456..517px",
+   "off screen: <td.s-NqZhIhyQsDW2> \"Offline\" spans 517..588px",
+   "off screen: <tr.s-NqZhIhyQsDW2.first> \"MemberDruidess Fernleaf (Leafy)D Druid98\" spans 28..588px",
+   "off screen: <td.s-NqZhIhyQsDW2> \"D Druid\" spans 343..456px",
+   "off screen: <span.badge.pixel.s-NqZhIhyQsDW2> \"D\" spans 355..374px",
+   "off screen: <td.num.pixel.s-NqZhIhyQsDW2> \"98\" spans 456..517px",
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
      - link "Guilds" [ref=e38] [cursor=pointer]:
        - /url: /guilds
      - text: › Knights of the Eternal Twilight
    - region [ref=e39]:
      - heading "Knights of the Eternal Twilight" [level=1] [ref=e41]
      - generic [ref=e42]:
        - paragraph [ref=e43]: Hunt on Saturday at the Thais depot.
        - paragraph [ref=e44]: We are a friendly guild of adventurers from all over the world. Everyone above level 50 is welcome; ask any vice leader for an invite.
        - paragraph [ref=e45]:
          - text: Founded 30 Oct 2026, led by
          - link "Sir Bartholomew Longname" [ref=e46] [cursor=pointer]:
            - /url: /characters/Sir%20Bartholomew%20Longname
          - text: .
    - generic [ref=e47]:
      - generic [ref=e48]:
        - generic [ref=e49]: Members
        - generic [ref=e50]: "3"
      - generic [ref=e51]:
        - generic [ref=e52]: Online
        - generic [ref=e53]: "1"
      - generic [ref=e54]:
        - generic [ref=e55]: Average level
        - generic [ref=e56]: "139"
      - generic [ref=e57]:
        - generic [ref=e58]: Top level
        - generic [ref=e59]: "187"
    - region [ref=e60]:
      - heading "Members" [level=2] [ref=e62]
      - table [ref=e64]:
        - rowgroup [ref=e65]:
          - row [ref=e66]:
            - columnheader "Rank" [ref=e67]
            - columnheader "Name" [ref=e68]
            - columnheader "Vocation" [ref=e69]
            - columnheader "Level" [ref=e70]
            - columnheader "Status" [ref=e71]
        - rowgroup [ref=e72]:
          - row [ref=e73]:
            - cell "Grand Commander" [ref=e74]
            - cell [ref=e75]:
              - link "Sir Bartholomew Longname" [ref=e76] [cursor=pointer]:
                - /url: /characters/Sir%20Bartholomew%20Longname
              - text: (The Unbreakable)
            - cell "EK Elite Knight" [ref=e77]
            - cell "187" [ref=e78]
            - cell "Online" [ref=e79]
          - row [ref=e80]:
            - cell "Vice Leader" [ref=e81]
            - cell [ref=e82]:
              - link "Elara Moonwhisper" [ref=e83] [cursor=pointer]:
                - /url: /characters/Elara%20Moonwhisper
            - cell "MS Master Sorcerer" [ref=e84]
            - cell "132" [ref=e85]
            - cell "Offline" [ref=e86]
          - row [ref=e87]:
            - cell "Member" [ref=e88]
            - cell [ref=e89]:
              - link "Druidess Fernleaf" [ref=e90] [cursor=pointer]:
                - /url: /characters/Druidess%20Fernleaf
              - text: (Leafy)
            - cell "D Druid" [ref=e91]
            - cell "98" [ref=e92]
            - cell "Offline" [ref=e93]
    - region [ref=e94]:
      - heading "Your characters" [level=2] [ref=e96]
      - generic [ref=e97]:
        - generic [ref=e98]:
          - generic [ref=e99]:
            - strong [ref=e100]: Sir Bartholomew Longname
            - text: is a member.
          - button "Leave the guild" [ref=e101] [cursor=pointer]
        - generic [ref=e102]:
          - generic [ref=e103]:
            - strong [ref=e104]: Elara Moonwhisper
            - text: is a member.
          - button "Leave the guild" [ref=e105] [cursor=pointer]
        - paragraph [ref=e106]: Guild changes show in the game after the character's next login.
    - region [ref=e107]:
      - heading "Manage the guild" [level=2] [ref=e109]
      - generic [ref=e110]:
        - generic [ref=e111]:
          - generic [ref=e112]:
            - text: Invite a character
            - textbox "Invite a character" [ref=e113]
          - button "Invite" [ref=e114] [cursor=pointer]
        - generic [ref=e115]:
          - generic [ref=e116]: "Invited:"
          - generic [ref=e117]:
            - text: Quickshot Hawkeye
            - button "×" [ref=e118] [cursor=pointer]
        - generic [ref=e119]:
          - generic [ref=e120]:
            - text: Member
            - combobox "Member" [ref=e121]:
              - option "Sir Bartholomew Longname" [selected]
              - option "Elara Moonwhisper"
              - option "Druidess Fernleaf"
          - generic [ref=e122]:
            - text: Title
            - textbox "Title" [ref=e123]
          - button "Set title" [ref=e124] [cursor=pointer]
        - generic [ref=e125]:
          - generic [ref=e126]:
            - text: Member
            - combobox "Member" [ref=e127]:
              - option "Elara Moonwhisper" [selected]
              - option "Druidess Fernleaf"
          - generic [ref=e128]:
            - text: Rank
            - combobox "Rank" [ref=e129]:
              - option "Vice Leader" [selected]
              - option "a Vice-Leader"
              - option "Member"
              - option "a Member"
          - button "Set rank" [ref=e130] [cursor=pointer]
        - generic [ref=e131]:
          - generic [ref=e132]:
            - text: Member
            - combobox "Member" [ref=e133]:
              - option "Elara Moonwhisper" [selected]
              - option "Druidess Fernleaf"
          - button "Remove from the guild" [ref=e134] [cursor=pointer]
        - generic [ref=e135]:
          - generic [ref=e136]:
            - text: Message of the day (shown in the game)
            - textbox "Message of the day (shown in the game)" [ref=e137]: Hunt on Saturday at the Thais depot.
          - generic [ref=e138]:
            - text: About the guild (this page)
            - textbox "About the guild (this page)" [ref=e139]: We are a friendly guild of adventurers from all over the world. Everyone above level 50 is welcome; ask any vice leader for an invite.
          - button "Save the texts" [ref=e141] [cursor=pointer]
        - generic [ref=e142]:
          - generic [ref=e143]:
            - text: Rank 3
            - textbox "Rank 3" [ref=e144]: Grand Commander
          - generic [ref=e145]:
            - text: Rank 3
            - textbox "Rank 3" [ref=e146]: the Leader
          - generic [ref=e147]:
            - text: Rank 2
            - textbox "Rank 2" [ref=e148]: Vice Leader
          - generic [ref=e149]:
            - text: Rank 2
            - textbox "Rank 2" [ref=e150]: a Vice-Leader
          - generic [ref=e151]:
            - text: Rank 1
            - textbox "Rank 1" [ref=e152]: Member
          - generic [ref=e153]:
            - text: Rank 1
            - textbox "Rank 1" [ref=e154]: a Member
          - button "Rename ranks" [ref=e155] [cursor=pointer]
        - generic [ref=e156]:
          - generic [ref=e157]:
            - text: New leader
            - combobox "New leader" [ref=e158]:
              - option "Elara Moonwhisper" [selected]
              - option "Druidess Fernleaf"
          - button "Hand over" [ref=e159] [cursor=pointer]
        - generic [ref=e160]:
          - generic [ref=e161]:
            - text: "Disband: type “Knights of the Eternal Twilight” to confirm"
            - 'textbox "Disband: type “Knights of the Eternal Twilight” to confirm" [ref=e162]'
          - button "Disband the guild" [ref=e163] [cursor=pointer]
  - contentinfo [ref=e164]:
    - generic [ref=e165]:
      - generic [ref=e166]: Elderwood · A fan-run server, not affiliated with CipSoft.
      - navigation "Footer" [ref=e167]:
        - link "Rules" [ref=e168] [cursor=pointer]:
          - /url: /rules
        - link "Houses" [ref=e169] [cursor=pointer]:
          - /url: /houses
        - link "Latest deaths" [ref=e170] [cursor=pointer]:
          - /url: /deaths
        - link "Support" [ref=e171] [cursor=pointer]:
          - /url: /support
        - link "Privacy" [ref=e172] [cursor=pointer]:
          - /url: /privacy
      - generic [ref=e173]:
        - generic [ref=e174]: Colours
        - combobox "Colours" [ref=e175]:
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
      |                                                                             ^ Error: /guilds/Knights%20of%20the%20Eternal%20Twilight fits 360px
  168 | 				});
  169 | 			}
  170 | 		});
  171 | 	}
  172 | }
  173 | 
```