import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

function generateSlug(text: string, separator = '-'): string {
	return text
		.toLowerCase()
		.trim()
		// Replace accented characters
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		// Remove special characters
		.replace(/[^a-z0-9\s-]/g, '')
		// Replace whitespace and multiple separators with single separator
		.replace(/[\s_-]+/g, separator)
		// Remove leading/trailing separators
		.replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { text, separator = '-' } = await request.json();

		if (!text) {
			return json({ error: 'Text is required' }, { status: 400 });
		}

		if (separator && separator.length !== 1) {
			return json({ error: 'Separator must be a single character' }, { status: 400 });
		}

		const slug = generateSlug(text, separator);

		return json({ slug });
	} catch {
		return json({ error: 'Failed to generate slug' }, { status: 500 });
	}
};
