import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const WORDS = [
	'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
	'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
	'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
	'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
	'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
	'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
	'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
	'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateWords(count: number): string {
	const result: string[] = [];
	for (let i = 0; i < count; i++) {
		result.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
	}
	return result.join(' ');
}

function generateSentence(minWords = 5, maxWords = 15): string {
	const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
	const sentence = generateWords(wordCount);
	return capitalize(sentence) + '.';
}

function generateParagraph(minSentences = 3, maxSentences = 7): string {
	const sentenceCount = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
	const sentences: string[] = [];
	for (let i = 0; i < sentenceCount; i++) {
		sentences.push(generateSentence());
	}
	return sentences.join(' ');
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { type = 'paragraphs', count = 3 } = await request.json();

		const limitedCount = Math.min(Math.max(1, count), 100);
		let result = '';

		switch (type) {
			case 'words':
				result = generateWords(limitedCount);
				break;
			case 'sentences': {
				const sentences: string[] = [];
				for (let i = 0; i < limitedCount; i++) {
					sentences.push(generateSentence());
				}
				result = sentences.join(' ');
				break;
			}
			case 'paragraphs': {
				const paragraphs: string[] = [];
				for (let i = 0; i < limitedCount; i++) {
					paragraphs.push(generateParagraph());
				}
				result = paragraphs.join('\n\n');
				break;
			}
			default:
				return json({ error: 'Invalid type. Use "words", "sentences", or "paragraphs"' }, { status: 400 });
		}

		return json({ result });
	} catch {
		return json({ error: 'Failed to generate lorem ipsum' }, { status: 500 });
	}
};
