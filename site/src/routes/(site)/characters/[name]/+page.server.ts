import { error, fail, redirect } from '@sveltejs/kit';
import { report, REPORT_REASONS } from '$lib/server/reports';
import { premiumDaysLeft } from '$lib/server/accounts';
import { query, queryOne } from '$lib/server/db';
import { towns, vocationBadge, vocationName } from '$lib/server/game';
import type { Actions, PageServerLoad } from './$types';

type CharacterRow = {
	id: number;
	account_id: number;
	name: string;
	group_id: number;
	level: number;
	vocation: number;
	sex: number;
	town_id: number;
	lastlogin: number;
	looktype: number;
	lookhead: number;
	lookbody: number;
	looklegs: number;
	lookfeet: number;
	maglevel: number;
	skill_fist: number;
	skill_club: number;
	skill_sword: number;
	skill_axe: number;
	skill_dist: number;
	skill_shielding: number;
	skill_fishing: number;
	premdays: number;
	lastday: number;
	online: number;
	created: number | null;
	comment: string | null;
	show_characters: number | null;
};

export const load: PageServerLoad = async ({ params, locals }) => {
	const character = await queryOne<CharacterRow>(
		`SELECT p.*, a.premdays, a.lastday, (o.player_id IS NOT NULL) AS online, z.created, z.comment, s.show_characters
		 FROM players p JOIN accounts a ON a.id = p.account_id
		 LEFT JOIN players_online o ON o.player_id = p.id
		 LEFT JOIN znote_players z ON z.player_id = p.id
		 LEFT JOIN site_accounts s ON s.account_id = p.account_id
		 WHERE p.name = :name AND p.deletion = 0`,
		{ name: params.name }
	);
	if (!character) error(404, 'No character with that name');

	const [deaths, guild, others] = await Promise.all([
		query<{ time: number; level: number; killed_by: string; is_player: number; mostdamage_by: string; mostdamage_is_player: number }>(
			'SELECT time, level, killed_by, is_player, mostdamage_by, mostdamage_is_player FROM player_deaths WHERE player_id = :id ORDER BY time DESC LIMIT 10',
			{ id: character.id }
		),
		queryOne<{ guild: string; rank: string; nick: string }>(
			`SELECT g.name AS guild, r.name AS \`rank\`, m.nick FROM guild_membership m
			 JOIN guilds g ON g.id = m.guild_id JOIN guild_ranks r ON r.id = m.rank_id WHERE m.player_id = :id`,
			{ id: character.id }
		),
		character.show_characters
			? query<{ name: string; level: number; vocation: number; online: number }>(
					`SELECT p.name, p.level, p.vocation, (o.player_id IS NOT NULL) AS online FROM players p
					 LEFT JOIN players_online o ON o.player_id = p.id
					 WHERE p.account_id = :account AND p.id <> :id AND p.deletion = 0 ORDER BY p.name`,
					{ account: character.account_id, id: character.id }
				)
			: Promise.resolve([])
	]);

	const premium = premiumDaysLeft(character.premdays, character.lastday) > 0;
	const staff = character.group_id > 1;
	return {
		character: {
			name: character.name,
			outfit: `/outfit/${character.looktype}-${character.lookhead}-${character.lookbody}-${character.looklegs}-${character.lookfeet}.png`,
			online: !!character.online,
			comment: character.comment ?? '',
			badge: vocationBadge(character.vocation),
			info: <{ label: string; value?: string; date?: number }[]>[
				{ label: 'Sex', value: character.sex === 1 ? 'Male' : 'Female' },
				{ label: 'Vocation', value: vocationName(character.vocation) },
				{ label: 'Level', value: String(character.level) },
				{ label: 'Residence', value: towns[character.town_id] ?? '–' },
				...(staff ? [{ label: 'Position', value: character.group_id === 3 ? 'God' : 'Gamemaster' }] : []),
				character.lastlogin ? { label: 'Last login', date: character.lastlogin * 1000 } : { label: 'Last login', value: 'Never' },
				...(character.created ? [{ label: 'Created', date: character.created * 1000 }] : []),
				{ label: 'Account', value: premium ? 'Premium account' : 'Free account' }
			],
			skills: [
				{ label: 'Magic level', value: character.maglevel },
				{ label: 'Fist fighting', value: character.skill_fist },
				{ label: 'Club fighting', value: character.skill_club },
				{ label: 'Sword fighting', value: character.skill_sword },
				{ label: 'Axe fighting', value: character.skill_axe },
				{ label: 'Distance fighting', value: character.skill_dist },
				{ label: 'Shielding', value: character.skill_shielding },
				{ label: 'Fishing', value: character.skill_fishing }
			]
		},
		guild: guild ?? null,
		deaths: deaths.map((death) => ({
			at: death.time * 1000,
			level: death.level,
			killer: { name: death.killed_by, player: !!death.is_player },
			// the one who did most damage, when it was someone else
			assist:
				death.mostdamage_by && death.mostdamage_by !== death.killed_by
					? { name: death.mostdamage_by, player: !!death.mostdamage_is_player }
					: null
		})),
		loggedIn: !!locals.account,
		reasons: REPORT_REASONS,
		others: others.map((other) => ({ name: other.name, level: other.level, badge: vocationBadge(other.vocation), online: !!other.online }))
	};
};

export const actions: Actions = {
	report: async ({ params, locals, request, url }) => {
		if (!locals.account) redirect(303, `/login?next=${encodeURIComponent(url.pathname)}`);
		const form = await request.formData();
		const reason = String(form.get('reason') ?? '');
		if (!REPORT_REASONS.includes(reason)) return fail(400, { error: 'Pick a reason.' });
		const sent = await report({
			kind: 'character',
			targetPlayer: params.name,
			reason,
			text: String(form.get('text') ?? ''),
			accountId: locals.account.id,
			reporter: locals.account.name
		});
		return { message: sent ? 'Thank you, staff will look at it.' : 'You already reported this character; staff will look at it.' };
	}
};
