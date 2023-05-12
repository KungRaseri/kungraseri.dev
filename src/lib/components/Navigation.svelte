<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';

	import Theater from 'svelte-material-icons/Theater.svelte';
	import DevTo from 'svelte-material-icons/DevTo.svelte';
	import FolderMusic from 'svelte-material-icons/FolderMusic.svelte';
	import GamepadVariant from 'svelte-material-icons/GamepadVariant.svelte';

	export let isAuthenticated: boolean = false;

	function loginClicked() {}

	function logoutClicked() {}
</script>

<AppBar app dense>
	<svelte:fragment slot="lead">
		<a href="/" class="btn">
			<img
				class="h-10"
				src="assets/white_logo_transparent_background.png"
				alt="kungraseri productions logo"
			/>
		</a>
	</svelte:fragment>
	<div>
		<a href="/stream" class="btn">
			<span class="mr-2">stream</span>
			<Theater />
		</a>
		<a href="/projects" class="btn">
			<span class="mr-2">projects</span>
			<DevTo />
		</a>
		<a href="/games" class="btn">
			<span class="mr-2">games</span>
			<GamepadVariant />
		</a>
		<a href="/music" class="btn">
			<span class="mr-2">music</span>
			<FolderMusic />
		</a>
	</div>
	<svelte:fragment slot="trail">
		<div class="row wrap justify-end">
			{#if isAuthenticated}
				<a href="/" class="btn-sm">Logout</a>
			{:else}
				<a href="/" class="btn-sm">Login / Register</a>
			{/if}
		</div>
	</svelte:fragment>
</AppBar>
