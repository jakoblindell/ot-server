import { fail } from '@sveltejs/kit';
import { currentBans, removeNamelock, unbanAccount, unbanIp } from '$lib/server/moderation';
import { audit, requireStaff } from '$lib/server/staff';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	await requireStaff(event, 'punish');
	const bans = await currentBans();
	return {
		accounts: bans.accounts.map((ban) => ({ ...ban, banned_at: ban.banned_at * 1000, expires_at: ban.expires_at * 1000 })),
		ips: bans.ips.map((ban) => ({ ...ban, ip: Number(ban.ip), banned_at: ban.banned_at * 1000, expires_at: ban.expires_at * 1000 })),
		namelocks: bans.namelocks.map((lock) => ({ ...lock, namelocked_at: lock.namelocked_at * 1000 }))
	};
};

export const actions: Actions = {
	unbanAccount: async (event) => {
		await requireStaff(event, 'punish');
		const form = await event.request.formData();
		const accountId = Number(form.get('account'));
		if (!accountId) return fail(400, { error: 'No account.' });
		await unbanAccount(accountId);
		await audit(event, 'punish.unban', `Lifted the ban of account ${form.get('label')}`, { accountId });
		return { message: 'Ban lifted.' };
	},
	unbanIp: async (event) => {
		await requireStaff(event, 'punishHard');
		const form = await event.request.formData();
		await unbanIp(Number(form.get('ip')));
		await audit(event, 'punish.ipunban', `Lifted the IP ban of ${form.get('label')}`);
		return { message: 'IP ban lifted.' };
	},
	unlock: async (event) => {
		await requireStaff(event, 'punish');
		const form = await event.request.formData();
		await removeNamelock(Number(form.get('player')));
		await audit(event, 'punish.unlock', `Removed the namelock of ${form.get('label')}`, { player: String(form.get('label')) });
		return { message: 'Namelock removed.' };
	}
};
