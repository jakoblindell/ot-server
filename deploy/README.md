# Deploying with Docker Compose

Five containers:

| Service | What it is | Reachable from outside |
|---|---|---|
| `db` | MariaDB 11.4 with the Sabrehaven and Znote AAC schemas | no |
| `server` | the game server, built from this repository | no |
| `site` | the website (`site/`, SvelteKit): news, accounts, admin | through `web` |
| `backup` | database dumps into `deploy/backups` | no |
| `web` | Caddy: HTTPS, the website on `/`, the browser client on `/play/`, and `wss://` to the server | 80, 443 and the login port |

The browser client is downloaded from the `web-client-792-latest` release of
`jakoblindell/ot-client` when the `web` image is built. The 7.92 client
assets (`Tibia.dat`/`Tibia.spr`) come from `SabrehavenOTClient/data/things/792`
in this repository and are served next to it.

Tested on Linux (x86-64). The images are multi-arch and the server is built
from source, so Apple Silicon should work the same way, but that has not been
tried yet.

## Run it on your machine

Needs Docker (Docker Desktop, OrbStack or Colima on a Mac).

```sh
cd deploy
cp .env.example .env          # set DB_PASSWORD to something random
docker compose up -d --build  # first build takes a few minutes
docker compose logs -f server # wait for "Server Online!"
./create-account.sh myaccount secret "Your Name" 30
```

Open https://localhost/ for the website, or https://localhost/play/ for the
client, and log in with server `localhost`, port `7171`, client version
`792`, account `myaccount` and password `secret`.

The certificate is self-signed (`TLS=internal`), so the browser warns about
it. Accept the warning for `https://localhost/`, and also open
https://localhost:7171/ once and accept it there, since the login connection
uses that port. (Untested: how the client reports a login connection refused
because of the certificate.) Alternatively trust Caddy's local root
certificate:

```sh
docker compose cp web:/data/caddy/pki/authorities/local/root.crt caddy-root.crt
# macOS: open caddy-root.crt, add it to the System keychain, set it to "Always Trust"
```

## Run it on a server

1. Create a server (for testing, a Hetzner Cloud CX32 or similar: 4 vCPU,
   8 GB RAM; the game server alone uses about 1.6 GB with nobody online).
   Install Docker.
2. Point a DNS name at it, for example `play.example.com`.
3. Open ports 80, 443 and the login port (7171 by default) in the firewall.
4. In `deploy/.env` set `DOMAIN=play.example.com`, `TLS=you@example.com`
   (Caddy then gets a Let's Encrypt certificate), a random `DB_PASSWORD`, and
   `PUBLIC_IP` to the server's IPv4 address.
5. `docker compose up -d --build`, then create accounts as above.

Players open https://play.example.com/ (the website; "Play now" opens the
client at /play/) and log in with server `play.example.com` and the login
port.

### Behind Cloudflare

Cloudflare's proxy forwards WebSockets, but only on some ports. Port 443
works; 7171 does not, so set `LOGIN_PORT=2053` (or 2083, 2087, 2096, 8443)
and have players use that port. Also set `TRUSTED_PROXIES=cloudflare`:
Caddy then takes each player's address from Cloudflare. Without it, every
player looks like one of Cloudflare's servers, and the limits and bans below
would hit many players at once. Use Cloudflare's "Full (strict)" TLS mode;
Caddy still needs to obtain its own certificate, so keep ports 80/443
reachable for that or switch Caddy to a Cloudflare origin certificate.

## Limits and bans

Every player address is checked twice:

- **Caddy** limits new game connections and logins per address
  (`GAME_CONNECTIONS_PER_MINUTE`, `LOGINS_PER_MINUTE`, 30 each by default;
  more get "429 Too Many Requests"). The login limit is also what stops
  password guessing: the game server has no lockout after wrong passwords.
