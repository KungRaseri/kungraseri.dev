import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

function caesarCipher(text: string, shift: number, mode: 'encode' | 'decode'): string {
	const actualShift = mode === 'decode' ? -shift : shift;
	
	return text.split('').map(char => {
		if (char.match(/[a-z]/i)) {
			const code = char.charCodeAt(0);
			const isUpperCase = char === char.toUpperCase();
			const base = isUpperCase ? 65 : 97;
			
			let shifted = ((code - base + actualShift) % 26 + 26) % 26;
			return String.fromCharCode(base + shifted);
		}
		return char;
	}).join('');
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { text, shift = 13, mode = 'encode' } = await request.json();

		if (text === undefined) {
			return json({ error: 'Text is required' }, { status: 400 });
		}

		if (typeof shift !== 'number' || shift < 0 || shift > 25) {
			return json({ error: 'Shift must be a number between 0 and 25' }, { status: 400 });
		}

		if (!['encode', 'decode'].includes(mode)) {
			return json({ error: 'Mode must be "encode" or "decode"' }, { status: 400 });
		}

		const result = caesarCipher(text, shift, mode);

		return json({ result, shift });
	} catch {
		return json({ error: 'Failed to process cipher' }, { status: 500 });
	}
};
