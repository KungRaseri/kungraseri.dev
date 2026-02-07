<script lang="ts">
	import {
		WrenchIcon,
		KeyRoundIcon,
		PaletteIcon,
		CodeIcon,
		TypeIcon,
		LockKeyholeIcon,
		QrCodeIcon,
		SearchIcon,
		LinkIcon,
		FingerprintIcon,
		SearchCodeIcon,
		DiffIcon,
		KeySquareIcon,
		BinaryIcon,
		LockIcon,
		FileTextIcon,
		ClockIcon,
		ImageIcon,
		FileJsonIcon,
		TableIcon,
		FileCodeIcon
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
		QrCode: QrCodeIcon,
		Link: LinkIcon,
		Fingerprint: FingerprintIcon,
		SearchCode: SearchCodeIcon,
		Diff: DiffIcon,
		KeySquare: KeySquareIcon,
		Binary: BinaryIcon,
		Lock: LockIcon,
		FileText: FileTextIcon,
		Clock: ClockIcon,
		Image: ImageIcon,
		FileJson: FileJsonIcon,
		Table: TableIcon,
		FileCode: FileCodeIcon
	};

	let searchQuery = $state('');

	// Filter tools based on search
	const filteredTools = $derived(() => {
		if (!searchQuery.trim()) return data.tools;
		
		const query = searchQuery.toLowerCase();
		return data.tools.filter(tool => 
			tool.title.toLowerCase().includes(query) ||
			tool.description.toLowerCase().includes(query) ||
			tool.tags.some(tag => tag.toLowerCase().includes(query)) ||
			tool.category.toLowerCase().includes(query)
		);
	});

	// Get filtered categories
	const filteredCategories = $derived(() => {
		const tools = filteredTools();
		return tools.reduce((acc, tool) => {
			if (!acc[tool.category]) {
				acc[tool.category] = [];
			}
			acc[tool.category].push(tool);
			return acc;
		}, {} as Record<string, typeof data.tools>);
	});

	const categoryOrder = ['Security', 'Design', 'Development', 'Generators', 'Encoders', 'Converters'];
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

	<!-- Search Bar -->
	<div class="max-w-2xl">
		<div class="relative">
			<SearchIcon class="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-surface-500" />
			<input
				type="text"
				placeholder="Search tools..."
				bind:value={searchQuery}
				class="input w-full pl-12 preset-outlined"
			/>
		</div>
	</div>

	<!-- Categories -->
	<div class="space-y-8">
		{#each categoryOrder as categoryName}
			{@const categoryTools = filteredCategories()[categoryName]}
			{#if categoryTools && categoryTools.length > 0}
				<section class="space-y-4">
					<h2 class="text-2xl font-bold text-primary-500">{categoryName}</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each categoryTools as tool}
							{@const Icon = iconMap[tool.icon]}
							<a
								href="/tools/{tool.slug}"
								class="card preset-outlined hover:preset-tonal-primary p-6 space-y-3 transition-all duration-200"
							>
								<div class="flex items-start gap-3">
									<div class="preset-filled-primary p-2 rounded-lg shrink-0">
										<Icon class="size-6" />
									</div>
									<div class="space-y-2 flex-1 min-w-0">
										<h3 class="text-xl font-bold">{tool.title}</h3>
										<p class="text-surface-700 dark:text-surface-300 text-sm">
											{tool.description}
										</p>
									</div>
								</div>
								<div class="flex flex-wrap gap-2">
									{#each tool.tags as tag}
										<span class="chip preset-tonal text-xs">{tag}</span>
									{/each}
								</div>
							</a>
						{/each}
					</div>
				</section>
			{/if}
		{/each}
		
		{#if Object.keys(filteredCategories()).length === 0}
			<div class="text-center py-12">
				<p class="text-xl text-surface-600 dark:text-surface-400">
					No tools found matching "{searchQuery}"
				</p>
			</div>
		{/if}
	</div>
</div>
