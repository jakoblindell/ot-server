import { getDailyHuntGuide } from '$lib/server/dailyhunts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({ guide: await getDailyHuntGuide() });
