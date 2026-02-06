import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { pattern, text, flags = '' } = await request.json();

		if (!pattern) {
			return json({ error: 'Pattern is required' }, { status: 400 });
		}

		if (!text) {
			return json({ matches: [], isValid: true });
		}

		let regex: RegExp;
		try {
			regex = new RegExp(pattern, flags);
		} catch (err) {
			return json({
				error: err instanceof Error ? err.message : 'Invalid regex pattern',
				isValid: false
			}, { status: 400 });
		}

		const matches: Array<{
			match: string;
			index: number;
			groups: string[];
		}> = [];

		if (flags.includes('g')) {
			let match;
			while ((match = regex.exec(text)) !== null) {
				matches.push({
					match: match[0],
					index: match.index,
					groups: match.slice(1)
				});
			}
		} else {
			const match = regex.exec(text);
			if (match) {
				matches.push({
					match: match[0],
					index: match.index,
					groups: match.slice(1)
				});
			}
		}

		return json({
			matches,
			matchCount: matches.length,
			isValid: true
		});
	} catch {
		return json({ error: 'Failed to test regex' }, { status: 500 });
	}
};
