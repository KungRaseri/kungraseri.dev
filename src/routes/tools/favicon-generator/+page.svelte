<script lang="ts">
	import { ImageIcon, DownloadIcon, ChevronRightIcon } from 'lucide-svelte';

	let text = $state('');
	let bgColor = $state('#4F46E5');
	let textColor = $state('#FFFFFF');
	let size = $state(32);
	let result = $state<{ dataUrl?: string; svg?: string; error?: string }>({});
	let loading = $state(false);

	async function generate() {
		if (!text.trim()) {
			result = { error: 'Please enter text' };
			return;
		}

		loading = true;
		result = {};

		try {
			const response = await fetch('/api/tools/favicon-generator', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ text: text.trim(), bgColor, textColor, size })
			});

			const data = await response.json();

			if (!response.ok) {
				result = { error: data.error || 'Failed to generate' };
			} else {
				result = data;
			}
		} catch {
			result = { error: 'Failed to generate favicon' };
		} finally {
			loading = false;
		}
	}

	function download() {
		if (!result.dataUrl) return;

		const link = document.createElement('a');
		link.href = result.dataUrl;
		link.download = `favicon-${size}x${size}.svg`;
		link.click();
	}

	// Auto-generate on changes
	$effect(() => {
		if (text.trim()) {
			generate();
		}
	});
</script>

<div class="container mx-auto px-4 py-8 space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">Favicon Generator</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<ImageIcon class="size-8 text-primary-500" />
			<h1 class="text-4xl font-bold">Favicon Generator</h1>
		</div>
		<p class="text-lg text-surface-600 dark:text-surface-400">
			Generate SVG favicons from text with customizable colors and sizes.
		</p>
	</div>

	<div class="grid md:grid-cols-2 gap-6">
		<!-- Settings -->
		<div class="space-y-4">
			<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4">
				<label class="label">
					<span class="font-semibold mb-2 block">Text</span>
					<input
						type="text"
						bind:value={text}
						class="input"
						placeholder="Enter text (first letter will be used)"
						maxlength="10"
					/>
				</label>

				<div class="grid grid-cols-2 gap-4">
					<label class="label">
						<span class="font-semibold mb-2 block">Background Color</span>
						<div class="flex gap-2">
							<input type="color" bind:value={bgColor} class="size-10 rounded cursor-pointer" />
							<input
								type="text"
								bind:value={bgColor}
								class="input font-mono text-sm"
								placeholder="#4F46E5"
							/>
						</div>
					</label>

					<label class="label">
						<span class="font-semibold mb-2 block">Text Color</span>
						<div class="flex gap-2">
							<input type="color" bind:value={textColor} class="size-10 rounded cursor-pointer" />
							<input
								type="text"
								bind:value={textColor}
								class="input font-mono text-sm"
								placeholder="#FFFFFF"
							/>
						</div>
					</label>
				</div>

				<label class="label">
					<div class="flex items-center justify-between mb-2">
						<span class="font-semibold">Size</span>
						<span class="text-sm font-mono bg-surface-100 dark:bg-surface-800 px-2 py-1 rounded"
							>{size}px</span
						>
					</div>
					<input
						type="range"
						bind:value={size}
						min="16"
						max="512"
						step="16"
						class="w-full accent-primary-500"
					/>
				</label>
			</div>

			<div class="card preset-tonal-surface p-4 space-y-2">
				<h3 class="font-semibold">Common Sizes</h3>
				<div class="flex flex-wrap gap-2">
					{#each [16, 32, 48, 64, 128, 256] as presetSize}
						<button onclick={() => (size = presetSize)} class="chip preset-tonal">
							{presetSize}px
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Preview -->
		<div class="space-y-4">
			{#if result.error}
				<div class="card preset-outlined-error-500 bg-error-50 dark:bg-error-950/20 p-6">
					<p class="text-error-700 dark:text-error-400">{result.error}</p>
				</div>
			{:else if result.dataUrl}
				<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4">
					<h2 class="text-xl font-bold">Preview</h2>
					<div
						class="bg-surface-100 dark:bg-surface-800 p-8 rounded-lg flex items-center justify-center"
					>
						<img src={result.dataUrl} alt="Favicon preview" class="shadow-lg" />
					</div>

					<button
						onclick={download}
						class="btn preset-filled-primary-500 w-full flex items-center justify-center gap-2"
					>
						<DownloadIcon class="size-4" />
						Download SVG
					</button>
				</div>

				{#if result.svg}
					<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-3">
						<h2 class="text-xl font-bold">SVG Code</h2>
						<pre
							class="bg-surface-100 dark:bg-surface-800 p-4 rounded-lg overflow-x-auto text-xs font-mono">{result.svg}</pre>
					</div>
				{/if}
			{/if}
		</div>
	</div>
</div>
