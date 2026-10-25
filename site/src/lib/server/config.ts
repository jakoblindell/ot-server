import { env } from '$env/dynamic/private';

// Settings from the environment (see deploy/docker-compose.yml)
export const config = {
	serverName: env.SERVER_NAME || 'Elderwood',
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
	/** Cloudflare Turnstile; without keys the check is skipped (development) */
	turnstile: { siteKey: env.TURNSTILE_SITE_KEY || '', secret: env.TURNSTILE_SECRET || '' },
	/** Cookies only over HTTPS (off for plain-HTTP local development) */
	secureCookies: env.SECURE_COOKIES !== 'false'
};
