<script lang="ts">
	import type { Album } from '$lib/types';

	interface Props {
		album: Album;
	}

	let { album }: Props = $props();
</script>

<a href={album.url}>
	<div class="card card-hover preset-filled-surface-100-900 overflow-hidden">
		<div class="h-56 sm:h-64 overflow-hidden bg-surface-900">
			{#if album.image}
				<img class="w-full h-full object-contain" src={album.image} alt={album.title} />
			{:else}
				<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-500">
					<span class="text-2xl sm:text-3xl font-bold text-primary-contrast-500 text-center px-4">{album.title}</span>
				</div>
			{/if}
		</div>
		<header class="card-header">
			<h1 class="h1">{album.title}</h1>
		</header>
		<section class="p-4">{album.description}</section>
	</div>
</a>
