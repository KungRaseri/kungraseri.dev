<script lang="ts">
	import { ClockIcon, ArrowLeftRightIcon, ChevronRightIcon } from 'lucide-svelte';

	let mode = $state<'to-human' | 'to-timestamp'>('to-human');
	let input = $state(String(Math.floor(Date.now() / 1000)));
	let result = $state<any>(null);
	let error = $state('');
	let loading = $state(false);

	async function convert() {
		if (!input.trim()) {
			error = 'Please enter a value';
			return;
		}

		loading = true;
		error = '';
		result = null;

		try {
			const response = await fetch('/api/tools/timestamp-converter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ value: input.trim(), mode })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Failed to convert';
			} else {
				result = data;
			}
		} catch {
			error = 'Failed to convert timestamp';
		} finally {
			loading = false;
		}
	}

	function useNow() {
		if (mode === 'to-human') {
			input = String(Math.floor(Date.now() / 1000));
		} else {
			input = new Date().toISOString();
		}
		convert();
	}

	function toggleMode() {
		mode = mode === 'to-human' ? 'to-timestamp' : 'to-human';
		result = null;
		error = '';
		if (mode === 'to-human') {
			input = String(Math.floor(Date.now() / 1000));
		} else {
			input = new Date().toISOString();
		}
	}

	// Auto-convert on changes
	$effect(() => {
		if (input.trim()) {
			convert();
		}
	});
</script>

<div class="container mx-auto px-4 py-8 space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">Unix Timestamp Converter</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<ClockIcon class="size-8 text-primary-500" />
			<h1 class="text-4xl font-bold">Unix Timestamp Converter</h1>
		</div>
		<p class="text-lg text-surface-600 dark:text-surface-400">
			Convert Unix timestamps to human-readable dates and vice versa.
		</p>
	</div>

	<div class="grid md:grid-cols-2 gap-6">
		<!-- Input -->
		<div class="space-y-4">
			<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4">
				<div class="flex gap-2">
					<button
						onclick={toggleMode}
						class="btn flex-1 flex items-center justify-center gap-2 {mode === 'to-human'
							? 'preset-filled-primary-500'
							: 'preset-tonal'}"
					>
						To Human
					</button>
					<button
						onclick={toggleMode}
						class="btn flex-1 flex items-center justify-center gap-2 {mode === 'to-timestamp'
							? 'preset-filled-primary-500'
							: 'preset-tonal'}"
					>
						To Timestamp
					</button>
				</div>

				<label class="label">
					<span class="font-semibold mb-2 block">
						{mode === 'to-human' ? 'Unix Timestamp' : 'Date String'}
					</span>
					<input
						type="text"
						bind:value={input}
						class="input font-mono"
						placeholder={mode === 'to-human' ? '1707264000' : '2024-02-07T00:00:00.000Z'}
					/>
				</label>

				<button onclick={useNow} class="btn preset-tonal w-full flex items-center justify-center gap-2">
					<ClockIcon class="size-4" />
					Use Current Time
				</button>
			</div>

			<div class="card preset-tonal-surface p-4 space-y-2">
				<h3 class="font-semibold">What is Unix Timestamp?</h3>
				<p class="text-sm text-surface-600 dark:text-surface-400">
					Unix timestamp is the number of seconds that have elapsed since January 1, 1970 (UTC).
					It's used in programming and databases for time calculations.
				</p>
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
					<h2 class="text-xl font-bold">Result</h2>

					{#if mode === 'to-human'}
						<div class="space-y-3">
							<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
								<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">ISO 8601</div>
								<div class="font-mono text-sm">{result.iso}</div>
							</div>
							<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
								<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">UTC</div>
								<div class="font-mono text-sm">{result.utc}</div>
							</div>
							<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
								<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Local Time</div>
								<div class="font-mono text-sm">{result.local}</div>
							</div>
							<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
								<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Date</div>
								<div class="font-mono text-sm">{result.date}</div>
							</div>
							<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
								<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Time</div>
								<div class="font-mono text-sm">{result.time}</div>
							</div>
							<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
								<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Relative</div>
								<div class="font-mono text-sm">{result.relative}</div>
							</div>
						</div>
					{:else}
						<div class="space-y-3">
							<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
								<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Seconds</div>
								<div class="font-mono text-lg font-bold">{result.seconds}</div>
							</div>
							<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
								<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Milliseconds</div>
								<div class="font-mono text-lg font-bold">{result.milliseconds}</div>
							</div>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>
