# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> 393px, player >> /highscores
- Location: tests/layout.spec.ts:159:5

# Error details

```
Error: /highscores fits 393px

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 27

- Array []
+ Array [
+   "the page scrolls sideways: 1003px wide on a 393px screen",
+   "off screen: <aside.filters.s-V6yibiwVlv2n> \"Highscores ExperienceMagic levelFist fig\" spans 16..1003px",
+   "off screen: <nav.panel.s-V6yibiwVlv2n> \"Highscores ExperienceMagic levelFist fig\" spans 16..1003px",
+   "off screen: <a.s-V6yibiwVlv2n> \"Club fighting\" spans 337..452px",
+   "off screen: <a.s-V6yibiwVlv2n> \"Sword fighting\" spans 452..577px",
+   "off screen: <a.s-V6yibiwVlv2n> \"Axe fighting\" spans 577..686px",
+   "off screen: <a.s-V6yibiwVlv2n> \"Distance fighting\" spans 686..827px",
+   "off screen: <a.s-V6yibiwVlv2n> \"Shielding\" spans 827..918px",
+   "off screen: <a.s-V6yibiwVlv2n> \"Fishing\" spans 918..994px",
+   "scrolls sideways: <div.scroll.s-V6yibiwVlv2n> \"RankNameVocationLevelExperience1Sir Bart\" is 544px in 361px",
+   "off screen: <table.table.s-V6yibiwVlv2n> \"RankNameVocationLevelExperience1Sir Bart\" spans 28..548px",
+   "off screen: <thead.s-V6yibiwVlv2n> \"RankNameVocationLevelExperience\" spans 28..548px",
+   "off screen: <tr.s-V6yibiwVlv2n> \"RankNameVocationLevelExperience\" spans 28..548px",
+   "off screen: <th.num.s-V6yibiwVlv2n> \"Level\" spans 353..414px",
+   "off screen: <th.num.s-V6yibiwVlv2n> \"Experience\" spans 414..548px",
+   "off screen: <tbody.s-V6yibiwVlv2n> \"1Sir Bartholomew LongnameEK Elite Knight\" spans 28..548px",
+   "off screen: <tr.s-V6yibiwVlv2n> \"1Sir Bartholomew LongnameEK Elite Knight\" spans 28..548px",
+   "off screen: <td.num.pixel.s-V6yibiwVlv2n> \"187\" spans 353..414px",
+   "off screen: <td.num.pixel.s-V6yibiwVlv2n> \"1,080,000,000\" spans 414..548px",
+   "off screen: <tr.s-V6yibiwVlv2n> \"2Elara MoonwhisperMS Master Sorcerer1323\" spans 28..548px",
+   "off screen: <td.num.pixel.s-V6yibiwVlv2n> \"132\" spans 353..414px",
+   "off screen: <td.num.pixel.s-V6yibiwVlv2n> \"380,000,000\" spans 414..548px",
+   "off screen: <tr.s-V6yibiwVlv2n> \"3Quickshot HawkeyeRP Royal Paladin104180\" spans 28..548px",
+   "off screen: <td.num.pixel.s-V6yibiwVlv2n> \"104\" spans 353..414px",
+   "off screen: <td.num.pixel.s-V6yibiwVlv2n> \"180,000,000\" spans 414..548px",
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
    - complementary [ref=e37]:
      - navigation "Highscore lists" [ref=e38]:
        - link "Experience" [ref=e39] [cursor=pointer]:
          - /url: "?category=experience&vocation=all"
        - link "Magic level" [ref=e40] [cursor=pointer]:
          - /url: "?category=magic&vocation=all"
        - link "Fist fighting" [ref=e41] [cursor=pointer]:
          - /url: "?category=fist&vocation=all"
        - link "Club fighting" [ref=e42] [cursor=pointer]:
          - /url: "?category=club&vocation=all"
        - link "Sword fighting" [ref=e43] [cursor=pointer]:
          - /url: "?category=sword&vocation=all"
        - link "Axe fighting" [ref=e44] [cursor=pointer]:
          - /url: "?category=axe&vocation=all"
        - link "Distance fighting" [ref=e45] [cursor=pointer]:
          - /url: "?category=distance&vocation=all"
        - link "Shielding" [ref=e46] [cursor=pointer]:
          - /url: "?category=shielding&vocation=all"
        - link "Fishing" [ref=e47] [cursor=pointer]:
          - /url: "?category=fishing&vocation=all"
    - region [ref=e48]:
      - generic [ref=e49]:
        - heading "Experience" [level=1] [ref=e50]
        - generic [ref=e51]:
          - generic [ref=e52]: Vocation
          - combobox "Vocation" [ref=e53]:
            - option "All vocations" [selected]
            - option "Knights"
            - option "Paladins"
            - option "Sorcerers"
            - option "Druids"
            - option "No vocation"
      - table [ref=e55]:
        - rowgroup [ref=e56]:
          - row [ref=e57]:
            - columnheader "Rank" [ref=e58]
            - columnheader "Name" [ref=e59]
            - columnheader "Vocation" [ref=e60]
            - columnheader "Level" [ref=e61]
            - columnheader "Experience" [ref=e62]
        - rowgroup [ref=e63]:
          - row [ref=e64]:
            - cell "1" [ref=e65]
            - cell [ref=e66]:
              - link "Sir Bartholomew Longname" [ref=e67] [cursor=pointer]:
                - /url: /characters/Sir%20Bartholomew%20Longname
            - cell "EK Elite Knight" [ref=e68]
            - cell "187" [ref=e69]
            - cell "1,080,000,000" [ref=e70]
          - row [ref=e71]:
            - cell "2" [ref=e72]
            - cell [ref=e73]:
              - link "Elara Moonwhisper" [ref=e74] [cursor=pointer]:
                - /url: /characters/Elara%20Moonwhisper
            - cell "MS Master Sorcerer" [ref=e75]
            - cell "132" [ref=e76]
            - cell "380,000,000" [ref=e77]
          - row [ref=e78]:
            - cell "3" [ref=e79]
            - cell [ref=e80]:
              - link "Quickshot Hawkeye" [ref=e81] [cursor=pointer]:
                - /url: /characters/Quickshot%20Hawkeye
            - cell "RP Royal Paladin" [ref=e82]
            - cell "104" [ref=e83]
            - cell "180,000,000" [ref=e84]
          - row [ref=e85]:
            - cell "4" [ref=e86]
            - cell [ref=e87]:
              - link "Druidess Fernleaf" [ref=e88] [cursor=pointer]:
                - /url: /characters/Druidess%20Fernleaf
            - cell "D Druid" [ref=e89]
            - cell "98" [ref=e90]
            - cell "150,000,000" [ref=e91]
          - row [ref=e92]:
            - cell "5" [ref=e93]
            - cell [ref=e94]:
              - link "Grumbold Axebeard" [ref=e95] [cursor=pointer]:
                - /url: /characters/Grumbold%20Axebeard
            - cell "K Knight" [ref=e96]
            - cell "85" [ref=e97]
            - cell "95,000,000" [ref=e98]
          - row [ref=e99]:
            - cell "6" [ref=e100]
            - cell [ref=e101]:
              - link "Archmage Vel" [ref=e102] [cursor=pointer]:
                - /url: /characters/Archmage%20Vel
            - cell "S Sorcerer" [ref=e103]
            - cell "61" [ref=e104]
            - cell "36,000,000" [ref=e105]
          - row [ref=e106]:
            - cell "7" [ref=e107]
            - cell [ref=e108]:
              - link "Paladin Sarah" [ref=e109] [cursor=pointer]:
                - /url: /characters/Paladin%20Sarah
            - cell "P Paladin" [ref=e110]
            - cell "40" [ref=e111]
            - cell "9,000,000" [ref=e112]
          - row [ref=e113]:
            - cell "8" [ref=e114]
            - cell [ref=e115]:
              - link "Tiny Tim" [ref=e116] [cursor=pointer]:
                - /url: /characters/Tiny%20Tim
            - cell "RK No vocation" [ref=e117]
            - cell "8" [ref=e118]
            - cell "4,200" [ref=e119]
      - navigation "Pages" [ref=e120]:
        - generic [ref=e121]: Page 1 of 1
  - contentinfo [ref=e122]:
    - generic [ref=e123]:
      - generic [ref=e124]: Elderwood · A fan-run server, not affiliated with CipSoft.
      - navigation "Footer" [ref=e125]:
        - link "Rules" [ref=e126] [cursor=pointer]:
          - /url: /rules
        - link "Houses" [ref=e127] [cursor=pointer]:
          - /url: /houses
        - link "Latest deaths" [ref=e128] [cursor=pointer]:
          - /url: /deaths
        - link "Support" [ref=e129] [cursor=pointer]:
          - /url: /support
        - link "Privacy" [ref=e130] [cursor=pointer]:
          - /url: /privacy
      - generic [ref=e131]:
        - generic [ref=e132]: Colours
        - combobox "Colours" [ref=e133]:
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
      |                                                                             ^ Error: /highscores fits 393px
  168 | 				});
  169 | 			}
  170 | 		});
  171 | 	}
  172 | }
  173 | 
```