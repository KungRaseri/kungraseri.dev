import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Simple YAML parser (basic implementation for common cases)
function parseYAML(yaml: string): unknown {
	const lines = yaml.split('\n');
	const result: Record<string, unknown> = {};
	let currentObj: Record<string, unknown> = result;
	const stack: Array<{ obj: Record<string, unknown>; indent: number }> = [{ obj: result, indent: -1 }];

	for (const line of lines) {
		if (!line.trim() || line.trim().startsWith('#')) continue;

		const indent = line.search(/\S/);
		const trimmed = line.trim();

		// Pop stack if we've dedented
		while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
			stack.pop();
		}
		currentObj = stack[stack.length - 1].obj;

		if (trimmed.includes(':')) {
			const [key, ...valueParts] = trimmed.split(':');
			const value = valueParts.join(':').trim();

			if (value) {
				// Simple value
				if (value === 'true') currentObj[key.trim()] = true;
				else if (value === 'false') currentObj[key.trim()] = false;
				else if (value === 'null') currentObj[key.trim()] = null;
				else if (!isNaN(Number(value))) currentObj[key.trim()] = Number(value);
				else currentObj[key.trim()] = value.replace(/^["']|["']$/g, '');
			} else {
				// Nested object
				const newObj: Record<string, unknown> = {};
				currentObj[key.trim()] = newObj;
				stack.push({ obj: newObj, indent });
				currentObj = newObj;
			}
		} else if (trimmed.startsWith('-')) {
			// Array item (simplified)
			const value = trimmed.substring(1).trim();
			if (!Array.isArray(currentObj['_items'])) {
				currentObj['_items'] = [];
			}
			(currentObj['_items'] as unknown[]).push(value);
		}
	}

	return result;
}

function jsonToYAML(obj: unknown, indent = 0): string {
	const indentStr = '  '.repeat(indent);
	
	if (obj === null) return 'null';
	if (typeof obj === 'boolean') return String(obj);
	if (typeof obj === 'number') return String(obj);
	if (typeof obj === 'string') return obj;
	
	if (Array.isArray(obj)) {
		return obj.map(item => `\n${indentStr}- ${jsonToYAML(item, indent + 1)}`).join('');
	}
	
	if (typeof obj === 'object') {
		return Object.entries(obj as Record<string, unknown>)
			.map(([key, value]) => {
				if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
					return `\n${indentStr}${key}:${jsonToYAML(value, indent + 1)}`;
				}
				return `\n${indentStr}${key}: ${jsonToYAML(value, indent + 1)}`;
			})
			.join('');
	}
	
	return String(obj);
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { input, mode = 'yaml-to-json' } = await request.json();

		if (!input) {
			return json({ error: 'Input is required' }, { status: 400 });
		}

		let result: string;

		if (mode === 'yaml-to-json') {
			const parsed = parseYAML(input);
			result = JSON.stringify(parsed, null, 2);
		} else {
			const parsed = JSON.parse(input);
			result = jsonToYAML(parsed).trim();
		}

		return json({ result });
	} catch (err) {
		return json({
			error: err instanceof Error ? err.message : 'Failed to convert'
		}, { status: 400 });
	}
};
