<script lang="ts">
	import type { PageData } from './$types';
	import AlbumPanel from '$lib/components/Album.svelte';

	export let data: PageData;
</script>

<div class="w-full sm:w-3/4 sm:mx-auto p-2 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
	{#each data.albums as album}
		<AlbumPanel {album} />
	{/each}
</div>
