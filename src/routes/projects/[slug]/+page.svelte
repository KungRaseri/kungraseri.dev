<script lang="ts">
	import type { PageData } from './$types';
	import { ChevronRightIcon, ExternalLinkIcon } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();
	const { project } = data;

	const statusLabel: Record<string, string> = {
		active: 'Active',
		wip: 'In Progress',
		archived: 'Archived'
	};
	const statusColor: Record<string, string> = {
		active: 'preset-tonal-success',
		wip: 'preset-tonal-warning',
		archived: 'preset-tonal'
	};
</script>

<svelte:head>
	<title>{project.title} — KungRaseri Productions</title>
	<meta name="description" content={project.description} />
	<meta property="og:title" content="{project.title} — KungRaseri Productions" />
	<meta property="og:description" content={project.description} />
	<meta property="og:type" content="article" />
	{#if project.image}
		<meta property="og:image" content={project.image} />
	{/if}
</svelte:head>

<div class="relative min-h-screen">
	<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
		<div class="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-primary-500/20 blur-3xl"></div>
		<div class="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-secondary-500/15 blur-3xl"></div>
	</div>

	<div class="relative container mx-auto px-4 py-8 max-w-3xl space-y-8">
		<!-- Breadcrumb -->
		<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
			<a href="/projects" class="hover:text-primary-500 transition-colors">Projects</a>
			<ChevronRightIcon class="size-4" />
			<span class="text-surface-900 dark:text-surface-100">{project.title}</span>
		</nav>

		<!-- Hero card -->
		<div class="card preset-blur overflow-hidden">
			{#if project.image}
				<div class="h-48 md:h-64 bg-surface-900 flex items-center justify-center overflow-hidden">
					<img src={project.image} alt={project.title} class="max-h-full object-contain p-4" />
				</div>
			{:else}
				<div class="h-32 md:h-48 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
					<span class="text-3xl md:text-4xl font-bold text-white text-center px-4">{project.title}</span>
				</div>
			{/if}

			<div class="p-6 md:p-8 space-y-5">
				<div class="flex flex-wrap items-start justify-between gap-3">
					<h1 class="text-2xl md:text-4xl font-bold">{project.title}</h1>
					{#if project.status}
						<span class="chip {statusColor[project.status]}">{statusLabel[project.status]}</span>
					{/if}
				</div>

				<p class="text-lg text-surface-700 dark:text-surface-300 leading-relaxed">
					{project.longDescription ?? project.description}
				</p>

				{#if project.tech && project.tech.length > 0}
					<div class="space-y-2">
						<h3 class="text-sm font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wide">Tech Stack</h3>
						<div class="flex flex-wrap gap-2">
							{#each project.tech as t}
								<span class="chip preset-tonal-primary">{t}</span>
							{/each}
						</div>
					</div>
				{/if}

				<div class="flex flex-wrap gap-3 pt-2">
					{#each project.actions as action}
						<a
							href={action.href}
							target="_blank"
							class="btn preset-filled-primary-500 flex items-center gap-2 transition-all duration-200"
						>
							{action.text}
							<ExternalLinkIcon class="size-4" />
						</a>
					{/each}
				</div>
			</div>
		</div>

		<a href="/projects" class="btn preset-tonal flex items-center gap-2 w-fit transition-all duration-200">
			← Back to Projects
		</a>
	</div>
</div>
