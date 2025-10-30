import type { Album } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const albums: Album[] = [
		{
			id: 1,
			title: 'Ascension',
			url: 'https://soundcloud.com/kungraseri/sets/ascension',
			image: '/assets/music/albums/ascension/album_cover.jpg',
			description:
				'Released in 2018. Ascension is my first album and the start of my music production journey.',
			actions: [
				{
					text: '',
					href: ''
				}
			]
		},
		{
			id: 2,
			title: 'Emergent',
			url: 'https://soundcloud.com/kungraseri/sets/emergent',
			image: '/assets/music/albums/emergent/album_cover.jpg',
			description:
				'Released in 2020. Emergent is my second album and was supposed to be released in 2019.',
			actions: [
				{
					text: '',
					href: ''
				}
			]
		},
		{
			id: 3,
			title: 'Expanse',
			url: 'https://soundcloud.com/kungraseri/sets/expanse',
			image: '/assets/logo.png',
			description: 'Coming soon™ 2021 or something. Listen to the album now on SoundCloud.',
			actions: [
				{
					text: '',
					href: ''
				}
			]
		}
	];

	return {
		albums
	};
}) satisfies PageServerLoad;
