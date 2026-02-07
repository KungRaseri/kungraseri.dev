<script lang="ts">
	import { LockIcon, UnlockIcon, CopyIcon, CheckIcon, ChevronRightIcon } from 'lucide-svelte';

	let text = $state('');
	let shift = $state(13);
	let mode = $state<'encode' | 'decode'>('encode');
	let result = $state('');
	let error = $state('');
	let loading = $state(false);
	let copied = $state(false);

	async function process() {
		if (!text.trim()) {
			error = 'Please enter text';
			return;
		}

		loading = true;
		error = '';
		result = '';

		try {
			const response = await fetch('/api/tools/caesar-cipher', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ text: text.trim(), shift, mode })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Failed to process';
			} else {
				result = data.result;
			}
		} catch {
			error = 'Failed to process';
		} finally {
			loading = false;
		}
	}

	async function copy() {
		await navigator.clipboard.writeText(result);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	function toggleMode() {
		mode = mode === 'encode' ? 'decode' : 'encode';
	}
</script>

<div class="container mx-auto px-4 py-8 space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">Caesar Cipher</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<LockIcon class="size-8 text-primary-500" />
			<h1 class="text-4xl font-bold">Caesar Cipher</h1>
		</div>
		<p class="text-lg text-surface-600 dark:text-surface-400">
			Encode and decode text using the Caesar cipher (ROT13 by default).
		</p>
	</div>

	<div class="grid md:grid-cols-2 gap-6">
		<!-- Settings -->
		<div class="space-y-4">
			<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4">
				<div class="space-y-2">
					<div class="font-semibold">Mode</div>
					<button
						onclick={toggleMode}
						class="btn w-full flex items-center justify-center gap-2 {mode === 'encode'
							? 'preset-filled-primary-500'
							: 'preset-tonal'}"
					>
						{#if mode === 'encode'}
							<LockIcon class="size-4" />
							Encode
						{:else}
							<UnlockIcon class="size-4" />
							Decode
						{/if}
					</button>
				</div>

				<div class="space-y-2">
					<div class="flex items-center justify-between">
						<div class="font-semibold">Shift</div>
						<span class="text-sm font-mono bg-surface-100 dark:bg-surface-800 px-2 py-1 rounded"
							>{shift}</span
						>
					</div>
					<input
						type="range"
						bind:value={shift}
						min="0"
						max="25"
						step="1"
						class="w-full accent-primary-500"
					/>
					<p class="text-xs text-surface-600 dark:text-surface-400">
						{shift === 13 ? 'ROT13 (classic)' : `Shift by ${shift} positions`}
					</p>
				</div>
			</div>

			<div class="card preset-tonal-surface p-4 space-y-2">
				<h3 class="font-semibold">How it works</h3>
				<p class="text-sm text-surface-600 dark:text-surface-400">
					The Caesar cipher shifts each letter by a fixed number of positions. ROT13 (shift of 13)
					is special because encoding and decoding use the same operation.
				</p>
			</div>
		</div>

		<!-- Input & Output -->
		<div class="space-y-4">
			<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4">
				<label class="label">
					<span class="font-semibold mb-2 block">Input Text</span>
					<textarea
						bind:value={text}
						class="input min-h-32"
						placeholder="Enter text to encode or decode..."
					></textarea>
				</label>

				<button
					onclick={process}
					disabled={loading}
					class="btn preset-filled-primary-500 w-full"
				>
					{loading ? 'Processing...' : mode === 'encode' ? 'Encode' : 'Decode'}
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
						<p class="whitespace-pre-wrap break-words">{result}</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
