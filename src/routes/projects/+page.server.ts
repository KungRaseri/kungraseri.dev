import { projects } from '$lib/data/projects';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return { projects };
}) satisfies PageServerLoad;
