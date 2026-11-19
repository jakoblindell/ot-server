# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> 360px, guest >> /library/creatures/dragon-lord
- Location: tests/layout.spec.ts:159:5

# Error details

```
Error: /library/creatures/dragon-lord fits 360px

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 27

- Array []
+ Array [
+   "cut off: <section.card.s-3hyhbWf1Uwke> \"Loot a gold coin many Common dragon ham \" shows 328px of 385px",
+   "off screen: <table.table.loot.s-3hyhbWf1Uwke> \"a gold coin many Common dragon ham a few\" spans 44..401px",
+   "off screen: <tbody.s-3hyhbWf1Uwke> \"a gold coin many Common dragon ham a few\" spans 44..401px",
+   "off screen: <tr.s-3hyhbWf1Uwke> \"a gold coin many Common\" spans 44..401px",
+   "off screen: <td.rarity.s-3hyhbWf1Uwke> \"Common\" spans 251..401px",
+   "off screen: <tr.s-3hyhbWf1Uwke> \"dragon ham a few Common\" spans 44..401px",
+   "off screen: <tr.s-3hyhbWf1Uwke> \"a book 1 Uncommon\" spans 44..401px",
+   "off screen: <td.rarity.s-3hyhbWf1Uwke> \"Uncommon\" spans 251..401px",
+   "off screen: <tr.s-3hyhbWf1Uwke> \"a green mushroom 1 Uncommon\" spans 44..401px",
+   "off screen: <tr.s-3hyhbWf1Uwke> \"a power bolt 1 Uncommon\" spans 44..401px",
+   "off screen: <tr.s-3hyhbWf1Uwke> \"a small sapphire 1 Uncommon\" spans 44..401px",
+   "off screen: <tr.s-3hyhbWf1Uwke> \"an energy ring 1 Uncommon\" spans 44..401px",
+   "off screen: <tr.s-3hyhbWf1Uwke> \"a golden mug 1 Semi-rare\" spans 44..401px",
+   "off screen: <td.rarity.s-3hyhbWf1Uwke> \"Semi-rare\" spans 251..401px",
+   "off screen: <tr.s-3hyhbWf1Uwke> \"a red dragon leather 1 Semi-rare\" spans 44..401px",
+   "off screen: <tr.s-3hyhbWf1Uwke> \"a red dragon scale 1 Semi-rare\" spans 44..401px",
+   "off screen: <tr.s-3hyhbWf1Uwke> \"a life crystal 1 Rare\" spans 44..401px",
+   "off screen: <td.rarity.s-3hyhbWf1Uwke> \"Rare\" spans 251..401px",
+   "off screen: <tr.s-3hyhbWf1Uwke> \"a fire sword 1 Very rare\" spans 44..401px",
+   "off screen: <td.rarity.s-3hyhbWf1Uwke> \"Very rare\" spans 251..401px",
+   "off screen: <tr.s-3hyhbWf1Uwke> \"a royal helmet 1 Very rare\" spans 44..401px",
+   "off screen: <tr.s-3hyhbWf1Uwke> \"a strange helmet 1 Very rare\" spans 44..401px",
+   "off screen: <tr.s-3hyhbWf1Uwke> \"a tower shield 1 Very rare\" spans 44..401px",
+   "off screen: <tr.s-3hyhbWf1Uwke> \"a dragon scale mail 1 Extremely rare\" spans 44..401px",
+   "off screen: <td.rarity.s-3hyhbWf1Uwke> \"Extremely rare\" spans 251..401px",
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
    - navigation "Breadcrumbs" [ref=e37]:
      - link "Library" [ref=e38] [cursor=pointer]:
        - /url: /library
      - text: ›
      - link "Creatures" [ref=e39] [cursor=pointer]:
        - /url: /library/creatures
      - text: › Dragon Lord
    - generic [ref=e40]:
      - region [ref=e41]:
        - heading "Dragon Lord" [level=1] [ref=e43]
        - generic [ref=e46]:
          - paragraph [ref=e47]: “ZCHHHHH”
          - paragraph [ref=e48]:
            - generic [ref=e49]: Blood
            - generic [ref=e50]: "Summonable: No"
            - generic [ref=e51]: "Convinceable: No"
          - generic [ref=e52]:
            - generic [ref=e53]:
              - generic [ref=e54]: Toughness
              - generic [ref=e55]: Very tough
            - generic [ref=e56]:
              - generic [ref=e57]: Experience
              - generic [ref=e58]: Very high
            - generic [ref=e59]:
              - generic [ref=e60]: Armor
              - generic [ref=e61]: Heavy
            - generic [ref=e62]:
              - generic [ref=e63]: Speed
              - generic [ref=e64]: Slow
      - region [ref=e65]:
        - heading "Loot" [level=2] [ref=e67]
        - table [ref=e69]:
          - rowgroup [ref=e70]:
            - row [ref=e71]:
              - cell [ref=e72]
              - cell [ref=e73]:
                - link "a gold coin" [ref=e74] [cursor=pointer]:
                  - /url: /library/items/3031
              - cell "many" [ref=e75]
              - cell [ref=e76]
            - row [ref=e83]:
              - cell [ref=e84]
              - cell [ref=e85]:
                - link "dragon ham" [ref=e86] [cursor=pointer]:
                  - /url: /library/items/3583
              - cell "a few" [ref=e87]
              - cell [ref=e88]
            - row [ref=e95]:
              - cell [ref=e96]
              - cell [ref=e97]:
                - link "a book" [ref=e98] [cursor=pointer]:
                  - /url: /library/items/2842
              - cell "1" [ref=e99]
              - cell [ref=e100]
            - row [ref=e107]:
              - cell [ref=e108]
              - cell [ref=e109]:
                - link "a green mushroom" [ref=e110] [cursor=pointer]:
                  - /url: /library/items/3732
              - cell "1" [ref=e111]
              - cell [ref=e112]
            - row [ref=e119]:
              - cell [ref=e120]
              - cell [ref=e121]:
                - link "a power bolt" [ref=e122] [cursor=pointer]:
                  - /url: /library/items/3450
              - cell "1" [ref=e123]
              - cell [ref=e124]
            - row [ref=e131]:
              - cell [ref=e132]
              - cell [ref=e133]:
                - link "a small sapphire" [ref=e134] [cursor=pointer]:
                  - /url: /library/items/3029
              - cell "1" [ref=e135]
              - cell [ref=e136]
            - row [ref=e143]:
              - cell [ref=e144]
              - cell [ref=e145]:
                - link "an energy ring" [ref=e146] [cursor=pointer]:
                  - /url: /library/items/3051
              - cell "1" [ref=e147]
              - cell [ref=e148]
            - row [ref=e155]:
              - cell [ref=e156]
              - cell [ref=e157]:
                - link "a golden mug" [ref=e158] [cursor=pointer]:
                  - /url: /library/items/2903
              - cell "1" [ref=e159]
              - cell [ref=e160]
            - row [ref=e167]:
              - cell [ref=e168]
              - cell [ref=e169]:
                - link "a red dragon leather" [ref=e170] [cursor=pointer]:
                  - /url: /library/items/5948
              - cell "1" [ref=e171]
              - cell [ref=e172]
            - row [ref=e179]:
              - cell [ref=e180]
              - cell [ref=e181]:
                - link "a red dragon scale" [ref=e182] [cursor=pointer]:
                  - /url: /library/items/5882
              - cell "1" [ref=e183]
              - cell [ref=e184]
            - row [ref=e191]:
              - cell [ref=e192]
              - cell [ref=e193]:
                - link "a life crystal" [ref=e194] [cursor=pointer]:
                  - /url: /library/items/3061
              - cell "1" [ref=e195]
              - cell [ref=e196]
            - row [ref=e203]:
              - cell [ref=e204]
              - cell [ref=e205]:
                - link "a fire sword" [ref=e206] [cursor=pointer]:
                  - /url: /library/items/3280
              - cell "1" [ref=e207]
              - cell [ref=e208]
            - row [ref=e215]:
              - cell [ref=e216]
              - cell [ref=e217]:
                - link "a royal helmet" [ref=e218] [cursor=pointer]:
                  - /url: /library/items/3392
              - cell "1" [ref=e219]
              - cell [ref=e220]
            - row [ref=e227]:
              - cell [ref=e228]
              - cell [ref=e229]:
                - link "a strange helmet" [ref=e230] [cursor=pointer]:
                  - /url: /library/items/3373
              - cell "1" [ref=e231]
              - cell [ref=e232]
            - row [ref=e239]:
              - cell [ref=e240]
              - cell [ref=e241]:
                - link "a tower shield" [ref=e242] [cursor=pointer]:
                  - /url: /library/items/3428
              - cell "1" [ref=e243]
              - cell [ref=e244]
            - row [ref=e251]:
              - cell [ref=e252]
              - cell [ref=e253]:
                - link "a dragon scale mail" [ref=e254] [cursor=pointer]:
                  - /url: /library/items/3386
              - cell "1" [ref=e255]
              - cell [ref=e256]
    - complementary [ref=e263]:
      - generic [ref=e264]:
        - heading "Abilities" [level=2] [ref=e266]
        - generic [ref=e267]:
          - list [ref=e268]:
            - listitem [ref=e269]: Fire (strong)
            - listitem [ref=e270]: Firefield
            - listitem [ref=e271]: Fire (strong)
            - listitem [ref=e272]: Healing (defence, moderate)
          - heading "Immune to" [level=3] [ref=e273]
          - paragraph [ref=e274]:
            - generic [ref=e275]: Fire
            - generic [ref=e276]: Lifedrain
            - generic [ref=e277]: Paralyze
            - generic [ref=e278]: Poison
            - generic [ref=e279]: Invisible
      - generic [ref=e280]:
        - heading "Found" [level=2] [ref=e282]
        - list [ref=e284]:
          - listitem [ref=e285]: Around Venore
          - listitem [ref=e286]: Around Liberty Bay
          - listitem [ref=e287]: Around Darashia
          - listitem [ref=e288]: Around Thais
          - listitem [ref=e289]: Around Ankrahmun
          - listitem [ref=e290]: Around Edron
          - listitem [ref=e291]: Around Carlin
          - listitem [ref=e292]: Around Ab'Dendriel
      - generic [ref=e293]:
        - heading "Last 7 days" [level=2] [ref=e295]
        - paragraph [ref=e297]: "Players killed: 1"
  - contentinfo [ref=e298]:
    - generic [ref=e299]:
      - generic [ref=e300]: Elderwood · A fan-run server, not affiliated with CipSoft.
      - navigation "Footer" [ref=e301]:
        - link "Rules" [ref=e302] [cursor=pointer]:
          - /url: /rules
        - link "Houses" [ref=e303] [cursor=pointer]:
          - /url: /houses
        - link "Latest deaths" [ref=e304] [cursor=pointer]:
          - /url: /deaths
        - link "Support" [ref=e305] [cursor=pointer]:
          - /url: /support
        - link "Privacy" [ref=e306] [cursor=pointer]:
          - /url: /privacy
      - generic [ref=e307]:
        - generic [ref=e308]: Colours
        - combobox "Colours" [ref=e309]:
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
      |                                                                             ^ Error: /library/creatures/dragon-lord fits 360px
  168 | 				});
  169 | 			}
  170 | 		});
  171 | 	}
  172 | }
  173 | 
```