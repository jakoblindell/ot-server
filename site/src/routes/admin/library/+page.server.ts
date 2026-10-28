import { fail } from '@sveltejs/kit';
import { getHiddenItems, setHiddenItems } from '$lib/server/itemcatalog';
import { resetItemData } from '$lib/server/itemdata';
import { getLibrary } from '$lib/server/library';
import { RARITIES, lootShownUpTo, setLootShownUpTo } from '$lib/server/rarity';
import { audit, requireStaff } from '$lib/server/staff';
import type { Actions, PageServerLoad } from './$types';

// What players may see in the library and the client: items kept hidden
// for now, and how rare a drop may be before it shows as "Unknown"
export const load: PageServerLoad = async (event) => {
	await requireStaff(event, 'files');
	const { items } = await getLibrary();
	const hidden = [...(await getHiddenItems())].map((id) => ({ id, name: items.get(id)?.name ?? `item ${id}` }));
	return {
		hidden,
		lootShownUpTo: await lootShownUpTo(),
		rarities: [...RARITIES],
		items: [...items.values()].filter((item) => item.flags.includes('Take')).map((item) => [item.id, item.name] as [number, string])
	};
};

async function changed() {
	resetItemData();
}

export const actions: Actions = {
	hide: async (event) => {
		await requireStaff(event, 'files');
		const form = await event.request.formData();
		const value = String(form.get('item') ?? '').trim();
		const { items } = await getLibrary();
		const id = /^\d+$/.test(value)
			? Number(value)
			: [...items.values()].find((item) => item.name.toLowerCase().replace(/^(a|an|the|some) /, '') === value.toLowerCase().replace(/^(a|an|the|some) /, ''))?.id;
		if (!id || !items.has(id)) return fail(400, { error: `No item "${value}".` });
		const hidden = await getHiddenItems();
		hidden.add(id);
		await setHiddenItems(hidden);
		await changed();
		await audit(event, 'settings.library', `Hid ${items.get(id)!.name} (${id}) from players`);
		return { message: `${items.get(id)!.name} is hidden from players.` };
	},
	show: async (event) => {
		await requireStaff(event, 'files');
		const id = Number((await event.request.formData()).get('id'));
		const hidden = await getHiddenItems();
		if (!hidden.delete(id)) return fail(400, { error: 'That item was not hidden.' });
		await setHiddenItems(hidden);
		await changed();
		await audit(event, 'settings.library', `Showed item ${id} to players again`);
		return { message: 'Shown to players again.' };
	},
	lootVisibility: async (event) => {
		await requireStaff(event, 'files');
		const tier = Number((await event.request.formData()).get('tier'));
		if (!Number.isInteger(tier) || tier < 0 || tier >= RARITIES.length) return fail(400, { error: 'Pick a rarity.' });
		await setLootShownUpTo(tier);
		await changed();
		await audit(event, 'settings.loot', `Players see loot up to ${RARITIES[tier]}`);
		return { message: tier === RARITIES.length - 1 ? 'Players see all loot (except drops marked hidden).' : `Drops rarer than ${RARITIES[tier]} show as Unknown.` };
	}
};
