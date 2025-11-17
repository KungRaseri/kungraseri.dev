<script lang="ts">
	import ThemeSelector from './ThemeSelector.svelte';
	import LightSwitch from './LightSwitch.svelte';

	import DevTo from 'svelte-material-icons/DevTo.svelte';
	import FolderMusic from 'svelte-material-icons/FolderMusic.svelte';
</script>

<nav class="w-full bg-surface-100 dark:bg-surface-900 border-b border-surface-300 dark:border-surface-700">
	<div class="container mx-auto px-4 h-16 flex items-center justify-between">
		<!-- Logo -->
		<a href="/" class="flex items-center">
			<img
				class="h-10 w-auto"
				src="/assets/white_logo_color_background.jpg"
				alt="kungraseri productions logo"
			/>
		</a>

		<!-- Center Nav -->
		<div class="flex gap-2">
			<a href="/projects" class="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors bg-surface-50 dark:bg-surface-800 border-surface-300 dark:border-surface-600 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-900 dark:text-surface-100">
				<span class="mr-2">projects</span>
				<DevTo />
			</a>
			<a href="/music" class="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors bg-surface-50 dark:bg-surface-800 border-surface-300 dark:border-surface-600 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-900 dark:text-surface-100">
				<span class="mr-2">music</span>
				<FolderMusic />
			</a>
		</div>

		<!-- Right Side -->
		<div class="flex items-center gap-2">
			<LightSwitch />
			<ThemeSelector />
			<!-- Uncomment when auth is ready
			{#if isAuthenticated}
				<a href="/" class="btn btn-sm variant-filled-primary">Logout</a>
			{:else}
				<a href="/" class="btn btn-sm variant-filled-primary">Login / Register</a>
			{/if}
			-->
		</div>
	</div>
</nav>
