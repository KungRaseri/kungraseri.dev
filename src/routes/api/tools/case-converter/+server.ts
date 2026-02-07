import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

function toTitleCase(str: string): string {
	return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
}

function toCamelCase(str: string): string {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
			index === 0 ? word.toLowerCase() : word.toUpperCase()
		)
		.replace(/\s+/g, '');
}

function toPascalCase(str: string): string {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
		.replace(/\s+/g, '');
}

function toSnakeCase(str: string): string {
	return str
		.replace(/\W+/g, ' ')
		.split(/ |\B(?=[A-Z])/)
		.map((word) => word.toLowerCase())
		.join('_');
}

function toKebabCase(str: string): string {
	return str
		.replace(/\W+/g, ' ')
		.split(/ |\B(?=[A-Z])/)
		.map((word) => word.toLowerCase())
		.join('-');
}

function toConstantCase(str: string): string {
	return toSnakeCase(str).toUpperCase();
}

function toDotCase(str: string): string {
	return str
		.replace(/\W+/g, ' ')
		.split(/ |\B(?=[A-Z])/)
		.map((word) => word.toLowerCase())
		.join('.');
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { text } = await request.json();

		if (!text) {
			return json({ error: 'Text is required' }, { status: 400 });
		}

		return json({
			lowercase: text.toLowerCase(),
			uppercase: text.toUpperCase(),
			titleCase: toTitleCase(text),
			camelCase: toCamelCase(text),
			pascalCase: toPascalCase(text),
			snakeCase: toSnakeCase(text),
			kebabCase: toKebabCase(text),
			constantCase: toConstantCase(text),
			dotCase: toDotCase(text)
		});
	} catch {
		return json({ error: 'Failed to convert case' }, { status: 500 });
	}
};
