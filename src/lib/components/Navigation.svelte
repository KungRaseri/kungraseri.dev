<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import ThemeSelector from './ThemeSelector.svelte';
	import LightSwitch from './LightSwitch.svelte';

	import DevTo from 'svelte-material-icons/DevTo.svelte';
	import FolderMusic from 'svelte-material-icons/FolderMusic.svelte';
</script>

<AppBar background="bg-surface-100-800-token" border="border-b border-surface-300-700-token">
	<svelte:fragment slot="lead">
		<a href="/" class="btn variant-ghost-surface">
			<img
				class="h-10"
				src="assets/white_logo_color_background.png"
				alt="kungraseri productions logo"
			/>
		</a>
	</svelte:fragment>
	<div class="flex gap-2">
		<a href="/projects" class="btn variant-ghost-surface">
			<span class="mr-2">projects</span>
			<DevTo />
		</a>
		<a href="/music" class="btn variant-ghost-surface">
			<span class="mr-2">music</span>
			<FolderMusic />
		</a>
	</div>
	<svelte:fragment slot="trail">
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
	</svelte:fragment>
</AppBar>
