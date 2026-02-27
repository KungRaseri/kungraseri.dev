import { projects } from '$lib/data/projects';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const project = projects.find((p) => p.slug === params.slug);
	if (!project) {
		error(404, `Project "${params.slug}" not found`);
	}
	return { project };
}) satisfies PageServerLoad;
