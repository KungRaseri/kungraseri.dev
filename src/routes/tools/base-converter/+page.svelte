<script lang="ts">
	import { BinaryIcon, CopyIcon, CheckIcon, ChevronRightIcon } from 'lucide-svelte';

	let value = $state('');
	let from = $state<'binary' | 'octal' | 'decimal' | 'hexadecimal'>('decimal');
	let to = $state<'binary' | 'octal' | 'decimal' | 'hexadecimal'>('binary');
	let result = $state('');
	let error = $state('');
	let loading = $state(false);
	let copied = $state(false);

	const bases: Array<{ value: 'binary' | 'octal' | 'decimal' | 'hexadecimal'; label: string; example: string }> = [
		{ value: 'binary', label: 'Binary (Base 2)', example: '1010' },
		{ value: 'octal', label: 'Octal (Base 8)', example: '12' },
		{ value: 'decimal', label: 'Decimal (Base 10)', example: '10' },
		{ value: 'hexadecimal', label: 'Hexadecimal (Base 16)', example: 'A' }
	];

	async function convert() {
		if (!value.trim()) {
			error = 'Please enter a value';
			return;
		}

		loading = true;
		error = '';
		result = '';

		try {
			const response = await fetch('/api/tools/base-converter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ value: value.trim(), from, to })
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
		const temp = from;
		from = to;
		to = temp;
		if (result) {
			value = result;
			convert();
		}
	}
</script>

<div class="container mx-auto px-4 py-8 space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">Base Converter</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<BinaryIcon class="size-8 text-primary-500" />
			<h1 class="text-4xl font-bold">Base Converter</h1>
		</div>
		<p class="text-lg text-surface-600 dark:text-surface-400">
			Convert numbers between binary, octal, decimal, and hexadecimal bases.
		</p>
	</div>

	<div class="grid md:grid-cols-2 gap-6">
		<!-- Settings -->
		<div class="space-y-4">
			<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4">
				<div class="space-y-2">
					<div class="font-semibold">From Base</div>
					<select bind:value={from} class="select">
						{#each bases as base}
							<option value={base.value}>{base.label}</option>
						{/each}
					</select>
				</div>

				<div class="space-y-2">
					<div class="font-semibold">To Base</div>
					<select bind:value={to} class="select">
						{#each bases as base}
							<option value={base.value}>{base.label}</option>
						{/each}
					</select>
				</div>

				<button onclick={swap} class="btn preset-tonal w-full flex items-center justify-center gap-2">
					<BinaryIcon class="size-4" />
					Swap Bases
				</button>
			</div>

			<div class="card preset-tonal-surface p-4 space-y-2">
				<h3 class="font-semibold">Examples</h3>
				<ul class="text-sm text-surface-600 dark:text-surface-400 space-y-1">
					{#each bases as base}
						<li>• <span class="font-semibold">{base.label}:</span> {base.example}</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Input & Output -->
		<div class="space-y-4">
			<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4">
				<label class="label">
					<span class="font-semibold mb-2 block">Input Value</span>
					<input
						type="text"
						bind:value
						class="input font-mono"
						placeholder={bases.find((b) => b.value === from)?.example}
					/>
				</label>

				<button
					onclick={convert}
					disabled={loading}
					class="btn preset-filled-primary-500 w-full"
				>
					{loading ? 'Converting...' : 'Convert'}
				</button>
			</div>

			{#if error}
				<div class="card preset-outlined-error-500 bg-error-50 dark:bg-error-950/20 p-6">
					<p class="text-error-700 dark:text-error-400">{error}</p>
				</div>
			{:else if result}
				<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-3">
					<div class="flex items-center justify-between">
						<h2 class="text-xl font-bold">Result</h2>
						<button
							onclick={copy}
							class="btn-icon btn-icon-sm hover:preset-tonal"
							aria-label="Copy result"
						>
							{#if copied}
								<CheckIcon class="size-4 text-success-500" />
							{:else}
								<CopyIcon class="size-4" />
							{/if}
						</button>
					</div>
					<div class="bg-surface-100 dark:bg-surface-800 p-4 rounded-lg">
						<p class="text-2xl font-mono font-bold break-all">{result}</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
