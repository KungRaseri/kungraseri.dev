import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import QRCode from 'qrcode';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { text, size, errorCorrectionLevel } = await request.json();
		
		if (!text) {
			return json({ error: 'Text is required' }, { status: 400 });
		}
		
		const dataUrl = await QRCode.toDataURL(text, {
			width: size || 256,
			margin: 2,
			errorCorrectionLevel: errorCorrectionLevel || 'M'
		});
		
		return json({ dataUrl });
	} catch (error) {
		return json({ error: 'Failed to generate QR code' }, { status: 500 });
	}
};
