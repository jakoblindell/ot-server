import { env } from '$env/dynamic/private';

// Settings from the environment (see deploy/docker-compose.yml)
export const config = {
	serverName: env.SERVER_NAME || 'Elderwood',
	/** Which data/items<version> and data/world<version> the server loads */
	clientVersion: Number(env.CLIENT_VERSION || 792),
	db: {
		host: env.DB_HOST || 'localhost',
		port: Number(env.DB_PORT || 3306),
		user: env.DB_USER || 'sabrehaven',
		password: env.DB_PASSWORD || '',
		database: env.DB_NAME || 'sabrehaven'
	},
	/** The game server, for its status (players online, uptime) */
	gameHost: env.GAME_HOST || 'server',
	statusPort: Number(env.STATUS_PORT || 7171),
	defaultTheme: env.DEFAULT_THEME || 'gold',
	/** When the daily server save restarts the server, server time */
	serverSaveTime: env.SERVER_SAVE_TIME || '08:00',
	timeZone: env.TZ || 'Europe/Stockholm',
	/** The game server's data directory (read-only): monsters, NPCs, spells */
	gameData: env.GAME_DATA || '../data',
	/** The 7.92 client assets (Tibia.dat, Tibia.spr), for outfit pictures */
	gameAssets: env.GAME_ASSETS || '../SabrehavenOTClient/data/things/792',
	/** The game-files volume: the server's editable files (deploy/game-files.sh) */
	gameFiles: env.GAME_FILES || '/srv/game-files',
	/** Database dumps of the backup service (read-only), for the dashboard */
	backupsDir: env.BACKUPS_DIR || '../deploy/backups',
	/** Level a character needs to found a guild */
	guildMinLevel: Number(env.GUILD_MIN_LEVEL || 8),
	/** Level a character needs to comment on news */
	commentMinLevel: Number(env.COMMENT_MIN_LEVEL || 8),
	/** Cloudflare Turnstile; without keys the check is skipped (development) */
	turnstile: { siteKey: env.TURNSTILE_SITE_KEY || '', secret: env.TURNSTILE_SECRET || '' },
	/** The site's public address (links in emails) */
	origin: env.ORIGIN || 'https://localhost',
	/** Outgoing email; without SMTP_HOST no email is sent */
	smtp: {
		host: env.SMTP_HOST || '',
		port: Number(env.SMTP_PORT || 587),
		user: env.SMTP_USER || '',
		password: env.SMTP_PASSWORD || '',
		from: env.SMTP_FROM || ''
	},
	/** Shown on the support page */
	discordUrl: env.DISCORD_URL || '',
	supportEmail: env.SUPPORT_EMAIL || '',
	/** Cookies only over HTTPS (off for plain-HTTP local development) */
	secureCookies: env.SECURE_COOKIES !== 'false'
};
