import { query } from '$lib/server/db';
import { towns } from '$lib/server/game';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const counts = await query<{ town_id: number; count: number }>('SELECT town_id, COUNT(*) AS count FROM houses GROUP BY town_id');
	const townList = counts
		.filter((row) => towns[row.town_id])
		.map((row) => ({ id: row.town_id, name: towns[row.town_id], count: Number(row.count) }))
		.sort((a, b) => a.name.localeCompare(b.name));
	const townId = Number(url.searchParams.get('town')) || townList.find((town) => town.name === 'Thais')?.id || townList[0]?.id || 0;
	const houses = await query<{ id: number; name: string; rent: number; size: number; beds: number; owner: string | null; paid: number }>(
		`SELECT h.id, h.name, h.rent, h.size, h.beds, h.paid, p.name AS owner FROM houses h LEFT JOIN players p ON p.id = h.owner
		 WHERE h.town_id = :townId ORDER BY h.name`,
		{ townId }
	);
	return { towns: townList, townId, houses: houses.map((house) => ({ ...house, size: Number(house.size), rent: Number(house.rent) })) };
};
