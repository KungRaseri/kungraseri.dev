<script lang="ts">
	import type { Album } from '$lib/types';

	interface Props {
		album: Album;
	}

	let { album }: Props = $props();
</script>

<a href={album.url}>
	<div class="card card-hover preset-filled-surface-100-900 overflow-hidden">
		<img class="bg-black/50 w-full aspect-video" src={album.image} alt={album.title} />
		<header class="card-header">
			<h1 class="h1">{album.title}</h1>
		</header>
		<section class="p-4">{album.description}</section>
	</div>
</a>
