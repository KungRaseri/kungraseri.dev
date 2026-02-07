<script lang="ts">
	import { ClockIcon, ChevronRightIcon } from 'lucide-svelte';

	let minute = $state('*');
	let hour = $state('*');
	let day = $state('*');
	let month = $state('*');
	let weekday = $state('*');
	let expression = $derived(`${minute} ${hour} ${day} ${month} ${weekday}`);
	let description = $state('');
	let error = $state('');
	let loading = $state(false);

	const presets = [
		{ name: 'Every minute', value: '* * * * *' },
		{ name: 'Every hour', value: '0 * * * *' },
		{ name: 'Every day at midnight', value: '0 0 * * *' },
		{ name: 'Every day at noon', value: '0 12 * * *' },
		{ name: 'Every Monday at 9am', value: '0 9 * * 1' },
		{ name: 'Every 15 minutes', value: '*/15 * * * *' },
		{ name: 'Weekdays at 8am', value: '0 8 * * 1-5' }
	];

	async function parse() {
		loading = true;
		error = '';
		description = '';

		try {
			const response = await fetch('/api/tools/cron-parser', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ expression })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Failed to parse';
			} else {
				description = data.description;
			}
		} catch {
			error = 'Failed to parse cron expression';
		} finally {
			loading = false;
		}
	}

	function loadPreset(value: string) {
		const parts = value.split(' ');
		[minute, hour, day, month, weekday] = parts;
	}

	// Auto-parse on changes
	$effect(() => {
		if (expression) {
			parse();
		}
	});
</script>

<div class="container mx-auto px-4 py-8 space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">Cron Expression Builder</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<ClockIcon class="size-8 text-primary-500" />
			<h1 class="text-4xl font-bold">Cron Expression Builder</h1>
		</div>
		<p class="text-lg text-surface-600 dark:text-surface-400">
			Build and test cron expressions with a human-readable description.
		</p>
	</div>

	<div class="grid md:grid-cols-2 gap-6">
		<!-- Builder -->
		<div class="space-y-4">
			<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4">
				<div class="grid grid-cols-5 gap-2">
					<div class="space-y-1">
						<div class="text-xs font-semibold">Minute</div>
						<input type="text" bind:value={minute} class="input text-sm text-center font-mono" />
					</div>
					<div class="space-y-1">
						<div class="text-xs font-semibold">Hour</div>
						<input type="text" bind:value={hour} class="input text-sm text-center font-mono" />
					</div>
					<div class="space-y-1">
						<div class="text-xs font-semibold">Day</div>
						<input type="text" bind:value={day} class="input text-sm text-center font-mono" />
					</div>
					<div class="space-y-1">
						<div class="text-xs font-semibold">Month</div>
						<input type="text" bind:value={month} class="input text-sm text-center font-mono" />
					</div>
					<div class="space-y-1">
						<div class="text-xs font-semibold">Weekday</div>
						<input type="text" bind:value={weekday} class="input text-sm text-center font-mono" />
					</div>
				</div>

				<div class="bg-surface-100 dark:bg-surface-800 p-4 rounded-lg">
					<p class="text-xs text-surface-600 dark:text-surface-400 mb-1">Expression</p>
					<p class="font-mono font-bold text-lg">{expression}</p>
				</div>
			</div>

			<div class="card preset-tonal-surface p-4 space-y-2">
				<h3 class="font-semibold">Special Characters</h3>
				<ul class="text-sm text-surface-600 dark:text-surface-400 space-y-1">
					<li>• <code class="text-xs">*</code> - Any value</li>
					<li>• <code class="text-xs">,</code> - List (e.g., 1,15,30)</li>
					<li>• <code class="text-xs">-</code> - Range (e.g., 1-5)</li>
					<li>• <code class="text-xs">/</code> - Step (e.g., */15)</li>
				</ul>
			</div>
		</div>

		<!-- Presets & Description -->
		<div class="space-y-4">
			<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-3">
				<h2 class="text-xl font-bold">Presets</h2>
				<div class="space-y-2">
					{#each presets as preset}
						<button
							onclick={() => loadPreset(preset.value)}
							class="btn preset-tonal w-full text-left flex items-center justify-between gap-2"
						>
							<span>{preset.name}</span>
							<code class="text-xs opacity-60">{preset.value}</code>
						</button>
					{/each}
				</div>
			</div>

			{#if error}
				<div class="card preset-outlined-error-500 bg-error-50 dark:bg-error-950/20 p-6">
					<p class="text-error-700 dark:text-error-400">{error}</p>
				</div>
			{:else if description}
				<div class="card preset-outlined-success-500 bg-success-50 dark:bg-success-950/20 p-6 space-y-2">
					<h2 class="text-xl font-bold text-success-700 dark:text-success-400">Description</h2>
					<p class="text-surface-700 dark:text-surface-300 capitalize">{description}</p>
				</div>
			{/if}
		</div>
	</div>
</div>
