import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

function jsonToCSV(data: Record<string, unknown>[], delimiter = ','): string {
	if (!Array.isArray(data) || data.length === 0) {
		throw new Error('Data must be a non-empty array of objects');
	}

	// Get headers from first object
	const headers = Object.keys(data[0]);
	
	// Create CSV
	const csvLines: string[] = [];
	csvLines.push(headers.join(delimiter));

	for (const row of data) {
		const values = headers.map(header => {
			const value = row[header];
			// Handle values with commas, quotes, or newlines
			const stringValue = String(value ?? '');
			if (stringValue.includes(delimiter) || stringValue.includes('"') || stringValue.includes('\n')) {
				return `"${stringValue.replace(/"/g, '""')}"`;
			}
			return stringValue;
		});
		csvLines.push(values.join(delimiter));
	}

	return csvLines.join('\n');
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { jsonData, delimiter = ',' } = await request.json();

		if (!jsonData) {
			return json({ error: 'JSON data is required' }, { status: 400 });
		}

		let data: Record<string, unknown>[];
		try {
			data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
		} catch {
			return json({ error: 'Invalid JSON' }, { status: 400 });
		}

		const result = jsonToCSV(data, delimiter);

		return json({ result, rowCount: data.length });
	} catch (err) {
		return json({
			error: err instanceof Error ? err.message : 'Failed to convert to CSV'
		}, { status: 400 });
	}
};
