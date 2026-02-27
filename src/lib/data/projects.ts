import type { Project } from '$lib/types';

export const projects: Project[] = [
	{
		id: 1,
		slug: 'kungraseri-dev',
		title: 'KungRaseri Productions',
		url: 'https://kungraseri.dev',
		image: '/assets/white_logo_transparent_background.png',
		description: 'Development, Streaming and Music Production',
		longDescription:
			'This very site — a personal portfolio and toolbox built with SvelteKit, Skeleton UI, and Tailwind CSS v4. Features a growing suite of 30+ developer tools, project showcase, music discography, and a custom theme/dark-mode system.',
		status: 'active',
		tech: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Skeleton UI', 'Vercel'],
		actions: [
			{ text: 'Website', href: 'https://kungraseri.dev' },
			{ text: 'Source', href: 'https://github.com/kungraseri/kungraseri.dev' }
		]
	},
	{
		id: 2,
		slug: 'red-syndicate',
		title: 'Red Syndicate',
		url: 'https://redsyndicate.org',
		image: undefined,
		description: 'Software and Website Development',
		longDescription:
			'An umbrella organisation for collaborative software and web development projects. Home to multiple open-source efforts spanning games, tooling, and web applications.',
		status: 'active',
		tech: ['SvelteKit', '.NET', 'PostgreSQL'],
		actions: [
			{ text: 'Website', href: 'https://redsyndicate.org' },
			{ text: 'Source', href: 'https://github.com/kungraseri/redsyndicate.org' }
		]
	},
	{
		id: 3,
		slug: 'uncharted-lands',
		title: 'Uncharted Lands',
		url: 'https://ul.redsyndicate.org',
		image: undefined,
		description: 'Open-source settlement and resource management browser-based game',
		longDescription:
			'A browser-based strategy game featuring settlement building, resource management, and territorial expansion. Built as an open-source project under Red Syndicate.',
		status: 'wip',
		tech: ['SvelteKit', '.NET', 'PostgreSQL', 'SignalR'],
		actions: [
			{ text: 'Website', href: 'https://ul.redsyndicate.org' },
			{ text: 'Source', href: 'https://github.com/kungraseri/uncharted-lands' }
		]
	},
	{
		id: 4,
		slug: 'realm-engine',
		title: 'Realm Engine',
		url: 'https://github.com/KungRaseri/RealmEngine',
		description: 'RPG development engine',
		longDescription:
			'A game-engine-agnostic RPG backend engine written in C#. Provides gameplay systems including combat, inventory, questing, and procedural content generation. Open-source and designed to integrate with any frontend game engine.',
		status: 'active',
		tech: ['C#', '.NET', 'Open Source'],
		actions: [{ text: 'Source', href: 'https://github.com/KungRaseri/RealmEngine' }]
	},
	{
		id: 5,
		slug: 'corelight-fall',
		title: 'Corelight Fall',
		url: 'https://github.com/KungRaseri/corelight-fall',
		description: 'Story-driven roleplaying game',
		longDescription:
			'A story-driven RPG featuring a rich narrative world, turn-based combat, and character progression. Built with Godot and powered by Realm Engine for backend gameplay logic.',
		status: 'wip',
		tech: ['Godot', 'C#', 'Realm Engine'],
		actions: [{ text: 'Source', href: 'https://github.com/KungRaseri/corelight-fall' }]
	}
];
