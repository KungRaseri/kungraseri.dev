import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

function formatXML(xml: string, indent = 2): string {
	let formatted = '';
	let level = 0;
	const indentStr = ' '.repeat(indent);

	xml.split(/>\s*</).forEach((node) => {
		if (node.match(/^\/\w/)) {
			level--;
		}
		
		formatted += indentStr.repeat(level);
		
		if (node.startsWith('?') || node.startsWith('!')) {
			formatted += '<' + node + '>\n';
		} else if (node.match(/^\/\w/)) {
			formatted += '<' + node + '>\n';
		} else if (node.match(/\/$/)) {
			formatted += '<' + node + '>\n';
		} else {
			formatted += '<' + node + '>\n';
			if (!node.match(/^\//) && !node.match(/\/$/)) {
				level++;
			}
		}
	});

	return formatted.trim();
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { xml, indent = 2 } = await request.json();

		if (!xml) {
			return json({ error: 'XML data is required' }, { status: 400 });
		}

		// Basic XML validation
		if (!xml.trim().startsWith('<')) {
			return json({ error: 'Invalid XML: must start with <' }, { status: 400 });
		}

		const result = formatXML(xml, indent);

		return json({ result, isValid: true });
	} catch (err) {
		return json({
			error: err instanceof Error ? err.message : 'Failed to format XML',
			isValid: false
		}, { status: 400 });
	}
};
