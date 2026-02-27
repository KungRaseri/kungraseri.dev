import { browser } from '$app/environment';

const STORAGE_KEY = 'recentTools';
const MAX_RECENT = 6;

export type RecentTool = {
	slug: string;
	title: string;
	icon: string;
	description: string;
};

function loadFromStorage(): RecentTool[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as RecentTool[]) : [];
	} catch {
		return [];
	}
}

function saveToStorage(tools: RecentTool[]) {
	if (!browser) return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(tools));
	} catch {
		// silently ignore
	}
}

export function pushRecentTool(tool: RecentTool) {
	const current = loadFromStorage();
	// Remove existing entry for this slug so it moves to front
	const filtered = current.filter((t) => t.slug !== tool.slug);
	const updated = [tool, ...filtered].slice(0, MAX_RECENT);
	saveToStorage(updated);
}

export function getRecentTools(): RecentTool[] {
	return loadFromStorage();
}
