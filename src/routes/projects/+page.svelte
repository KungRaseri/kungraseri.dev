<script lang="ts">
	import type { PageData } from './$types';
	import ProjectPanel from '$lib/components/Project.svelte';

	export let data: PageData;
</script>

<div class="relative min-h-screen">
	<!-- Decorative gradient blobs for backdrop-filter to blur through -->
	<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
		<div class="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary-500/20 blur-3xl"></div>
		<div class="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-secondary-500/20 blur-3xl"></div>
		<div class="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-tertiary-500/15 blur-3xl"></div>
	</div>
	<div class="relative w-full sm:w-3/4 sm:mx-auto p-2 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
		{#each data.projects as project}
			<ProjectPanel {project} />
		{/each}
	</div>
</div>
