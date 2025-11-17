<script lang="ts">
	import type { Project } from '$lib/types';

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();
</script>

<div class="card card-hover preset-filled-surface-100-900 overflow-hidden">
	<a href={project.url}>
		<img class="bg-black/50 w-full aspect-video" src={project.image} alt={project.title} />
	</a>
	<header class="card-header">
		<h1 class="h2 sm:h1">{project.title}</h1>
	</header>
	<section class="p-4">{project.description}</section>

	<footer class="card-footer">
		<div class="flex justify-center gap-2">
			{#each project.actions as action}
				<a href={action.href} class="btn btn-sm preset-tonal-secondary hover:preset-filled-primary-500 transition-all duration-200">{action.text}</a>
			{/each}
		</div>
	</footer>
</div>
