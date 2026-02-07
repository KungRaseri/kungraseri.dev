<script lang="ts">
	import { TypeIcon, CopyIcon, CheckIcon, ChevronRightIcon } from 'lucide-svelte';

	let input = $state('Hello World Example');
	let result = $state<any>(null);
	let error = $state('');
	let loading = $state(false);
	let copiedFormats = $state<Set<string>>(new Set());

	async function convert() {
		if (!input.trim()) {
			error = 'Please enter some text';
			return;
		}

		loading = true;
		error = '';
		result = null;

		try {
			const response = await fetch('/api/tools/case-converter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ text: input })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Failed to convert';
			} else {
				result = data;
			}
		} catch {
			error = 'Failed to convert text';
		} finally {
			loading = false;
		}
	}

	async function copyToClipboard(format: string, text: string) {
		await navigator.clipboard.writeText(text);
		copiedFormats.add(format);
		copiedFormats = new Set(copiedFormats);
		setTimeout(() => {
			copiedFormats.delete(format);
			copiedFormats = new Set(copiedFormats);
		}, 2000);
	}

	// Auto-convert on changes
	$effect(() => {
		if (input.trim()) {
			convert();
		}
	});

	const formatLabels: Record<string, string> = {
		lowercase: 'Lowercase',
		uppercase: 'Uppercase',
		titleCase: 'Title Case',
		camelCase: 'camelCase',
		pascalCase: 'PascalCase',
		snakeCase: 'snake_case',
		kebabCase: 'kebab-case',
		constantCase: 'CONSTANT_CASE',
		dotCase: 'dot.case'
	};
</script>

<div class="container mx-auto px-4 py-8 space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">Text Case Converter</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<TypeIcon class="size-8 text-primary-500" />
			<h1 class="text-4xl font-bold">Text Case Converter</h1>
		</div>
		<p class="text-lg text-surface-600 dark:text-surface-400">
			Convert text between different case formats for programming and writing.
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
						class="input font-mono min-h-[200px]"
						placeholder="Enter text to convert..."
					></textarea>
				</label>
			</div>

			<div class="card preset-tonal-surface p-4 space-y-2">
				<h3 class="font-semibold">Common Use Cases</h3>
				<ul class="text-sm text-surface-600 dark:text-surface-400 space-y-1">
					<li>• camelCase: JavaScript variables</li>
					<li>• PascalCase: Class names</li>
					<li>• snake_case: Python variables</li>
					<li>• kebab-case: CSS classes, URLs</li>
					<li>• CONSTANT_CASE: Constants</li>
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
				<div
					class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-3"
				>
					<h2 class="text-xl font-bold">All Formats</h2>

					{#each Object.entries(result) as [format, text]}
						<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
							<div class="flex items-center justify-between mb-2">
								<span class="text-xs font-semibold text-surface-600 dark:text-surface-400">
									{formatLabels[format] || format}
								</span>
								<button
									onclick={() => copyToClipboard(format, text as string)}
									class="btn-icon btn-icon-sm hover:preset-tonal"
									aria-label="Copy {format}"
								>
									{#if copiedFormats.has(format)}
										<CheckIcon class="size-4 text-success-500" />
									{:else}
										<CopyIcon class="size-4" />
									{/if}
								</button>
							</div>
							<div class="font-mono text-sm break-all">{text}</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
