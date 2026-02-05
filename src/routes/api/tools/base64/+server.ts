import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { text, mode } = await request.json();
		
		if (!text) {
			return json({ error: 'Text is required' }, { status: 400 });
		}
		
		let result: string;
		
		if (mode === 'encode') {
			result = Buffer.from(text, 'utf-8').toString('base64');
		} else {
			try {
				result = Buffer.from(text, 'base64').toString('utf-8');
			} catch {
				return json({ error: 'Invalid Base64 string' }, { status: 400 });
			}
		}
		
		return json({ result });
	} catch (error) {
		return json({ error: 'Failed to process Base64' }, { status: 500 });
	}
};
