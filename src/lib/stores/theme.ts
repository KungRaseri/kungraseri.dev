import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type ThemeName = 'gold-nouveau' | 'cyber-night' | 'forest-sage' | 'crimson-steel';

export const themes: Record<ThemeName, { name: string; description: string }> = {
	'gold-nouveau': {
		name: 'Gold Nouveau',
		description: 'Elegant gold and dark tones with a luxurious feel'
	},
	'cyber-night': {
		name: 'Cyber Night',
		description: 'Neon blues and cyans with dark backgrounds for a futuristic look'
	},
	'forest-sage': {
		name: 'Forest Sage',
		description: 'Natural greens and earthy tones for a calming experience'
	},
	'crimson-steel': {
		name: 'Crimson Steel',
		description: 'Bold reds with cool grays for a powerful aesthetic'
	}
};

// Get initial theme from localStorage or default to gold-nouveau
const getInitialTheme = (): ThemeName => {
	if (browser) {
		const stored = localStorage.getItem('selectedTheme') as ThemeName;
		if (stored && stored in themes) {
			return stored;
		}
	}
	return 'gold-nouveau';
};

export const currentTheme = writable<ThemeName>(getInitialTheme());

// Function to load theme CSS
export async function loadTheme(themeName: ThemeName) {
	if (browser) {
		// Remove existing theme link
		const existingLink = document.getElementById('theme-css');
		if (existingLink) {
			existingLink.remove();
		}

		// Add new theme link
		const link = document.createElement('link');
		link.id = 'theme-css';
		link.rel = 'stylesheet';
		link.href = `/themes/${themeName}.css`;
		document.head.appendChild(link);

		// Save to localStorage
		localStorage.setItem('selectedTheme', themeName);

		// Update store
		currentTheme.set(themeName);
	}
}

// Initialize theme on load
if (browser) {
	loadTheme(getInitialTheme());
}
