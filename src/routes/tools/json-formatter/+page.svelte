<script lang="ts">
	import { CodeIcon, CopyIcon, CheckIcon, MinimizeIcon, MaximizeIcon, ChevronRightIcon } from 'lucide-svelte';
	
	let input = $state('');
	let output = $state('');
	let error = $state('');
	let copied = $state(false);
	let indent = $state(2);
	let isProcessing = $state(false);
	
	async function formatJSON() {
		if (!input.trim()) {
			output = '';
			error = '';
			return;
		}
		
		isProcessing = true;
		try {
			const response = await fetch('/api/tools/json-formatter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					text: input,
					action: 'format',
					indent
				})
			});

			const data = await response.json();
			
			if (data.error) {
				error = data.error;
				output = '';
			} else {
				output = data.result;
				error = '';
			}
		} catch (err) {
			console.error('Failed to format JSON:', err);
			error = 'Failed to format JSON';
			output = '';
		} finally {
			isProcessing = false;
		}
	}
	
	async function minifyJSON() {
		if (!input.trim()) {
			output = '';
			error = '';
			return;
		}
		
		isProcessing = true;
		try {
			const response = await fetch('/api/tools/json-formatter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					text: input,
					action: 'minify'
				})
			});

			const data = await response.json();
			
			if (data.error) {
				error = data.error;
				output = '';
			} else {
				output = data.result;
				error = '';
			}
		} catch (err) {
			console.error('Failed to minify JSON:', err);
			error = 'Failed to minify JSON';
			output = '';
		} finally {
			isProcessing = false;
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
	
	function loadSample() {
		input = JSON.stringify({
			name: "John Doe",
			age: 30,
			email: "john@example.com",
			address: {
				street: "123 Main St",
				city: "Springfield",
				zip: "12345"
			},
			hobbies: ["reading", "coding", "gaming"]
		}, null, 2);
		formatJSON();
	}
</script>

<svelte:head>
	<title>JSON Formatter - Tools</title>
	<meta name="description" content="Format, validate, and beautify JSON data" />
</svelte:head>

<div class="container mx-auto px-4 py-8 space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">JSON Formatter</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<CodeIcon class="size-10 text-primary-500" />
			<h1 class="text-4xl font-bold">JSON Formatter</h1>
		</div>
		<p class="text-xl text-surface-700 dark:text-surface-300">
			Format, validate, and beautify JSON data
		</p>
	</div>

	<!-- Controls -->
	<div class="card preset-tonal-surface p-4">
		<div class="flex flex-wrap items-center gap-3">
			<button 
				class="btn preset-filled-primary flex items-center gap-2"
				onclick={formatJSON}
			>
				<MaximizeIcon class="size-5" />
				<span>Format</span>
			</button>
			<button 
				class="btn preset-tonal flex items-center gap-2"
				onclick={minifyJSON}
			>
				<MinimizeIcon class="size-5" />
				<span>Minify</span>
			</button>
			<button 
				class="btn preset-tonal flex items-center gap-2"
				onclick={loadSample}
			>
				Load Sample
			</button>
			
			<!-- Indent Selector -->
			<div class="flex items-center gap-2 ml-auto">
				<span class="text-sm text-surface-700 dark:text-surface-300">Indent:</span>
				<select 
					class="input px-3 py-1 bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-100"
					bind:value={indent}
					onchange={formatJSON}
				>
					<option value={2}>2 spaces</option>
					<option value={4}>4 spaces</option>
					<option value={8}>8 spaces</option>
				</select>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<!-- Input -->
		<div class="card preset-outlined-surface-200 p-6 space-y-4">
			<div class="label">
				<span class="font-semibold">Input JSON</span>
			</div>
			<textarea 
				class="input w-full min-h-[500px] font-mono text-sm"
				bind:value={input}
				placeholder="Paste JSON here..."
			></textarea>
		</div>

		<!-- Output -->
		<div class="card preset-outlined-surface-200 p-6 space-y-4">
			<div class="flex items-center justify-between">
				<div class="label">
					<span class="font-semibold">Output</span>
				</div>
				{#if output && !error}
					<button 
						class="btn-icon preset-tonal flex items-center gap-2"
						onclick={copyOutput}
						aria-label="Copy output"
					>
						{#if copied}
							<CheckIcon class="size-5" />
						{:else}
							<CopyIcon class="size-5" />
						{/if}
					</button>
				{/if}
			</div>
			
			{#if error}
				<div class="bg-error-100 dark:bg-error-900 text-error-700 dark:text-error-300 p-4 rounded min-h-[500px]">
					<p class="font-bold mb-2">❌ Validation Error:</p>
					<p class="font-mono text-sm">{error}</p>
				</div>
			{:else if output}
				<div class="bg-surface-100 dark:bg-surface-800 p-4 rounded font-mono text-sm break-all min-h-[500px] max-h-[500px] overflow-y-auto">
					<pre>{output}</pre>
				</div>
			{:else}
				<div class="bg-surface-100 dark:bg-surface-800 p-4 rounded min-h-[500px] flex items-center justify-center text-surface-500">
					Output will appear here
				</div>
			{/if}
		</div>
	</div>

	<!-- Info -->
	<div class="card preset-tonal-primary p-6 space-y-3">
		<h3 class="text-lg font-bold">💡 JSON Tips</h3>
		<ul class="list-disc list-inside space-y-2 text-surface-700 dark:text-surface-300">
			<li>JSON keys must be in double quotes</li>
			<li>No trailing commas allowed</li>
			<li>Use Format to beautify and validate your JSON</li>
			<li>Use Minify to reduce file size for production</li>
		</ul>
	</div>
</div>
