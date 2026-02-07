import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file) {
			return json({ error: 'File is required' }, { status: 400 });
		}

		// Check if it's an image
		if (!file.type.startsWith('image/')) {
			return json({ error: 'File must be an image' }, { status: 400 });
		}

		// Convert to buffer
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		
		// Create base64 data URL
		const base64 = buffer.toString('base64');
		const dataUrl = `data:${file.type};base64,${base64}`;

		return json({
			dataUrl,
			size: file.size,
			type: file.type,
			name: file.name
		});
	} catch {
		return json({ error: 'Failed to process image' }, { status: 500 });
	}
};
