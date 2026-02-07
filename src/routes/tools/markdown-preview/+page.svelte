<script lang="ts">
	import { FileTextIcon, ChevronRightIcon } from 'lucide-svelte';

	let markdown = $state('# Hello World\n\nThis is a **markdown** preview tool.\n\n- List item 1\n- List item 2\n\n[Link](https://example.com)');
	let html = $state('');
	let loading = $state(false);

	async function render() {
		loading = true;

		try {
			const response = await fetch('/api/tools/markdown-preview', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ markdown })
			});

			const data = await response.json();
			html = data.html || '';
		} catch {
			html = '<p class="text-error-500">Failed to render markdown</p>';
		} finally {
			loading = false;
		}
	}

	// Auto-render on mount and changes
	$effect(() => {
		render();
	});
</script>

<div class="container mx-auto px-4 py-8 space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">Markdown Previewer</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<FileTextIcon class="size-8 text-primary-500" />
			<h1 class="text-4xl font-bold">Markdown Previewer</h1>
		</div>
		<p class="text-lg text-surface-600 dark:text-surface-400">
			Write markdown and see a live preview of the rendered HTML.
		</p>
	</div>

	<div class="grid md:grid-cols-2 gap-6">
		<!-- Editor -->
		<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-3">
			<h2 class="text-xl font-bold">Editor</h2>
			<textarea
				bind:value={markdown}
				class="input min-h-96 font-mono text-sm"
				placeholder="# Enter markdown here..."
			></textarea>
		</div>

		<!-- Preview -->
		<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-3">
			<h2 class="text-xl font-bold">Preview</h2>
			<div class="bg-surface-100 dark:bg-surface-800 p-6 rounded-lg min-h-96 prose dark:prose-invert max-w-none">
				{#if loading}
					<p class="text-surface-500">Rendering...</p>
				{:else}
					{@html html}
				{/if}
			</div>
		</div>
	</div>

	<div class="card preset-tonal-surface p-4">
		<h3 class="font-semibold mb-2">Supported Markdown</h3>
		<div class="grid md:grid-cols-2 gap-4 text-sm text-surface-600 dark:text-surface-400">
			<ul class="space-y-1">
				<li>• Headers: <code class="text-xs"># H1</code>, <code class="text-xs">## H2</code></li>
				<li>• Bold: <code class="text-xs">**text**</code></li>
				<li>• Italic: <code class="text-xs">*text*</code></li>
				<li>• Code: <code class="text-xs">`code`</code></li>
			</ul>
			<ul class="space-y-1">
				<li>• Links: <code class="text-xs">[text](url)</code></li>
				<li>• Images: <code class="text-xs">![alt](url)</code></li>
				<li>• Lists: <code class="text-xs">* item</code> or <code class="text-xs">- item</code></li>
			</ul>
		</div>
	</div>
</div>

<style>
	:global(.prose h1) {
		font-size: 1.875rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}
	:global(.prose h2) {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 0.75rem;
	}
	:global(.prose h3) {
		font-size: 1.25rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}
	:global(.prose p) {
		margin-bottom: 1rem;
	}
	:global(.prose a) {
		color: var(--color-primary-500);
		text-decoration: none;
	}
	:global(.prose a:hover) {
		text-decoration: underline;
	}
	:global(.prose code) {
		background-color: var(--color-surface-200);
		padding: 0.125rem 0.25rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
	}
	:global(html[data-mode="dark"] .prose code) {
		background-color: var(--color-surface-700);
	}
	:global(.prose ul) {
		list-style-type: disc;
		list-style-position: inside;
		margin-bottom: 1rem;
	}
	:global(.prose li) {
		margin-bottom: 0.25rem;
	}
	:global(.prose strong) {
		font-weight: 700;
	}
	:global(.prose em) {
		font-style: italic;
	}
	:global(.prose img) {
		max-width: 100%;
		height: auto;
		border-radius: 0.25rem;
	}
</style>
