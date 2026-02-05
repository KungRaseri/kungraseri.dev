import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { text, action, indent } = await request.json();
		
		if (!text) {
			return json({ error: 'Text is required' }, { status: 400 });
		}
		
		try {
			const parsed = JSON.parse(text);
			
			let result: string;
			if (action === 'format') {
				result = JSON.stringify(parsed, null, indent || 2);
			} else if (action === 'minify') {
				result = JSON.stringify(parsed);
			} else {
				return json({ error: 'Invalid action' }, { status: 400 });
			}
			
			return json({ result });
		} catch (parseError) {
			return json({ 
				error: parseError instanceof Error ? parseError.message : 'Invalid JSON' 
			}, { status: 400 });
		}
	} catch {
		return json({ error: 'Failed to process JSON' }, { status: 500 });
	}
};
