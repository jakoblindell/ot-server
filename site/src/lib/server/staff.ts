import { error, redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { execute } from './db';
import type { SessionAccount } from './sessions';
import { totpSecret } from './totp';

// Staff: accounts of type gamemaster (4) or god (5). The admin pages need a
// login with two-step login. Gods may do everything; gamemasters what
// looking after players needs.
export const GAMEMASTER = 4;
export const GOD = 5;

export type Permission =
	| 'players' // look up players and accounts, message, kick, teleport, notes
	| 'punish' // mute, ban (up to 30 days), namelock
	| 'punishHard' // permanent bans, IP bans, deleting characters
	| 'news'
	| 'server' // broadcast, save, clean, reload, restart
	| 'staff' // change account types
	| 'files'; // server files and config (#9)

const PERMISSIONS: Record<number, Permission[]> = {
	[GAMEMASTER]: ['players', 'punish', 'news'],
	[GOD]: ['players', 'punish', 'punishHard', 'news', 'server', 'staff', 'files']
};

export function can(account: Pick<SessionAccount, 'type'> | null | undefined, permission: Permission) {
	return !!account && (PERMISSIONS[account.type] ?? []).includes(permission);
}

export function isStaff(account: Pick<SessionAccount, 'type'> | null | undefined) {
	return !!account && account.type >= GAMEMASTER;
}

/** For admin loads and actions: the staff account, or a redirect/403 */
export async function requireStaff(event: RequestEvent, permission?: Permission) {
	const account = event.locals.account;
	if (!account) redirect(303, `/login?next=${encodeURIComponent(event.url.pathname)}`);
	if (!isStaff(account)) error(403, 'Staff only');
	if (!(await totpSecret(account.id))) redirect(303, '/account/two-step?staff=1');
	if (permission && !can(account, permission)) error(403, 'Your role cannot do this');
	return account;
}

export async function audit(
	event: RequestEvent,
	action: string,
	details: string,
	target: { accountId?: number | null; player?: string | null } = {}
) {
	const actor = event.locals.account!;
	await execute(
		`INSERT INTO site_audit_log (account_id, actor, action, target_account_id, target_player, details, ip)
		 VALUES (:accountId, :actor, :action, :targetAccount, :targetPlayer, :details, :ip)`,
		{
			accountId: actor.id,
			actor: actor.name,
			action,
			targetAccount: target.accountId ?? null,
			targetPlayer: target.player ?? null,
			details: details.slice(0, 2000),
			ip: event.getClientAddress()
		}
	);
}
