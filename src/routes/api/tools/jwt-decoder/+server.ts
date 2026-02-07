import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { token } = await request.json();

		if (!token) {
			return json({ error: 'Token is required' }, { status: 400 });
		}

		const parts = token.split('.');
		if (parts.length !== 3) {
			return json({ error: 'Invalid JWT format. Expected 3 parts separated by dots.' }, { status: 400 });
		}

		try {
			const header = JSON.parse(Buffer.from(parts[0], 'base64url').toString());
			const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
			const signature = parts[2];

			// Check expiration if present
			let isExpired = false;
			if (payload.exp) {
				isExpired = Date.now() >= payload.exp * 1000;
			}

			return json({
				header,
				payload,
				signature,
				isExpired,
				isValid: true
			});
		} catch {
			return json({ error: 'Invalid base64 encoding in token' }, { status: 400 });
		}
	} catch {
		return json({ error: 'Failed to decode JWT' }, { status: 500 });
	}
};
