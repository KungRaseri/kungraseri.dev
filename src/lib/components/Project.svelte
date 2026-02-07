<script lang="ts">
	import type { Project } from '$lib/types';

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();
</script>

<div class="card card-hover preset-filled-surface-100-900 overflow-hidden">
	<a href={project.url} class="block h-56 sm:h-64 overflow-hidden bg-surface-900">
		{#if project.image}
			<img class="w-full h-full object-contain" src={project.image} alt={project.title} />
		{:else}
			<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-500">
				<span class="text-2xl sm:text-3xl font-bold text-primary-contrast-500 text-center px-4">{project.title}</span>
			</div>
		{/if}
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
