import { CATEGORIES } from '$lib/server/itemcategories';
import { getCatalog } from '$lib/server/itemcatalog';
import type { PageServerLoad } from './$types';

// Items by category (?c=swords), or matching a search (?q=)
export const load: PageServerLoad = async ({ url }) => {
	const catalog = await getCatalog();
	const query = (url.searchParams.get('q') ?? '').trim().toLowerCase().slice(0, 40);
	const slug = url.searchParams.get('c') ?? '';
	const category = CATEGORIES.find((entry) => entry.slug === slug) ?? null;
	const stats = (item: { attributes: Record<string, string> }) => {
		const a = item.attributes;
		const parts: string[] = [];
		if (a.Attack) parts.push(`Atk ${a.Attack}`);
		if (a.Defense) parts.push(`Def ${a.Defense}`);
		if (a.ArmorValue) parts.push(`Arm ${a.ArmorValue}`);
		if (a.Weight) parts.push(`${(Number(a.Weight) / 100).toFixed(2)} oz`);
		return parts.join(' · ');
	};
	let items: { id: number; name: string; detail: string }[] = [];
	if (category) {
		items = (catalog.byCategory.get(category.slug) ?? []).map((entry) => ({ id: entry.id, name: entry.name, detail: stats(entry.item) }));
	} else if (query.length >= 2) {
		for (const list of catalog.byCategory.values()) {
			for (const entry of list) if (entry.name.toLowerCase().includes(query)) items.push({ id: entry.id, name: entry.name, detail: stats(entry.item) });
		}
		items.sort((a, b) => Number(!a.name.toLowerCase().startsWith(query)) - Number(!b.name.toLowerCase().startsWith(query)) || a.name.localeCompare(b.name));
		items = items.slice(0, 100);
	}
	return {
		query,
		category,
		items,
		groups: ['Equipment', 'Weapons', 'Others'].map((group) => ({
			name: group,
			categories: CATEGORIES.filter((entry) => entry.group === group && catalog.icons.has(entry.slug)).map((entry) => ({
				slug: entry.slug,
				name: entry.name,
				icon: catalog.icons.get(entry.slug)!,
				count: catalog.byCategory.get(entry.slug)?.length ?? 0
			}))
		}))
	};
};
