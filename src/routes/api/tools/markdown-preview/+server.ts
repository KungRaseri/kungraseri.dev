import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Simple markdown to HTML converter (basic implementation)
function markdownToHtml(markdown: string): string {
	let html = markdown;

	// Headers
	html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
	html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
	html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

	// Bold
	html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
	html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

	// Italic
	html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
	html = html.replace(/_(.+?)_/g, '<em>$1</em>');

	// Code
	html = html.replace(/`(.+?)`/g, '<code>$1</code>');

	// Links
	html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

	// Images
	html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

	// Lists
	html = html.replace(/^\* (.+)$/gim, '<li>$1</li>');
	html = html.replace(/^\- (.+)$/gim, '<li>$1</li>');
	html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

	// Line breaks
	html = html.replace(/\n$/gim, '<br />');

	return html;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { markdown } = await request.json();

		if (markdown === undefined) {
			return json({ html: '' });
		}

		const html = markdownToHtml(markdown);

		return json({ html });
	} catch {
		return json({ error: 'Failed to render markdown' }, { status: 500 });
	}
};
