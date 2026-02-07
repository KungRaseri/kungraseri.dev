<script lang="ts">
	import { LinkIcon, ChevronRightIcon } from 'lucide-svelte';

	let input = $state('Hello World! This is a Test');
	let separator = $state('-');
	let result = $state('');
	let error = $state('');
	let loading = $state(false);

	async function generate() {
		if (!input.trim()) {
			error = 'Please enter some text';
			return;
		}

		loading = true;
		error = '';
		result = '';

		try {
			const response = await fetch('/api/tools/slug-generator', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ text: input, separator })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Failed to generate slug';
			} else {
				result = data.slug;
			}
		} catch {
			error = 'Failed to generate slug';
		} finally {
			loading = false;
		}
	}

	async function copyResult() {
		await navigator.clipboard.writeText(result);
	}

	// Auto-generate on changes
	$effect(() => {
		if (input.trim()) {
			generate();
		}
	});
</script>

<div class="container mx-auto px-4 py-8 space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">URL Slug Generator</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<LinkIcon class="size-8 text-primary-500" />
			<h1 class="text-4xl font-bold">URL Slug Generator</h1>
		</div>
		<p class="text-lg text-surface-600 dark:text-surface-400">
			Convert text into URL-friendly slugs for clean, readable URLs.
		</p>
	</div>

	<div class="grid md:grid-cols-2 gap-6">
		<!-- Input -->
		<div class="space-y-4">
			<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4">
				<label class="label">
					<span class="font-semibold mb-2 block">Input Text</span>
					<textarea
						bind:value={input}
						class="input font-mono min-h-[150px]"
						placeholder="Enter text to convert to a slug..."
					></textarea>
				</label>

				<label class="label">
					<span class="font-semibold mb-2 block">Separator</span>
					<div class="flex gap-2">
						<button
							onclick={() => (separator = '-')}
							class="btn flex-1 {separator === '-' ? 'preset-filled-primary-500' : 'preset-tonal'}"
						>
							Hyphen (-)
						</button>
						<button
							onclick={() => (separator = '_')}
							class="btn flex-1 {separator === '_' ? 'preset-filled-primary-500' : 'preset-tonal'}"
						>
							Underscore (_)
						</button>
						<button
							onclick={() => (separator = '.')}
							class="btn flex-1 {separator === '.' ? 'preset-filled-primary-500' : 'preset-tonal'}"
						>
							Dot (.)
						</button>
					</div>
				</label>
			</div>

			<div class="card preset-tonal-surface p-4 space-y-2">
				<h3 class="font-semibold">What is a URL Slug?</h3>
				<p class="text-sm text-surface-600 dark:text-surface-400">
					A slug is the part of a URL that identifies a page in human-readable keywords. For
					example: <code class="font-mono text-xs">example.com/blog/<strong>this-is-a-slug</strong></code>
				</p>
				<ul class="text-sm text-surface-600 dark:text-surface-400 space-y-1">
					<li>• Lowercase letters only</li>
					<li>• No special characters</li>
					<li>• Spaces replaced with separators</li>
					<li>• SEO-friendly</li>
				</ul>
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
						<h2 class="text-xl font-bold">Generated Slug</h2>
						<button
							onclick={copyResult}
							class="btn btn-sm preset-tonal flex items-center gap-2"
							aria-label="Copy slug"
						>
							Copy
						</button>
					</div>

					<div class="bg-surface-100 dark:bg-surface-800 p-4 rounded-lg">
						<div class="font-mono text-lg break-all">{result}</div>
					</div>

					<div class="bg-surface-100 dark:bg-surface-800 p-4 rounded-lg">
						<div class="text-xs text-surface-600 dark:text-surface-400 mb-2">Preview URL</div>
						<div class="font-mono text-sm break-all text-primary-500">
							https://example.com/blog/{result}
						</div>
					</div>

					<div class="grid grid-cols-2 gap-3">
						<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
							<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Length</div>
							<div class="text-lg font-bold">{result.length}</div>
						</div>
						<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
							<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Separator</div>
							<div class="text-lg font-bold font-mono">{separator}</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
