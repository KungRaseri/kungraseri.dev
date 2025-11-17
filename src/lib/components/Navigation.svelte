<script lang="ts">
	import ThemeSelector from './ThemeSelector.svelte';
	import LightSwitch from './LightSwitch.svelte';

	import DevTo from 'svelte-material-icons/DevTo.svelte';
	import FolderMusic from 'svelte-material-icons/FolderMusic.svelte';
</script>

<nav class="w-full bg-surface-100 dark:bg-surface-900 border-b border-surface-300 dark:border-surface-700">
	<div class="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
		<!-- Logo -->
		<a href="/" class="flex items-center flex-shrink-0">
			<img
				class="h-10 w-auto"
				src="/assets/white_logo_color_background.jpg"
				alt="kungraseri productions logo"
			/>
		</a>

		<!-- Center Nav -->
		<div class="flex gap-2 flex-1 justify-center">
			<a href="/projects" class="btn preset-tonal">
				<span>projects</span>
				<DevTo />
			</a>
			<a href="/music" class="btn preset-tonal">
				<span>music</span>
				<FolderMusic />
			</a>
		</div>

		<!-- Right Side -->
		<div class="flex items-center gap-2 flex-shrink-0">
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
