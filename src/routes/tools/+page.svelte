<script lang="ts">
	import {
		WrenchIcon,
		KeyRoundIcon,
		PaletteIcon,
		CodeIcon,
		TypeIcon,
		LockKeyholeIcon,
		QrCodeIcon
	} from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Map icon names to components
	const iconMap: Record<string, any> = {
		KeyRound: KeyRoundIcon,
		Palette: PaletteIcon,
		Code: CodeIcon,
		Type: TypeIcon,
		LockKeyhole: LockKeyholeIcon,
		QrCode: QrCodeIcon
	};
</script>

<svelte:head>
	<title>Tools - KungRaseri.dev</title>
	<meta name="description" content="Useful web development tools and utilities" />
</svelte:head>

<div class="container mx-auto px-4 py-8 space-y-8">
	<!-- Header -->
	<div class="space-y-4">
		<div class="flex items-center gap-3">
			<WrenchIcon class="size-10 text-primary-500" />
			<h1 class="text-4xl font-bold">Tools</h1>
		</div>
		<p class="text-xl text-surface-700 dark:text-surface-300">
			A collection of useful web development tools and utilities
		</p>
	</div>

	<!-- Tools Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each data.tools as tool}
			{@const Icon = iconMap[tool.icon]}
			<a
				href="/tools/{tool.slug}"
				class="card preset-outlined-surface-200 hover:preset-tonal-primary p-6 space-y-3 transition-all duration-200"
			>
				<div class="flex items-start justify-between">
					<div class="flex items-center gap-3">
						<div class="preset-filled-primary p-2 rounded-lg">
							<Icon class="size-6" />
						</div>
						<h2 class="text-xl font-bold">{tool.title}</h2>
					</div>
				</div>
				<p class="text-surface-700 dark:text-surface-300">
					{tool.description}
				</p>
				<div class="flex flex-wrap gap-2">
					{#each tool.tags as tag}
						<span class="chip preset-tonal text-sm">{tag}</span>
					{/each}
				</div>
			</a>
		{/each}
	</div>
</div>