- **The game server** gets the address from Caddy (`X-Real-IP`, trusted
  because `trustForwardedFor` is on and the game ports are not published) and
  applies its IP bans and its connection flood check (more than 5
  connections within moments blocks that address for a few seconds).

The game server also disconnects a connection that sends more than
`MAX_PACKETS_PER_SECOND` packets per second (25 by default, averaged over a
few seconds). Normal play stays far below that, including fast hotkey use; a
modified client flooding the server does not. The browser client reconnects
on its own after such a disconnect, so a false positive costs a player a
moment, not the session.

Players cannot choose the address that is checked: Caddy ignores address
headers from anyone but `TRUSTED_PROXIES`, and the game server only reads
them from the proxy. Tested: a banned address stays banned whatever headers
it sends, another player sending a banned address's headers is not
affected, and through a trusted proxy each player has their own limits.

## Day to day

```sh
docker compose logs -f server                  # server output
docker compose restart server                  # restart the game server
git pull && docker compose up -d --build       # update server and client
docker compose build --no-cache web && docker compose up -d web   # newer client release only
docker compose exec backup /backup.sh now   # extra database backup right now
./restore.sh backups/sabrehaven-YYYYMMDD-HHMMSS.sql.gz   # go back to a backup
```

## Backups

The `backup` service dumps the database into `deploy/backups/` every
`BACKUP_INTERVAL_HOURS` (6) and deletes dumps older than `BACKUP_KEEP_DAYS`
(14). Each dump is a consistent snapshot taken while the game runs, and it
only holds what the server has saved: players are saved when they log out
and at every server save.

`restore.sh` stops the game server, backs up the current state, loads the
chosen dump and starts the server again.

The dumps are on the same disk as the database, which protects against
mistakes and corruption but not against losing the machine. Copy
`deploy/backups/` somewhere else regularly (rsync, rclone or your host's
snapshots). The dumps contain the accounts' password hashes, so keep the
copies private.

## Crashes and restarts

- A crash ends the `server` container and Docker starts it again
  (`restart: unless-stopped`, which also covers a reboot of the machine).
- A server that hangs without crashing is caught by `run-server.sh`: it asks
  the server for its status every 30 seconds and kills it after 4 unanswered
  requests in a row (about 2 minutes), and the container restarts. Progress
  since the last save is lost in that case, as it is in a crash.
- `docker compose stop`/`restart`/`down` and machine shutdowns send SIGTERM,
  which the server handles like `/closeserver`: it saves and logs out
  every player and exits. Compose waits up to 2 minutes for that
  (`stop_grace_period`).

The database lives in the `db-data` volume and survives restarts and
rebuilds. The SQL files under `docker-entrypoint-initdb.d` only run when that
volume is first created; `docker compose down -v` deletes it. When a new file
is added to `deploy/db/`, apply it to an existing database by hand, for
example:

```sh
docker compose exec -T db sh -c 'mariadb -u"$MARIADB_USER" -p"$MARIADB_PASSWORD" "$MARIADB_DATABASE"' < db/04-powergamers.sql
```

## Notes

- Accounts have names (letters and digits). The browser client logs in with
  the name; 7.92 desktop clients can only send numbers, so they can only use
  accounts whose name is a number. Passwords are stored as salted, iterated
  SHA-256 (PBKDF2); accounts that still have an old SHA-1 hash get the new
  one on their next login. On its first start the server widens the
  `accounts` table's `name` and `password` columns for this.

- Game settings (rates, PvP and so on) come from the repository's
  `config.lua`; `deploy/config.lua` only overrides database, network and
  name settings from `.env`. Rebuild the `server` image after changing
  `config.lua`.
- The game ports are not published, so desktop clients cannot connect to
  this setup yet. Publishing them would also require turning off
  `trustForwardedFor`, which this setup relies on to see player addresses
  through the proxy.
- The website keeps its own tables (`site_*`), created and updated by the
  files in `site/migrations` when it starts.
