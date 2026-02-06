import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { randomBytes } from 'crypto';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { count = 1, version = 4 } = await request.json();

		if (version !== 4) {
			return json({ error: 'Only UUID v4 is currently supported' }, { status: 400 });
		}

		const uuids: string[] = [];
		for (let i = 0; i < Math.min(count, 100); i++) {
			const bytes = randomBytes(16);
			
			// Set version (4) and variant bits
			bytes[6] = (bytes[6] & 0x0f) | 0x40;
			bytes[8] = (bytes[8] & 0x3f) | 0x80;

			const uuid = [
				bytes.subarray(0, 4).toString('hex'),
				bytes.subarray(4, 6).toString('hex'),
				bytes.subarray(6, 8).toString('hex'),
				bytes.subarray(8, 10).toString('hex'),
				bytes.subarray(10, 16).toString('hex')
			].join('-');

			uuids.push(uuid);
		}

		return json({ uuids });
	} catch {
		return json({ error: 'Failed to generate UUIDs' }, { status: 500 });
	}
};
