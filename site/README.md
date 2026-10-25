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
