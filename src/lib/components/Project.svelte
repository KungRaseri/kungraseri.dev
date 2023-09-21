<script lang="ts">
	import type { Project } from '$lib/types';

	export let project: Project;
</script>

<div class="card card-hover">
	<a href={project.url}>
		<img class="bg-black/50 w-full aspect-video" src={project.image} alt={project.title} />
	</a>
	<header class="card-header">
		<h1 class="h2 sm:h1">{project.title}</h1>
	</header>
	<section class="p-4">{project.description}</section>

	<footer class="card-footer">
		<div class="btn-group flex justify-center gap-1">
			{#each project.actions as action}
				<a href={action.href} class="btn btn-sm variant-soft-secondary">{action.text}</a>
			{/each}
		</div>
	</footer>
</div>
