import { fail } from '@sveltejs/kit';
import { addFreePremiumDay, cancelDeletion, DELETION_DAYS, FREE_PREMIUM_HOURS, scheduleDeletion, setShowCharacters, siteAccount } from '$lib/server/accounts';
import { execute, query, queryOne } from '$lib/server/db';
import { emailVerified, mailEnabled, sendVerification } from '$lib/server/mail';
import { characterNameError } from '$lib/server/names';
import { vocationBadge, vocationName } from '$lib/server/game';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const account = locals.account!;
	const characters = await query<{ name: string; level: number; vocation: number; online: number; deletion: number; namelocked: number }>(
		`SELECT p.name, p.level, p.vocation, p.deletion, (o.player_id IS NOT NULL) AS online,
			EXISTS (SELECT 1 FROM player_namelocks n WHERE n.player_id = p.id) AS namelocked
		 FROM players p LEFT JOIN players_online o ON o.player_id = p.id
		 WHERE p.account_id = :id ORDER BY p.name`,
		{ id: account.id }
	);
	const logins = await query<{ created_at: Date; ip: string; success: number }>(
		'SELECT created_at, ip, success FROM site_login_history WHERE account_id = :id ORDER BY id DESC LIMIT 5',
		{ id: account.id }
	);
	const site = await siteAccount(account.id);
	const nextFreePremium = site?.free_premium_at ? site.free_premium_at.getTime() + FREE_PREMIUM_HOURS * 3600_000 : 0;
	return {
		welcome: url.searchParams.has('welcome'),
		characters: characters.map((character) => ({
			name: character.name,
			level: character.level,
			vocation: vocationName(character.vocation),
			badge: vocationBadge(character.vocation),
			online: !!character.online,
			namelocked: !!character.namelocked,
			deletesAt: character.deletion ? character.deletion * 1000 : 0
		})),
		logins: logins.map((login) => ({ at: login.created_at.getTime(), ip: login.ip, success: !!login.success })),
		hasRecoveryKey: !!site?.recovery_key_created,
		mail: mailEnabled(),
		emailVerified: await emailVerified(account.id),
		showCharacters: !!site?.show_characters,
		freePremiumAt: nextFreePremium > Date.now() ? nextFreePremium : 0,
		deletionDays: DELETION_DAYS
	};
};

export const actions: Actions = {
	premium: async ({ locals }) => {
		if (!(await addFreePremiumDay(locals.account!.id))) {
			return fail(400, { message: 'You already took your free premium day. Come back tomorrow.' });
		}
		return { message: 'One day of premium added. Enjoy!' };
	},
	delete: async ({ locals, request }) => {
		const name = String((await request.formData()).get('name') ?? '');
		if (!(await scheduleDeletion(locals.account!.id, name))) {
			return fail(400, { message: `${name} cannot be deleted right now (log out of the game first).` });
		}
		return { message: `${name} will be deleted in ${DELETION_DAYS} days. You can still cancel that.` };
	},
	verify: async ({ locals }) => {
		const account = locals.account!;
		if (!account.email) return fail(400, { message: 'Add an email address first.' });
		const sent = await sendVerification(account.id, account.name, account.email).catch(() => false);
		return { message: sent ? `We sent a confirmation link to ${account.email}.` : 'Email is not available on this server.' };
	},
	comment: async ({ locals, request }) => {
		const form = await request.formData();
		const name = String(form.get('name') ?? '');
		const comment = String(form.get('comment') ?? '').replace(/\s+/g, ' ').trim().slice(0, 255);
		const player = await queryOne<{ id: number }>('SELECT id FROM players WHERE name = :name AND account_id = :account', {
			name,
			account: locals.account!.id
		});
		if (!player) return fail(400, { message: 'Pick one of your characters.' });
		// znote_players has no unique key on player_id: update, or add the row
		const updated = await execute('UPDATE znote_players SET comment = :comment WHERE player_id = :id', { id: player.id, comment });
		if (!updated.affectedRows) {
			await execute("INSERT INTO znote_players (player_id, created, hide_char, comment) VALUES (:id, UNIX_TIMESTAMP(), 0, :comment)", {
				id: player.id,
				comment
			});
		}
		return { message: comment ? `Comment of ${name} saved.` : `Comment of ${name} removed.` };
	},
	visibility: async ({ locals, request }) => {
		const show = (await request.formData()).get('show') === '1';
		await setShowCharacters(locals.account!.id, show);
		return {
			message: show ? 'Your characters now list each other on their pages.' : 'Your characters no longer list each other.'
		};
	},
	rename: async ({ locals, request }) => {
		const form = await request.formData();
		const name = String(form.get('name') ?? '');
		const newName = String(form.get('newName') ?? '').trim();
		const locked = await queryOne<{ id: number }>(
			`SELECT p.id FROM players p JOIN player_namelocks n ON n.player_id = p.id WHERE p.name = :name AND p.account_id = :account`,
			{ name, account: locals.account!.id }
		);
		if (!locked) return fail(400, { message: `${name} does not need a new name.` });
		const error = await characterNameError(newName);
		if (error) return fail(400, { message: error });
		await execute('UPDATE players SET name = :newName WHERE id = :id', { newName, id: locked.id });
		await execute('DELETE FROM player_namelocks WHERE player_id = :id', { id: locked.id });
		return { message: `${name} is now called ${newName} and can log in again.` };
	},
	cancelDeletion: async ({ locals, request }) => {
		const name = String((await request.formData()).get('name') ?? '');
		await cancelDeletion(locals.account!.id, name);
		return { message: `${name} will not be deleted.` };
	}
};
