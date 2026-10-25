import { fail } from '@sveltejs/kit';
import { execute, query, queryOne } from '$lib/server/db';
import { accountTypes } from '$lib/server/game';
import { audit, requireStaff } from '$lib/server/staff';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	await requireStaff(event, 'staff');
	const staff = await query<{ id: number; name: string; type: number; characters: string | null; totp: number }>(
		`SELECT a.id, a.name, a.type,
			(SELECT GROUP_CONCAT(p.name ORDER BY p.level DESC SEPARATOR ', ') FROM players p WHERE p.account_id = a.id) AS characters,
			(SELECT s.totp_enabled_at IS NOT NULL FROM site_accounts s WHERE s.account_id = a.id) AS totp
		 FROM accounts a WHERE a.type > 1 ORDER BY a.type DESC, a.name`
	);
	return { members: staff.map((member) => ({ ...member, totp: !!member.totp, role: accountTypes[member.type] ?? String(member.type) })), types: accountTypes };
};

export const actions: Actions = {
	setRole: async (event) => {
		const me = await requireStaff(event, 'staff');
		const form = await event.request.formData();
		const name = String(form.get('account') ?? '').trim();
		const type = Number(form.get('type'));
		if (!(type in accountTypes)) return fail(400, { error: 'Pick a role.' });
		const account = await queryOne<{ id: number; type: number }>('SELECT id, type FROM accounts WHERE name = :name', { name });
		if (!account) return fail(400, { error: `No account named ${name}.` });
		if (account.id === me.id) return fail(400, { error: 'You cannot change your own role.' });
		await execute('UPDATE accounts SET type = :type WHERE id = :id', { type, id: account.id });
		// Gamemasters and gods are in the game's gamemaster/god group too
		const group = type >= 5 ? 3 : type === 4 ? 2 : 1;
		await execute('UPDATE players SET group_id = :group WHERE account_id = :id', { group, id: account.id });
		await audit(event, 'staff.role', `Set ${name} to ${accountTypes[type]}`, { accountId: account.id });
		return { message: `${name} is now ${accountTypes[type]}. It applies at their next login.` };
	}
};
