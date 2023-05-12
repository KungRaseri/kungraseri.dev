<script lang="ts">
	import type { Album } from '$lib/types';

	export let album: Album;
</script>

<a href={album.url}>
	<div class="card card-hover">
		<img class="bg-black/50 w-full aspect-video" src={album.image} alt={album.title} />
		<header class="card-header">
			<h1 class="h1">{album.title}</h1>
		</header>
		<section class="p-4">{album.description}</section>
	</div>
</a>
