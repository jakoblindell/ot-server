# Going live: the first production deploy

The steps, in order, for putting the game on a real host for the first time.
Background for each step is in [README.md](README.md); this is the
checklist. Tick things off as you go.

## 1. Decide and gather (before you touch a server)

- [ ] **Domain:** for example `play.example.com`. You need to be able to set
      its DNS.
- [ ] **Host:** a Linux VM (x86-64) with at least 4 vCPU and 8 GB RAM, for
      example a Hetzner Cloud CX32. The game server alone uses about 1.6 GB
      with nobody online. Staging (#33) gets its own machine later.
- [ ] **Cloudflare in front, or not?**
  - Behind Cloudflare: login port 2053 (or 2083, 2087, 2096, 8443), and
    `TRUSTED_PROXIES=cloudflare`. See "Behind Cloudflare" in the README.
  - Without Cloudflare: login port 7171 and an empty `TRUSTED_PROXIES`.
- [ ] **Cloudflare Turnstile keys,** so sign-ups need a human (free:
      Cloudflare dashboard > Turnstile > Add site, for the domain).
- [ ] **Email (optional):** an SMTP account for address confirmation and
      "email me a link". Without one, players use recovery keys.
- [ ] **Discord invite and support email,** shown on the website (optional).
- [ ] **Where the Taskmaster stands** (see step 8).
- [ ] **Somewhere off the host** for backup copies (another machine, object
      storage, or the host's snapshots), and a **password manager** for the
      login key.

## 2. Prepare the host

- [ ] **OS:** Ubuntu LTS (or Debian), with security updates on
      (`unattended-upgrades`).
- [ ] **SSH:** key login only (`PasswordAuthentication no`) and no root
      password login. Use a normal user with `sudo`.
- [ ] **Firewall:** open only 22 (SSH), 80, 443 and the login port. The game
      ports 7171/7172 inside Docker are not published; only Caddy is.
- [ ] **Docker** with the Compose plugin (`docker compose version` works).
- [ ] **DNS:** an A record for the domain pointing at the host's IPv4
      address (proxied through Cloudflare, if you chose that).
- [ ] **The repository:**
      `git clone https://github.com/jakoblindell/ot-server.git && cd ot-server && git checkout web-client-792`

## 3. Configure (`deploy/.env`)

```sh
cd deploy
cp .env.example .env
```

Set at least these:

| Setting | Value |
|---|---|
| `DOMAIN` | the domain, e.g. `play.example.com` |
| `TLS` | your email address (Caddy gets a Let's Encrypt certificate) |
| `LOGIN_PORT` | `7171`, or `2053` behind Cloudflare |
| `TRUSTED_PROXIES` | empty, or `cloudflare` |
| `DB_PASSWORD` | long and random: `openssl rand -base64 24` |
| `PUBLIC_IP` | the host's IPv4 address |
| `SERVER_NAME` | the world's name |
| `TZ` | the time zone of the daily server save at 08:00 |
| `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET` | from step 1 |
| `SMTP_*`, `DISCORD_URL`, `SUPPORT_EMAIL` | if you have them |

`.env` holds passwords: keep it on the host (it's ignored by git) and
`chmod 600 .env`.

## 4. The login key

```sh
sudo ./rsa-key.sh
```

- This creates `deploy/secrets/rsa-key.pem` (private) and `rsa-public.js`
  (its public half, served to the client). See "The login key" in the README.
- [ ] **Copy the contents of `rsa-key.pem` into the password manager now.**
      It's a plain PEM file; anyone with it can decrypt logins. If it is
      lost, make a new one with this script and everyone reloads the page.

## 5. Start

```sh
docker compose up -d --build     # first build: several minutes
docker compose logs -f server    # wait for "Server Online!"
```

If the server stops at startup, the last lines of the log say why:

- **"Missing file /run/secrets/rsa_key"** or **"RSA private key is not valid":**
  the key file is missing or unreadable. Check `ls -ln deploy/secrets/`: the
  key must be owned by uid 1000, mode 600. Run `rsa-key.sh` again if needed.
- **"The login RSA key is the public OpenTibia development key":** the
  server got the repository's key instead of ours. Check that
  `deploy/config.lua` sets `rsaKeyFile` to `/run/secrets/rsa_key`.
- **A database error:** check `DB_PASSWORD`, and `docker compose logs db`.

## 6. Check that everything works

- [ ] `https://<domain>/` shows the website, with a valid certificate (no
      browser warning).
- [ ] `https://<domain>/play/rsa-public.js` shows
      `window.otclientConfig.rsaPublicKey = "…"`, a long number.
- [ ] **Create an account** on the website. The Turnstile check appears, and
      the confirmation email arrives if SMTP is set.
- [ ] **Play now:** the client loads, you log in, make a character and walk
      around.
- [ ] **Desktop clients are refused:** a 7.92 desktop client (or any non-web
      client) gets "This world is played in the browser: https://<domain>"
      (`webClientOnly`, #38).
- [ ] **The Taskmaster** answers `hi` and `task` (wherever you placed it,
      step 8).
- [ ] **Backups:** a first dump appears in `deploy/backups/` within
      `BACKUP_INTERVAL_HOURS`. For one right now:
      `docker compose exec backup /backup.sh now`.
- [ ] **Restart test:** `docker compose restart server`. Players are saved and
      logged out, and the server comes back (`docker compose logs -f server`).

## 7. The first staff account

```sh
./make-staff.sh <your-account> god
```

Log in on the website, turn on **two-step login** on the account page (the
admin pages need it), and open `/admin`. Gods give other accounts roles on
the website. See "Staff and the admin pages" in the README.

## 8. Game content to settle before players arrive

- [ ] **Taskmaster placement:**
  - Every `.npc` file in `data/npc/` is placed at its `Home` when the server
    starts. `taskmaster.npc` currently has `Home = [32369,32241,7]`, the
    **Thais temple**.
  - Decide where it stands (the bigger free-account cities, for example).
    For more than one city, copy the file (`taskmaster-carlin.npc`, …) and
    give each copy its own `Name`, if they should differ, and its own `Home`.
  - Edit the files on the website (Server files) or in the repository; the
    next restart places them.
- [ ] **Daily hunts and hunting tasks:** check `data/lib/tasks/` (hunts, kill
      counts, boxes, premium areas, hunting tasks and ranks). The test tasks
      (rotworms, trolls, orcs) are only examples.
- [ ] **Rates and world:** `config.lua` (Config & rates on the website):
      experience stages, loot rate, `worldType`, `freePremium`, the MOTD.
- [ ] **Test characters and GM accounts** from development don't exist on a
      fresh database. Make the ones you need (`create-account.sh`,
      `make-staff.sh`).

## 9. Off-site backups (do it on day one)

The dumps sit on the same disk as the database. Copy them off the host
regularly, for example nightly with a cron job:

```sh
rsync -a deploy/backups/ backup-user@other-host:elderwood-backups/
# or: rclone sync deploy/backups remote:elderwood-backups
```

- [ ] Off-site copy of `deploy/backups/` set up and tried once.
- [ ] `restore.sh` tried once on a copy (or on staging later), so you know it
      works before you need it.
- [ ] The login key is in the password manager (step 4). `.env` is worth
      keeping there too.

## 10. Afterwards

- **Updates:** `git pull && docker compose up -d --build` (README, "Day to
  day"). A release and deploy pipeline with staging is planned (#33, #34);
  until then, update during quiet hours.
- **Rotating the login key:** README, "The login key".
- **Watching it run:** `docker compose logs -f server`, the admin dashboard,
  and `docker stats` for memory and CPU.
