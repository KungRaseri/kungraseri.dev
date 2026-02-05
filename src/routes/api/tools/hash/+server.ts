import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import crypto from 'crypto';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { text } = await request.json();
		
		if (!text) {
			return json({ error: 'Text is required' }, { status: 400 });
		}
		
		const hashes = {
			sha256: crypto.createHash('sha256').update(text).digest('hex'),
			sha512: crypto.createHash('sha512').update(text).digest('hex'),
			sha1: crypto.createHash('sha1').update(text).digest('hex'),
			md5: crypto.createHash('md5').update(text).digest('hex')
		};
		
		return json({ hashes });
	} catch (error) {
		return json({ error: 'Failed to generate hashes' }, { status: 500 });
	}
};
