import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { value, from, to } = await request.json();

		if (!value) {
			return json({ error: 'Value is required' }, { status: 400 });
		}

		const validBases = ['binary', 'octal', 'decimal', 'hexadecimal'];
		if (!validBases.includes(from) || !validBases.includes(to)) {
			return json({ error: 'Invalid base. Use: binary, octal, decimal, hexadecimal' }, { status: 400 });
		}

		// Parse input to decimal
		let decimalValue: number;
		try {
			switch (from) {
				case 'binary':
					decimalValue = parseInt(value, 2);
					break;
				case 'octal':
					decimalValue = parseInt(value, 8);
					break;
				case 'decimal':
					decimalValue = parseInt(value, 10);
					break;
				case 'hexadecimal':
					decimalValue = parseInt(value, 16);
					break;
				default:
					throw new Error('Invalid base');
			}

			if (isNaN(decimalValue)) {
				return json({ error: 'Invalid value for the specified base' }, { status: 400 });
			}
		} catch {
			return json({ error: 'Invalid value for the specified base' }, { status: 400 });
		}

		// Convert to target base
		let result: string;
		switch (to) {
			case 'binary':
				result = decimalValue.toString(2);
				break;
			case 'octal':
				result = decimalValue.toString(8);
				break;
			case 'decimal':
				result = decimalValue.toString(10);
				break;
			case 'hexadecimal':
				result = decimalValue.toString(16).toUpperCase();
				break;
			default:
				throw new Error('Invalid base');
		}

		return json({ result, decimal: decimalValue });
	} catch {
		return json({ error: 'Failed to convert base' }, { status: 500 });
	}
};
