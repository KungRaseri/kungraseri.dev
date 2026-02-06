import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { text, mode } = await request.json();

		if (!text) {
			return json({ error: 'Text is required' }, { status: 400 });
		}

		let result = '';

		if (mode === 'encode') {
			result = encodeURIComponent(text);
		} else if (mode === 'decode') {
			result = decodeURIComponent(text);
		} else {
			return json({ error: 'Invalid mode. Use "encode" or "decode"' }, { status: 400 });
		}

		return json({ result });
	} catch {
		return json({ error: 'Invalid URL encoding' }, { status: 400 });
	}
};
