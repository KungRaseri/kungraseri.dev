import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type ThemeName =
	| 'nouveau'
	| 'crimson'
	| 'vintage'
	| 'terminus';

export const themes: Record<ThemeName, { name: string; description: string; isPreset?: boolean }> = {
	// Skeleton Preset Themes (from @skeletonlabs/skeleton)
	'nouveau': {
		name: 'Nouveau',
		description: 'Art nouveau inspired with elegant curves',
		isPreset: true
	},
	'crimson': {
		name: 'Crimson',
		description: 'Bold reds with strong contrast',
		isPreset: true
	},
	'vintage': {
		name: 'Vintage',
		description: 'Retro styling with warm tones',
		isPreset: true
	},
	'terminus': {
		name: 'Terminus',
		description: 'Dark terminal-inspired theme',
		isPreset: true
	}
};

// Whitelist of allowed theme names for security
const ALLOWED_THEMES = new Set<ThemeName>([
	'nouveau', 'crimson', 'vintage', 'terminus'
]);

// Get initial theme from localStorage or default to gold-nouveau
const getInitialTheme = (): ThemeName => {
	if (browser) {
		const stored = localStorage.getItem('selectedTheme') as ThemeName;
		// Validate theme is in whitelist
		if (stored && ALLOWED_THEMES.has(stored)) {
			return stored;
		}
	}
	return 'nouveau';
};

export const currentTheme = writable<ThemeName>(getInitialTheme());

/**
 * Sanitizes a theme name to prevent CSS injection attacks
 * Only allows alphanumeric characters and hyphens
 */
function sanitizeThemeName(themeName: string): string {
	// Remove any characters that aren't alphanumeric or hyphens
	return themeName.replaceAll(/[^a-z0-9-]/gi, '');
}

/**
 * Loads a theme by setting the data-theme attribute and loading the CSS file
 * Supports both custom themes (from /static/themes/) and Skeleton preset themes
 * Uses <link> tag for browser caching and better performance
 */
export async function loadTheme(themeName: ThemeName) {
	if (!browser) return;

	// Validate theme is in whitelist
	if (!ALLOWED_THEMES.has(themeName)) {
		console.error(`Invalid theme name: ${themeName}`);
		return;
	}

	// Sanitize theme name to prevent CSS injection
	const sanitizedTheme = sanitizeThemeName(themeName);

	// Set data-theme attribute on html element
	document.documentElement.dataset.theme = sanitizedTheme;

	// Remove existing theme link
	const existingLink = document.getElementById('theme-css');
	if (existingLink) {
		existingLink.remove();
	}

	// Check if this is a preset theme or custom theme
	const isPreset = themes[themeName]?.isPreset;

	// Only add link tag for custom themes (presets are imported in app.css)
	if (!isPreset) {
		const link = document.createElement('link');
		link.id = 'theme-css';
		link.rel = 'stylesheet';
		// Use sanitized theme name in URL
		link.href = `/themes/${sanitizedTheme}.css`;
		document.head.appendChild(link);
	}

	// Save to localStorage
	localStorage.setItem('selectedTheme', themeName);

	// Update store
	currentTheme.set(themeName);
}

// Initialize theme on load
if (browser) {
	await loadTheme(getInitialTheme());
}
