<script lang="ts">
	import { CodeIcon, CopyIcon, CheckIcon, ChevronRightIcon } from 'lucide-svelte';

	let xml = $state(
		'<?xml version="1.0" encoding="UTF-8"?><root><item><name>Example</name><value>123</value></item></root>'
	);
	let indent = $state(2);
	let result = $state('');
	let error = $state('');
	let loading = $state(false);
	let copied = $state(false);

	async function format() {
		if (!xml.trim()) {
			error = 'Please enter XML data';
			return;
		}

		loading = true;
		error = '';
		result = '';

		try {
			const response = await fetch('/api/tools/xml-formatter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ xml: xml.trim(), indent })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Failed to format';
			} else {
				result = data.result;
			}
		} catch {
			error = 'Failed to format XML';
		} finally {
			loading = false;
		}
	}

	async function copy() {
		await navigator.clipboard.writeText(result);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="container mx-auto px-4 py-8 space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">XML Formatter</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<CodeIcon class="size-8 text-primary-500" />
			<h1 class="text-4xl font-bold">XML Formatter</h1>
		</div>
		<p class="text-lg text-surface-600 dark:text-surface-400">
			Format and beautify XML with customizable indentation.
		</p>
	</div>

	<div class="grid md:grid-cols-2 gap-6">
		<!-- Input -->
		<div class="space-y-4">
			<div
				class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4"
			>
				<label class="label">
					<span class="font-semibold mb-2 block">XML Input</span>
					<textarea
						bind:value={xml}
						class="input min-h-64 font-mono text-sm"
						placeholder="<root><item>...</item></root>"
					></textarea>
				</label>

				<label class="label">
					<div class="flex items-center justify-between mb-2">
						<span class="font-semibold">Indent Spaces</span>
						<span class="text-sm font-mono bg-surface-100 dark:bg-surface-800 px-2 py-1 rounded"
							>{indent}</span
						>
					</div>
					<input
						type="range"
						bind:value={indent}
						min="0"
						max="8"
						step="1"
						class="w-full accent-primary-500"
					/>
				</label>

				<button onclick={format} disabled={loading} class="btn preset-filled-primary-500 w-full">
					{loading ? 'Formatting...' : 'Format XML'}
				</button>
			</div>
		</div>

		<!-- Output -->
		<div class="space-y-4">
			{#if error}
				<div class="card preset-outlined-error-500 bg-error-50 dark:bg-error-950/20 p-6">
					<p class="text-error-700 dark:text-error-400">{error}</p>
				</div>
			{:else if result}
				<div
					class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-3"
				>
					<div class="flex items-center justify-between">
						<h2 class="text-xl font-bold">Formatted XML</h2>
						<button
							onclick={copy}
							class="btn-icon btn-icon-sm hover:preset-tonal"
							aria-label="Copy XML"
						>
							{#if copied}
								<CheckIcon class="size-4 text-success-500" />
							{:else}
								<CopyIcon class="size-4" />
							{/if}
						</button>
					</div>
					<pre
						class="bg-surface-100 dark:bg-surface-800 p-4 rounded-lg overflow-x-auto text-sm font-mono max-h-96">{result}</pre>
				</div>
			{/if}
		</div>
	</div>
</div>
