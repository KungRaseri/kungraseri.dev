import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

function parseCSV(csv: string, delimiter = ','): Record<string, string>[] {
	const lines = csv.trim().split('\n');
	if (lines.length < 2) {
		throw new Error('CSV must have at least a header row and one data row');
	}

	const headers = lines[0].split(delimiter).map(h => h.trim());
	const result: Record<string, string>[] = [];

	for (let i = 1; i < lines.length; i++) {
		const values = lines[i].split(delimiter).map(v => v.trim());
		const row: Record<string, string> = {};
		
		headers.forEach((header, index) => {
			row[header] = values[index] || '';
		});
		
		result.push(row);
	}

	return result;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { csv, delimiter = ',', pretty = true } = await request.json();

		if (!csv) {
			return json({ error: 'CSV data is required' }, { status: 400 });
		}

		const data = parseCSV(csv, delimiter);
		const result = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);

		return json({ result, count: data.length });
	} catch (err) {
		return json({
			error: err instanceof Error ? err.message : 'Failed to parse CSV'
		}, { status: 400 });
	}
};
