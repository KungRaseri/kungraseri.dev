import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { value, mode = 'to-human' } = await request.json();

		if (value === undefined || value === null || value === '') {
			return json({ error: 'Value is required' }, { status: 400 });
		}

		if (mode === 'to-human') {
			// Convert timestamp to human readable
			const timestamp = parseInt(value);
			if (isNaN(timestamp)) {
				return json({ error: 'Invalid timestamp' }, { status: 400 });
			}

			// Handle both seconds and milliseconds
			const ms = timestamp > 9999999999 ? timestamp : timestamp * 1000;
			const date = new Date(ms);

			if (isNaN(date.getTime())) {
				return json({ error: 'Invalid timestamp' }, { status: 400 });
			}

			return json({
				iso: date.toISOString(),
				utc: date.toUTCString(),
				local: date.toLocaleString(),
				date: date.toLocaleDateString(),
				time: date.toLocaleTimeString(),
				relative: getRelativeTime(date)
			});
		} else {
			// Convert human readable to timestamp
			const date = new Date(value);

			if (isNaN(date.getTime())) {
				return json({ error: 'Invalid date string' }, { status: 400 });
			}

			return json({
				seconds: Math.floor(date.getTime() / 1000),
				milliseconds: date.getTime()
			});
		}
	} catch {
		return json({ error: 'Failed to convert timestamp' }, { status: 500 });
	}
};

function getRelativeTime(date: Date): string {
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const seconds = Math.floor(Math.abs(diff) / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	const future = diff < 0;
	const prefix = future ? 'in ' : '';
	const suffix = future ? '' : ' ago';

	if (seconds < 60) return `${prefix}${seconds} seconds${suffix}`;
	if (minutes < 60) return `${prefix}${minutes} minutes${suffix}`;
	if (hours < 24) return `${prefix}${hours} hours${suffix}`;
	return `${prefix}${days} days${suffix}`;
}
