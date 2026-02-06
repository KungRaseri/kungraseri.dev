<script lang="ts">
	import { FingerprintIcon, CopyIcon, CheckIcon, RefreshCwIcon, ChevronRightIcon } from 'lucide-svelte';
	
	let uuids = $state<string[]>([]);
	let count = $state(1);
	let copiedIndex = $state<number | null>(null);
	let copiedAll = $state(false);
	let isGenerating = $state(false);

	async function generate() {
		isGenerating = true;
		try {
			const response = await fetch('/api/tools/uuid', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ count, version: 4 })
			});

			const data = await response.json();
			uuids = data.uuids;
		} catch (err) {
			console.error('Failed to generate UUIDs:', err);
		} finally {
			isGenerating = false;
		}
	}

	async function copyUuid(uuid: string, index: number) {
		try {
			await navigator.clipboard.writeText(uuid);
			copiedIndex = index;
			setTimeout(() => copiedIndex = null, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	async function copyAll() {
		if (uuids.length === 0) return;
		
		try {
			await navigator.clipboard.writeText(uuids.join('\n'));
			copiedAll = true;
			setTimeout(() => copiedAll = false, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}
</script>

<svelte:head>
	<title>UUID Generator - Tools</title>
	<meta name="description" content="Generate UUID/GUID v4 identifiers" />
</svelte:head>

<div class="container mx-auto px-4 py-8 space-y-6 max-w-4xl">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">UUID Generator</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<FingerprintIcon class="size-8 text-primary-500" />
			<h1 class="text-3xl font-bold">UUID Generator</h1>
		</div>
		<p class="text-surface-700 dark:text-surface-300">
			Generate universally unique identifiers (UUID v4)
		</p>
	</div>

	<!-- Controls -->
	<div class="card preset-tonal-surface p-6 space-y-4">
		<div class="space-y-2">
			<div class="label">
				<span class="font-semibold">Number of UUIDs</span>
			</div>
			<input
				type="number"
				min="1"
				max="100"
				bind:value={count}
				class="input max-w-xs"
			/>
			<p class="text-sm text-surface-600 dark:text-surface-400">
				Generate 1-100 UUIDs at once
			</p>
		</div>

		<div class="flex gap-2">
			<button
				onclick={generate}
				disabled={isGenerating}
				class="btn preset-filled-primary flex items-center gap-2"
			>
				<RefreshCwIcon class="size-5" />
				<span>Generate</span>
			</button>
			{#if uuids.length > 0}
				<button
					onclick={copyAll}
					class="btn preset-tonal flex items-center gap-2"
				>
					{#if copiedAll}
						<CheckIcon class="size-5 text-success-500" />
						<span>Copied!</span>
					{:else}
						<CopyIcon class="size-5" />
						<span>Copy All</span>
					{/if}
				</button>
			{/if}
		</div>
	</div>

	<!-- Results -->
	{#if uuids.length > 0}
		<div class="space-y-3">
			<h2 class="text-xl font-bold">Generated UUIDs</h2>
			<div class="space-y-2">
				{#each uuids as uuid, index}
					<div class="card preset-outlined p-4 flex items-center justify-between gap-4">
						<code class="font-mono text-sm flex-1">{uuid}</code>
						<button
							onclick={() => copyUuid(uuid, index)}
							class="btn-icon btn-icon-sm hover:preset-tonal shrink-0"
						>
							{#if copiedIndex === index}
								<CheckIcon class="size-4 text-success-500" />
							{:else}
								<CopyIcon class="size-4" />
							{/if}
						</button>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<div class="card preset-tonal-surface p-12 text-center">
			<p class="text-surface-600 dark:text-surface-400">
				Click "Generate" to create UUIDs
			</p>
		</div>
	{/if}
</div>
