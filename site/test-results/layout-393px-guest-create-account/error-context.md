# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> 393px, guest >> /create-account
- Location: tests/layout.spec.ts:159:5

# Error details

```
Error: /create-account fits 393px

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "cut off: <div.outfit.s-iaLE1HjCfTIN> shows 124px of 128px",
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
        - link "Log in" [ref=e33] [cursor=pointer]:
          - /url: /login
        - link "Play now" [ref=e34] [cursor=pointer]:
          - /url: /play/
  - main [ref=e36]:
    - form "Create account" [ref=e37]:
      - region [ref=e38]:
        - generic [ref=e39]:
          - generic [ref=e40]: "1"
          - heading "Account details" [level=2] [ref=e41]
        - generic [ref=e42]:
          - generic [ref=e43]:
            - text: Account name
            - textbox "Account name Letters and digits. Used to log in, never shown to other players." [ref=e44]
            - generic [ref=e45]: Letters and digits. Used to log in, never shown to other players.
          - generic [ref=e46]:
            - text: Email
            - textbox "Email For account recovery only." [ref=e47]
            - generic [ref=e48]: For account recovery only.
          - generic [ref=e49]:
            - text: Password
            - textbox "Password" [ref=e50]
          - generic [ref=e57]:
            - text: Repeat password
            - textbox "Repeat password" [ref=e58]
      - region [ref=e59]:
        - generic [ref=e60]:
          - generic [ref=e61]: "2"
          - heading "Your first character" [level=2] [ref=e62]
        - generic [ref=e63]:
          - img "Male citizen outfit" [ref=e65]
          - generic [ref=e66]:
            - generic [ref=e67]:
              - text: Character name
              - textbox "Character name For example \"Aldric\" or \"Mira Stoneheart\"." [ref=e68]
              - generic [ref=e69]: For example "Aldric" or "Mira Stoneheart".
            - group "Sex" [ref=e70]:
              - generic [ref=e72]:
                - radio "Male" [checked] [ref=e73]
                - text: Male
              - generic [ref=e74]:
                - radio "Female" [ref=e75]
                - text: Female
            - paragraph [ref=e76]: Every character starts on Rookgaard. You choose knight, paladin, sorcerer or druid when you reach level 8. You pick your outfit's colours when you first log in.
      - region [ref=e77]:
        - generic [ref=e78]:
          - generic [ref=e79]: "3"
          - heading "Confirm" [level=2] [ref=e80]
        - generic [ref=e81]:
          - generic [ref=e82]:
            - checkbox "I have read and agree to the server rules ." [ref=e83]
            - text: I have read and agree to the
            - link "server rules" [ref=e84] [cursor=pointer]:
              - /url: /rules
            - text: .
          - generic [ref=e85]:
            - button "Create account" [ref=e86] [cursor=pointer]
            - generic [ref=e87]:
              - text: Already playing?
              - link "Log in" [ref=e88] [cursor=pointer]:
                - /url: /login
    - complementary [ref=e89]:
      - generic [ref=e90]:
        - heading "Rules in short" [level=2] [ref=e91]
        - list [ref=e92]:
          - listitem [ref=e93]: No bots, macros or cheat tools.
          - listitem [ref=e94]: Offensive names are renamed or deleted.
          - listitem [ref=e95]: Report bugs. Exploiting them is a ban.
          - listitem [ref=e96]: Be kind to other players and to staff.
        - link "Read the full rules ›" [ref=e97] [cursor=pointer]:
          - /url: /rules
      - generic [ref=e98]:
        - heading "Name rules" [level=2] [ref=e99]
        - paragraph [ref=e100]: 3–20 letters, up to three words, each starting with a capital letter. No numbers, and no names of real people, staff, monsters, NPCs or spells.
  - contentinfo [ref=e101]:
    - generic [ref=e102]:
      - generic [ref=e103]: Elderwood · A fan-run server, not affiliated with CipSoft.
      - navigation "Footer" [ref=e104]:
        - link "Rules" [ref=e105] [cursor=pointer]:
          - /url: /rules
        - link "Houses" [ref=e106] [cursor=pointer]:
          - /url: /houses
        - link "Latest deaths" [ref=e107] [cursor=pointer]:
          - /url: /deaths
        - link "Support" [ref=e108] [cursor=pointer]:
          - /url: /support
        - link "Privacy" [ref=e109] [cursor=pointer]:
          - /url: /privacy
      - generic [ref=e110]:
        - generic [ref=e111]: Colours
        - combobox "Colours" [ref=e112]:
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
      |                                                                             ^ Error: /create-account fits 393px
  168 | 				});
  169 | 			}
  170 | 		});
  171 | 	}
  172 | }
  173 | 
```