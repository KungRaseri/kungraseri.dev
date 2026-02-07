import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const htmlEntities: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;',
	'©': '&copy;',
	'®': '&reg;',
	'™': '&trade;',
	'€': '&euro;',
	'£': '&pound;',
	'¥': '&yen;',
	'¢': '&cent;',
	'§': '&sect;',
	'°': '&deg;',
	'±': '&plusmn;',
	'×': '&times;',
	'÷': '&divide;',
	'•': '&bull;',
	'…': '&hellip;',
	'→': '&rarr;',
	'←': '&larr;',
	'↑': '&uarr;',
	'↓': '&darr;',
	'↔': '&harr;',
	' ': '&nbsp;'
};

function encodeHtmlEntities(text: string): string {
	return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

function decodeHtmlEntities(text: string): string {
	// Decode named entities
	let decoded = text;
	for (const [char, entity] of Object.entries(htmlEntities)) {
		decoded = decoded.replace(new RegExp(entity, 'g'), char);
	}

	// Decode numeric entities
	decoded = decoded.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec)));
	decoded = decoded.replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));

	return decoded;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { text, mode = 'encode' } = await request.json();

		if (text === undefined) {
			return json({ error: 'Text is required' }, { status: 400 });
		}

		const result = mode === 'encode' ? encodeHtmlEntities(text) : decodeHtmlEntities(text);

		return json({ result });
	} catch {
		return json({ error: 'Failed to process HTML entities' }, { status: 500 });
	}
};
