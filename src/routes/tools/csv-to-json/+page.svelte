<script lang="ts">
	import { FileJsonIcon, CopyIcon, CheckIcon, ChevronRightIcon } from 'lucide-svelte';

	let csv = $state('name,email,age\nJohn Doe,john@example.com,30\nJane Smith,jane@example.com,25');
	let delimiter = $state(',');
	let pretty = $state(true);
	let result = $state('');
	let count = $state(0);
	let error = $state('');
	let loading = $state(false);
	let copied = $state(false);

	async function convert() {
		if (!csv.trim()) {
			error = 'Please enter CSV data';
			return;
		}

		loading = true;
		error = '';
		result = '';

		try {
			const response = await fetch('/api/tools/csv-to-json', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ csv: csv.trim(), delimiter, pretty })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Failed to convert';
			} else {
				result = data.result;
				count = data.count;
			}
		} catch {
			error = 'Failed to convert CSV';
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
		<span class="text-surface-900 dark:text-surface-100">CSV to JSON</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<FileJsonIcon class="size-8 text-primary-500" />
			<h1 class="text-4xl font-bold">CSV to JSON Converter</h1>
		</div>
		<p class="text-lg text-surface-600 dark:text-surface-400">
			Convert CSV data to JSON format with customizable delimiters.
		</p>
	</div>

	<div class="grid md:grid-cols-2 gap-6">
		<!-- Input -->
		<div class="space-y-4">
			<div
				class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4"
			>
				<label class="label">
					<span class="font-semibold mb-2 block">CSV Input</span>
					<textarea
						bind:value={csv}
						class="input min-h-64 font-mono text-sm"
						placeholder="name,email,age&#10;John Doe,john@example.com,30"
					></textarea>
				</label>

				<div class="flex gap-4">
					<label class="label flex-1">
						<span class="font-semibold mb-2 block">Delimiter</span>
						<input
							type="text"
							bind:value={delimiter}
							class="input font-mono text-center"
							maxlength="1"
						/>
					</label>

					<label class="label flex items-center gap-2">
						<input type="checkbox" bind:checked={pretty} class="checkbox" />
						<span class="font-semibold">Pretty Print</span>
					</label>
				</div>

				<button onclick={convert} disabled={loading} class="btn preset-filled-primary-500 w-full">
					{loading ? 'Converting...' : 'Convert to JSON'}
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
						<div>
							<h2 class="text-xl font-bold">JSON Output</h2>
							<p class="text-sm text-surface-600 dark:text-surface-400">
								{count}
								{count === 1 ? 'row' : 'rows'}
							</p>
						</div>
						<button
							onclick={copy}
							class="btn-icon btn-icon-sm hover:preset-tonal"
							aria-label="Copy JSON"
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
