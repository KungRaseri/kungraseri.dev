import type { RequestHandler } from '@sveltejs/kit';
import { projects } from '$lib/data/projects';

const BASE_URL = 'https://kungraseri.dev';

const staticRoutes = ['', '/about', '/projects', '/music', '/tools'];

const toolSlugs = [
	'base-converter', 'base64', 'caesar-cipher', 'case-converter', 'color-palette',
	'cron-expression', 'csv-to-json', 'diff-checker', 'favicon-generator', 'hash-generator',
	'html-entities', 'image-to-base64', 'json-formatter', 'json-to-csv', 'jwt-decoder',
	'lorem-ipsum', 'mac-lookup', 'markdown-preview', 'password-generator', 'password-strength',
	'qr-code', 'regex-tester', 'slug-generator', 'subnet-calculator', 'timestamp-converter',
	'url-encoder', 'user-agent-parser', 'uuid', 'xml-formatter', 'yaml-json'
];

function url(path: string, priority = '0.7', changefreq = 'monthly') {
	return `  <url>
    <loc>${BASE_URL}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export const GET: RequestHandler = () => {
	const urls = [
		...staticRoutes.map((r) => url(r, r === '' ? '1.0' : '0.8', 'weekly')),
		...toolSlugs.map((s) => url(`/tools/${s}`, '0.6')),
		...projects.map((p) => url(`/projects/${p.slug}`, '0.7'))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
