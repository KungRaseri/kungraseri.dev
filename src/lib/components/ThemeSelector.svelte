<script lang="ts">
	import { currentTheme, themes, loadTheme, type ThemeName } from '$lib/stores/theme';

	let showDropdown = $state(false);

	function selectTheme(themeName: ThemeName) {
		loadTheme(themeName);
		showDropdown = false;
	}

	function toggleDropdown() {
		showDropdown = !showDropdown;
	}

	function clickOutside(node: HTMLElement) {
		const handleClick = (event: MouseEvent) => {
			if (!node.contains(event.target as Node)) {
				showDropdown = false;
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}
</script>

<div class="relative" use:clickOutside>
	<button
		onclick={toggleDropdown}
		class="btn-icon btn-icon-lg hover:preset-tonal"
		aria-label="Select Theme"
		title="Select Theme"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
			/>
		</svg>
	</button>

	{#if showDropdown}
		<div
			class="card absolute right-0 mt-2 w-72 preset-filled-surface-100-900 rounded-lg shadow-xl z-50 overflow-hidden border border-surface-300 dark:border-surface-700"
		>
			<div class="p-2">
				<h3 class="px-3 py-2 text-sm font-semibold text-surface-900 dark:text-surface-100">Select Theme</h3>
				{#each Object.entries(themes) as [key, theme]}
					<button
						onclick={() => selectTheme(key as ThemeName)}
						class="w-full text-left px-3 py-2 rounded-md hover:preset-tonal"
						class:preset-filled-primary-500={$currentTheme === key}
					>
						<div class="font-medium">{theme.name}</div>
						<div class="text-xs opacity-75 mt-0.5">{theme.description}</div>
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
