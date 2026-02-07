import type { Project } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const projects: Project[] = [
		{
			id: 1,
			title: 'KungRaseri Productions',
			url: 'https://kungraseri.dev',
			image: '/assets/white_logo_transparent_background.png',
			description: 'Development, Streaming and Music Production',
			actions: [
				{
					text: 'Website',
					href: 'https://kungraseri.dev'
				},
				{
					text: 'Source',
					href: 'https://github.com/kungraseri/kungraser.dev'
				}
			]
		},
		{
			id: 2,
			title: 'Red Syndicate',
			url: 'https://redsyndicate.org',
			image: undefined,
			description: 'Software and Website Development',
			actions: [
				{
					text: 'Website',
					href: 'https://redsyndicate.org'
				},
				{
					text: 'Source',
					href: 'https://github.com/kungraseri/redsyndicate.org'
				}
			]
		},
		{
			id: 3,
			title: 'Uncharted Lands',
			url: 'https://ul.redsyndicate.org',
			image: undefined,
			description: 'Open-source settlement and resource management browser-based game',
			actions: [
				{
					text: 'Website',
					href: 'https://ul.redsyndicate.org'
				},
				{
					text: 'Source',
					href: 'https://github.com/kungraseri/uncharted-lands'
				}
			]
		},
		{
			id: 5,
			title: 'Realm Engine',
			url: 'https://github.com/KungRaseri/RealmEngine',
			description: 'RPG development engine',
			actions: [
				{
					text: 'Source',
					href: 'https://github.com/KungRaseri/RealmEngine'
				}
			]
		},
		{
			id: 6,
			title: 'Corelight Fall',
			url: 'https://github.com/KungRaseri/corelight-fall',
			description: 'Story-driven roleplaying game',
			actions: [
				{
					text: 'Source',
					href: 'https://github.com/KungRaseri/corelight-fall'
				}
			]
		}
	];
	return {
		projects
	};
}) satisfies PageServerLoad;
