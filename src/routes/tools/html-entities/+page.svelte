<script lang="ts">
	import { CodeIcon, ArrowLeftRightIcon, ChevronRightIcon } from 'lucide-svelte';

	let mode = $state<'encode' | 'decode'>('encode');
	let input = $state('© 2024 Company™ → Product');
	let result = $state('');
	let error = $state('');
	let loading = $state(false);

	async function convert() {
		if (!input.trim()) {
			error = 'Please enter some text';
			return;
		}

		loading = true;
		error = '';
		result = '';

		try {
			const response = await fetch('/api/tools/html-entities', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ text: input, mode })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Failed to convert';
			} else {
				result = data.result;
			}
		} catch {
			error = 'Failed to convert text';
		} finally {
			loading = false;
		}
	}

	function swap() {
		const temp = input;
		input = result;
		result = temp;
		mode = mode === 'encode' ? 'decode' : 'encode';
	}

	async function copyResult() {
		await navigator.clipboard.writeText(result);
	}

	// Auto-convert on changes
	$effect(() => {
		if (input.trim()) {
			convert();
		}
	});

	const commonEntities = [
		{ entity: '&copy;', char: '©', name: 'Copyright' },
		{ entity: '&reg;', char: '®', name: 'Registered' },
		{ entity: '&trade;', char: '™', name: 'Trademark' },
		{ entity: '&euro;', char: '€', name: 'Euro' },
		{ entity: '&pound;', char: '£', name: 'Pound' },
		{ entity: '&yen;', char: '¥', name: 'Yen' },
		{ entity: '&rarr;', char: '→', name: 'Right Arrow' },
		{ entity: '&larr;', char: '←', name: 'Left Arrow' },
		{ entity: '&hellip;', char: '…', name: 'Ellipsis' }
	];
</script>

<div class="container mx-auto px-4 py-8 space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">HTML Entity Encoder</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<CodeIcon class="size-8 text-primary-500" />
			<h1 class="text-4xl font-bold">HTML Entity Encoder</h1>
		</div>
		<p class="text-lg text-surface-600 dark:text-surface-400">
			Encode special characters to HTML entities and decode them back.
		</p>
	</div>

	<div class="grid md:grid-cols-2 gap-6">
		<!-- Input -->
		<div class="space-y-4">
			<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4">
				<div class="flex gap-2">
					<button
						onclick={() => {
							mode = 'encode';
							convert();
						}}
						class="btn flex-1 {mode === 'encode' ? 'preset-filled-primary-500' : 'preset-tonal'}"
					>
						Encode
					</button>
					<button
						onclick={() => {
							mode = 'decode';
							convert();
						}}
						class="btn flex-1 {mode === 'decode' ? 'preset-filled-primary-500' : 'preset-tonal'}"
					>
						Decode
					</button>
				</div>

				<label class="label">
					<span class="font-semibold mb-2 block">
						{mode === 'encode' ? 'Plain Text' : 'HTML Entities'}
					</span>
					<textarea
						bind:value={input}
						class="input font-mono min-h-[200px]"
						placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter HTML entities to decode...'}
					></textarea>
				</label>

				<button
					onclick={swap}
					class="btn preset-tonal w-full flex items-center justify-center gap-2"
					disabled={!result}
				>
					<ArrowLeftRightIcon class="size-4" />
					Swap Input/Output
				</button>
			</div>

			<div class="card preset-tonal-surface p-4 space-y-2">
				<h3 class="font-semibold">Common HTML Entities</h3>
				<div class="grid grid-cols-3 gap-2 text-xs">
					{#each commonEntities as { entity, char, name }}
						<div class="bg-surface-100 dark:bg-surface-800 p-2 rounded">
							<div class="font-mono">{entity}</div>
							<div class="text-center text-lg my-1">{char}</div>
							<div class="text-surface-600 dark:text-surface-400">{name}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Output -->
		<div class="space-y-4">
			{#if error}
				<div class="card preset-outlined-error-500 bg-error-50 dark:bg-error-950/20 p-6">
					<p class="text-error-700 dark:text-error-400">{error}</p>
				</div>
			{:else if result}
				<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4">
					<div class="flex items-center justify-between">
						<h2 class="text-xl font-bold">Result</h2>
						<button
							onclick={copyResult}
							class="btn btn-sm preset-tonal flex items-center gap-2"
							aria-label="Copy result"
						>
							Copy
						</button>
					</div>

					<textarea
						value={result}
						readonly
						class="input font-mono min-h-[300px]"
					></textarea>
				</div>
			{/if}
		</div>
	</div>
</div>
