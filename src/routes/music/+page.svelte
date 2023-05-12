<script lang="ts">
	import type { PageData } from './$types';
	import AlbumPanel from '$lib/components/Album.svelte';

	export let data: PageData;
</script>

<div class="w-full sm:w-1/2 sm:mx-auto p-5 grid grid-cols-3 gap-3">
	{#each data.albums as album}
		<AlbumPanel {album} />
	{/each}
</div>
