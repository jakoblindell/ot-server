import { config } from './config';
import { queryOne } from './db';
import { reservedNames } from './gamedata';

// Rules for account and character names. The character rules follow the
// ones MyAAC and the old Tibia website used.

export const ACCOUNT_NAME_MIN = 3;
export const ACCOUNT_NAME_MAX = 20;
export const CHARACTER_NAME_MIN = 3;
export const CHARACTER_NAME_MAX = 20;

/** Words a name may not start with or be */
const STAFF_WORDS = ['gm', 'cm', 'god', 'tutor', 'admin', 'administrator', 'gamemaster', 'support', 'staff', 'owner', 'hoster'];
/** Words a name may not contain anywhere */
const BLOCKED_PARTS = ['gamemaster', 'game master', 'admin', 'cipsoft', 'tibia'];

export function accountNameError(name: string): string | null {
	if (name.length < ACCOUNT_NAME_MIN || name.length > ACCOUNT_NAME_MAX) {
		return `The account name needs ${ACCOUNT_NAME_MIN} to ${ACCOUNT_NAME_MAX} characters.`;
	}
	if (!/^[A-Za-z0-9]+$/.test(name)) return 'The account name may only contain letters and digits.';
	return null;
}

export async function accountNameTaken(name: string) {
	return !!(await queryOne('SELECT id FROM accounts WHERE name = :name', { name }));
}

/** The rules that need no lookups; null when the name is fine */
export function characterNameFormatError(name: string): string | null {
	if (name !== name.trim()) return 'The name may not start or end with a space.';
	if (name.length < CHARACTER_NAME_MIN || name.length > CHARACTER_NAME_MAX) {
		return `The name needs ${CHARACTER_NAME_MIN} to ${CHARACTER_NAME_MAX} characters.`;
	}
	if (!/^[A-Za-z ]+$/.test(name)) return 'Use only the letters A-Z and spaces.';
	if (/ {2}/.test(name)) return 'Use single spaces between words.';
	const words = name.split(' ');
	if (words.length > 3) return 'Use at most three words.';
	for (const word of words) {
		if (word.length < 2) return 'Every word needs at least two letters.';
		if (!/^[A-Z][a-z]+$/.test(word)) return 'Start every word with a capital letter; the other letters are lower case.';
		if (!/[aeiouy]/i.test(word)) return 'Every word needs a vowel.';
	}
	if (/(.)\1\1/i.test(name)) return 'The same letter may not appear three times in a row.';
	const lower = name.toLowerCase();
	if (STAFF_WORDS.includes(lower) || STAFF_WORDS.some((word) => lower.startsWith(word + ' '))) {
		return 'The name may not look like a staff member\'s.';
	}
	if (BLOCKED_PARTS.some((part) => lower.includes(part))) return 'The name contains a word that is not allowed.';
	if (lower === config.serverName.toLowerCase()) return 'The name may not be the server\'s name.';
	return null;
}

/** All rules, including names in use, namelocked, or from the game's data */
export async function characterNameError(name: string): Promise<string | null> {
	const formatError = characterNameFormatError(name);
	if (formatError) return formatError;
	if ((await reservedNames()).has(name.toLowerCase())) return 'That is the name of a creature, NPC or spell.';
	if (await queryOne('SELECT id FROM players WHERE name = :name', { name })) return 'This name is already taken.';
	return null;
}
