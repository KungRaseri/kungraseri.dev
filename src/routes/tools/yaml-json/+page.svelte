<script lang="ts">
	import {
		FileCodeIcon,
		ArrowLeftRightIcon,
		CopyIcon,
		CheckIcon,
		ChevronRightIcon
	} from 'lucide-svelte';

	let input = $state('name: John Doe\nemail: john@example.com\nage: 30');
	let mode = $state<'yaml-to-json' | 'json-to-yaml'>('yaml-to-json');
	let result = $state('');
	let error = $state('');
	let loading = $state(false);
	let copied = $state(false);

	async function convert() {
		if (!input.trim()) {
			error = 'Please enter data';
			return;
		}

		loading = true;
		error = '';
		result = '';

		try {
			const response = await fetch('/api/tools/yaml-json', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ input: input.trim(), mode })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Failed to convert';
			} else {
				result = data.result;
			}
		} catch {
			error = 'Failed to convert';
		} finally {
			loading = false;
		}
	}

	async function copy() {
		await navigator.clipboard.writeText(result);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	function swap() {
		mode = mode === 'yaml-to-json' ? 'json-to-yaml' : 'yaml-to-json';
		if (result) {
			input = result;
			convert();
		}
	}
</script>

<div class="container mx-auto px-4 py-8 space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">YAML/JSON Converter</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<FileCodeIcon class="size-8 text-primary-500" />
			<h1 class="text-4xl font-bold">YAML/JSON Converter</h1>
		</div>
		<p class="text-lg text-surface-600 dark:text-surface-400">
			Convert between YAML and JSON formats easily.
		</p>
	</div>

	<div class="grid md:grid-cols-2 gap-6">
		<!-- Input -->
		<div class="space-y-4">
			<div
				class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4"
			>
				<div class="space-y-2">
					<div class="font-semibold">Conversion Mode</div>
					<select bind:value={mode} class="select">
						<option value="yaml-to-json">YAML to JSON</option>
						<option value="json-to-yaml">JSON to YAML</option>
					</select>
				</div>

				<button
					onclick={swap}
					class="btn preset-tonal w-full flex items-center justify-center gap-2"
				>
					<ArrowLeftRightIcon class="size-4" />
					Swap Direction
				</button>

				<label class="label">
					<span class="font-semibold mb-2 block"
						>{mode === 'yaml-to-json' ? 'YAML' : 'JSON'} Input</span
					>
					<textarea
						bind:value={input}
						class="input min-h-64 font-mono text-sm"
						placeholder={mode === 'yaml-to-json'
							? 'name: John Doe\nage: 30'
							: '{"name":"John Doe","age":30}'}
					></textarea>
				</label>

				<button onclick={convert} disabled={loading} class="btn preset-filled-primary-500 w-full">
					{loading ? 'Converting...' : 'Convert'}
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
						<h2 class="text-xl font-bold">{mode === 'yaml-to-json' ? 'JSON' : 'YAML'} Output</h2>
						<button
							onclick={copy}
							class="btn-icon btn-icon-sm hover:preset-tonal"
							aria-label="Copy output"
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
