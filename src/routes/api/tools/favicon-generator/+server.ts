import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { text, bgColor = '#4F46E5', textColor = '#FFFFFF', size = 32 } = await request.json();

		if (!text) {
			return json({ error: 'Text is required' }, { status: 400 });
		}

		// Create SVG
		const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${bgColor}" rx="${size * 0.15}"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size * 0.6}" font-weight="bold" fill="${textColor}">${text.charAt(0).toUpperCase()}</text>
</svg>`;

		// Convert SVG to base64 data URL
		const base64 = Buffer.from(svg).toString('base64');
		const dataUrl = `data:image/svg+xml;base64,${base64}`;

		return json({ dataUrl, svg });
	} catch {
		return json({ error: 'Failed to generate favicon' }, { status: 500 });
	}
};
