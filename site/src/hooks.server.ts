import type { Handle, ServerInit } from '@sveltejs/kit';
import { deleteDueCharacters } from '$lib/server/accounts';
import { migrate } from '$lib/server/migrate';
import { getSessionAccount, removeExpiredSessions } from '$lib/server/sessions';
import { getSettings } from '$lib/server/settings';
import { findTheme, THEME_COOKIE, themeIds } from '$lib/themes';


export const init: ServerInit = async () => {
	await migrate();
	const cleanUp = async () => {
		await removeExpiredSessions();
		await deleteDueCharacters();
	};
	await cleanUp();
	setInterval(() => cleanUp().catch(console.error), 3600_000).unref();
};

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.account = await getSessionAccount(event.cookies);

	// The scheme from ?theme= (remembered) or the cookie, else the default
	const asked = event.url.searchParams.get('theme');
	if (asked && findTheme(asked)) {
		event.cookies.set(THEME_COOKIE, asked, { path: '/', httpOnly: false, sameSite: 'lax', secure: false, maxAge: 365 * 24 * 3600 });
	}
	const chosen = asked ?? event.cookies.get(THEME_COOKIE);
	event.locals.theme = chosen && themeIds.includes(chosen) ? chosen : (await getSettings()).defaultTheme;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%theme%', event.locals.theme)
	});
};
