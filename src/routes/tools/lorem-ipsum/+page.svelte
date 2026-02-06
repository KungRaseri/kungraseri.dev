<script lang="ts">
	import { TypeIcon, CopyIcon, CheckIcon, SparklesIcon, ChevronRightIcon } from 'lucide-svelte';
	
	type GeneratorType = 'paragraphs' | 'sentences' | 'words';
	
	let output = $state('');
	let type = $state<GeneratorType>('paragraphs');
	let count = $state(3);
	let copied = $state(false);
	let isGenerating = $state(false);

	async function generate() {
		isGenerating = true;
		try {
			const response = await fetch('/api/tools/lorem-ipsum', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ type, count })
			});

			const data = await response.json();
			
			if (data.error) {
				output = `Error: ${data.error}`;
			} else {
				output = data.result;
			}
		} catch (err) {
			console.error('Failed to generate:', err);
			output = 'Error generating lorem ipsum';
		} finally {
			isGenerating = false;
		}
	}

	async function copyOutput() {
		if (!output) return;
		
		try {
			await navigator.clipboard.writeText(output);
			copied = true;
			setTimeout(() => copied = false, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}
</script>

<svelte:head>
	<title>Lorem Ipsum Generator - Tools</title>
	<meta name="description" content="Generate placeholder text for designs and mockups" />
</svelte:head>

<div class="container mx-auto px-4 py-8 space-y-6 max-w-4xl">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">Lorem Ipsum Generator</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<TypeIcon class="size-8 text-primary-500" />
			<h1 class="text-3xl font-bold">Lorem Ipsum Generator</h1>
		</div>
		<p class="text-surface-700 dark:text-surface-300">
			Generate placeholder text for designs and mockups
		</p>
	</div>

	<!-- Controls -->
	<div class="card preset-tonal-surface p-6 space-y-4">
		<div class="space-y-2">
			<div class="label">
				<span class="font-semibold">Type</span>
			</div>
			<div class="flex gap-2">
				<button
					onclick={() => { type = 'paragraphs'; output = ''; }}
					class="btn {type === 'paragraphs' ? 'preset-filled-primary' : 'preset-tonal'}"
				>
					Paragraphs
				</button>
				<button
					onclick={() => { type = 'sentences'; output = ''; }}
					class="btn {type === 'sentences' ? 'preset-filled-primary' : 'preset-tonal'}"
				>
					Sentences
				</button>
				<button
					onclick={() => { type = 'words'; output = ''; }}
					class="btn {type === 'words' ? 'preset-filled-primary' : 'preset-tonal'}"
				>
					Words
				</button>
			</div>
		</div>

		<div class="space-y-2">
			<div class="label">
				<span class="font-semibold">Count</span>
			</div>
			<input
				type="number"
				min="1"
				max="100"
				bind:value={count}
				class="input max-w-xs"
			/>
			<p class="text-sm text-surface-600 dark:text-surface-400">
				{#if type === 'paragraphs'}
					Generate 1-100 paragraphs
				{:else if type === 'sentences'}
					Generate 1-100 sentences
				{:else}
					Generate 1-100 words
				{/if}
			</p>
		</div>

		<button
			onclick={generate}
			disabled={isGenerating}
			class="btn preset-filled-primary flex items-center gap-2"
		>
			<SparklesIcon class="size-5" />
			<span>Generate</span>
		</button>
	</div>

	<!-- Output -->
	{#if output}
		<div class="space-y-3">
			<div class="flex items-center justify-between">
				<h2 class="text-xl font-bold">Generated Text</h2>
				<button
					onclick={copyOutput}
					class="btn preset-tonal flex items-center gap-2"
				>
					{#if copied}
						<CheckIcon class="size-5 text-success-500" />
						<span>Copied!</span>
					{:else}
						<CopyIcon class="size-5" />
						<span>Copy</span>
					{/if}
				</button>
			</div>
			<div class="card preset-outlined p-6">
				<p class="text-surface-900 dark:text-surface-100 whitespace-pre-wrap leading-relaxed">
					{output}
				</p>
			</div>
		</div>
	{:else}
		<div class="card preset-tonal-surface p-12 text-center">
			<p class="text-surface-600 dark:text-surface-400">
				Configure options and click "Generate" to create placeholder text
			</p>
		</div>
	{/if}
</div>
