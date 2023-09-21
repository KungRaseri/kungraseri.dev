import type { Project } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const projects: Project[] = [
        {
            id: 1,
            title: "KungRaseri Productions",
            url: "https://kungraseri.dev",
            image: "/assets/white_logo_transparent_background.png",
            description: "Development, Streaming and Music Production",
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
            title: "Red Syndicate",
            url: "https://redsyndicate.org",
            image: "https://via.placeholder.com/480x320?text=Red%20Syndicate",
            description: "Software and Website Development",
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
            title: "Uncharted Lands",
            url: "https://ul.redsyndicate.org",
            image: "https://via.placeholder.com/480x320?text=Uncharted%20Lands",
            description: "Open-source settlement and resource management browser-based game",
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
            id: 4,
            title: "[REDACTED] Gaming",
            url: "https://kungraseri.dev",
            image: "/assets/redacted_gaming.png",
            description: "Gaming and Roleplay Community",
            actions: [
                {
                    text: 'Source',
                    href: 'https://dev.azure.com/kungraseri/REDACTED'
                }
            ]
        },
    ];
    return {
        projects
    };
}) satisfies PageServerLoad;