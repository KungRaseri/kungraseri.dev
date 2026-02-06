import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

interface DiffResult {
	type: 'equal' | 'insert' | 'delete';
	value: string;
	lineNumber?: number;
}

function computeDiff(text1: string, text2: string, mode: 'chars' | 'words' | 'lines'): DiffResult[] {
	let array1: string[];
	let array2: string[];

	if (mode === 'lines') {
		array1 = text1.split('\n');
		array2 = text2.split('\n');
	} else if (mode === 'words') {
		array1 = text1.split(/\s+/);
		array2 = text2.split(/\s+/);
	} else {
		array1 = text1.split('');
		array2 = text2.split('');
	}

	const m = array1.length;
	const n = array2.length;
	const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

	// Compute LCS length
	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			if (array1[i - 1] === array2[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1] + 1;
			} else {
				dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
			}
		}
	}

	// Backtrack to build diff
	const result: DiffResult[] = [];
	let i = m;
	let j = n;

	while (i > 0 || j > 0) {
		if (i > 0 && j > 0 && array1[i - 1] === array2[j - 1]) {
			result.unshift({ type: 'equal', value: array1[i - 1] });
			i--;
			j--;
		} else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
			result.unshift({ type: 'insert', value: array2[j - 1] });
			j--;
		} else if (i > 0) {
			result.unshift({ type: 'delete', value: array1[i - 1] });
			i--;
		}
	}

	return result;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { text1, text2, mode = 'lines' } = await request.json();

		if (text1 === undefined || text2 === undefined) {
			return json({ error: 'Both text1 and text2 are required' }, { status: 400 });
		}

		if (!['chars', 'words', 'lines'].includes(mode)) {
			return json({ error: 'Invalid mode. Use "chars", "words", or "lines"' }, { status: 400 });
		}

		const diff = computeDiff(text1, text2, mode as 'chars' | 'words' | 'lines');

		const stats = {
			additions: diff.filter(d => d.type === 'insert').length,
			deletions: diff.filter(d => d.type === 'delete').length,
			unchanged: diff.filter(d => d.type === 'equal').length
		};

		return json({ diff, stats });
	} catch {
		return json({ error: 'Failed to compute diff' }, { status: 500 });
	}
};
