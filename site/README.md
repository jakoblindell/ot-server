# Website

SvelteKit (Svelte 5, TypeScript) with server-side rendering, reading the game
database. Deployed as the `site` service of `deploy/docker-compose.yml`,
behind Caddy (the browser client is served next to it on `/play/`).

## Develop

```sh
cd site
npm install
DB_HOST=localhost DB_USER=... DB_PASSWORD=... DB_NAME=sabrehaven \
  GAME_HOST=127.0.0.1 SECURE_COOKIES=false npm run dev
npm run check   # types and Svelte diagnostics
```

Settings come from the environment (`src/lib/server/config.ts`). On startup
the SQL files in `migrations/` that have not run yet are applied in name
order (recorded in `site_migrations`).

## Layout

- `src/lib/themes.ts`: the colour schemes. Every colour is a token (CSS
  variable); players switch schemes in the footer, `DEFAULT_THEME` (later a
  staff setting) picks the default.
- `src/app.css`: the shared pieces of the design (parchment cards, buttons,
  forms, status strip, tables).
- `src/lib/server/`: database, sessions, passwords (same format as the game
  server, `src/passwords.cpp`), server status.

## Phones

Every page has to fit a phone (393 px, 360 px) without scrolling sideways.
The shared pieces for that, in `src/app.css`:

- `.scroll-row` with `use:scrollRow` (`src/lib/scrollrow.ts`): a row of tabs
  or chips that scrolls sideways on narrow screens and fades out at the edge
  with more to show (highscore lists, account and admin menus, filters).
- `table.table.stack`: on phones each row keeps its key cells on the first
  line (`main` takes the free width, `end` sits on the right) and puts the
  `more` cells on a second line, labelled with `data-label`.
- `table.cards` with `use:cardLabels` (`src/lib/cardlabels.ts`): admin tables
  become one small card per row on phones, the column names as labels.
- A `.card-head` wraps its title and control onto two lines when needed.

## Layout check

`tests/layout.spec.ts` (Playwright) opens every page at 393 px and 360 px,
logged out, as a player and as a god, and fails when the page scrolls
sideways, a box cuts off its content, or something sticks out of the screen.
Rows that scroll on purpose carry `data-scroll-x`. CI runs it on pull
requests (`.github/workflows/site-layout.yml`). Locally, on a throwaway
database:

```sh
# the game schemas, as deploy/docker-compose.yml loads them
for f in ../sabrehaven.sql ../deploy/db/02-znote-schema.sql ../sabrehaven_znote.sql ../deploy/db/04-powergamers.sql; do
  mariadb layouttest < "$f"; done
tests/game-files.sh /tmp/layout-files         # server files and dumps for the admin pages
npm run build
DB_NAME=layouttest ... GAME_FILES=/tmp/layout-files BACKUPS_DIR=/tmp/layout-files/backups \
  SECURE_COOKIES=false ORIGIN=http://localhost:3000 node build &   # applies the migrations
mariadb layouttest < tests/seed.sql           # test data and two logged-in sessions
npx playwright install chromium               # once
BASE_URL=http://localhost:3000 npx playwright test
```
