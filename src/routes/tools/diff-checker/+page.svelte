<script lang="ts">
	import { DiffIcon, ArrowRightLeftIcon, ChevronRightIcon } from 'lucide-svelte';
	
	type DiffMode = 'lines' | 'words' | 'chars';
	type DiffResult = {
		type: 'equal' | 'insert' | 'delete';
		value: string;
	};
	
	let text1 = $state('');
	let text2 = $state('');
	let mode = $state<DiffMode>('lines');
	let diff = $state<DiffResult[]>([]);
	let stats = $state({ additions: 0, deletions: 0, unchanged: 0 });
	let isProcessing = $state(false);

	async function computeDiff() {
		if (!text1 && !text2) {
			diff = [];
			stats = { additions: 0, deletions: 0, unchanged: 0 };
			return;
		}

		isProcessing = true;
		try {
			const response = await fetch('/api/tools/diff-checker', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ text1, text2, mode })
			});

			const data = await response.json();
			
			if (data.error) {
				console.error('Diff error:', data.error);
			} else {
				diff = data.diff;
				stats = data.stats;
			}
		} catch (err) {
			console.error('Failed to compute diff:', err);
		} finally {
			isProcessing = false;
		}
	}

	function swap() {
		const temp = text1;
		text1 = text2;
		text2 = temp;
		computeDiff();
	}

	function loadExample() {
		text1 = `The quick brown fox
jumps over the lazy dog
in the moonlight`;
		text2 = `The quick red fox
leaps over the lazy cat
in the moonlight`;
		computeDiff();
	}

	function getLineClass(type: string): string {
		if (type === 'insert') return 'bg-success-500/20 border-l-4 border-success-500';
		if (type === 'delete') return 'bg-error-500/20 border-l-4 border-error-500';
		return 'bg-surface-50 dark:bg-surface-900';
	}

	function getPrefix(type: string): string {
		if (type === 'insert') return '+ ';
		if (type === 'delete') return '- ';
		return '  ';
	}
</script>

<svelte:head>
	<title>Diff Checker - Tools</title>
	<meta name="description" content="Compare two texts and highlight differences" />
</svelte:head>

<div class="container mx-auto px-4 py-8 space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">Diff Checker</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<DiffIcon class="size-8 text-primary-500" />
			<h1 class="text-3xl font-bold">Diff Checker</h1>
		</div>
		<p class="text-surface-700 dark:text-surface-300">
			Compare two texts and highlight differences
		</p>
	</div>

	<!-- Mode Selection -->
	<div class="flex items-center gap-2">
		<span class="font-semibold">Mode:</span>
		<button
			onclick={() => { mode = 'lines'; computeDiff(); }}
			class="btn btn-sm {mode === 'lines' ? 'preset-filled-primary' : 'preset-tonal'}"
		>
			Lines
		</button>
		<button
			onclick={() => { mode = 'words'; computeDiff(); }}
			class="btn btn-sm {mode === 'words' ? 'preset-filled-primary' : 'preset-tonal'}"
		>
			Words
		</button>
		<button
			onclick={() => { mode = 'chars'; computeDiff(); }}
			class="btn btn-sm {mode === 'chars' ? 'preset-filled-primary' : 'preset-tonal'}"
		>
			Characters
		</button>
	</div>

	<!-- Input Sections -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<!-- Text 1 -->
		<div class="space-y-3">
			<div class="flex items-center justify-between">
				<div class="label">
					<span class="font-semibold">Original Text</span>
				</div>
				<button onclick={loadExample} class="btn btn-sm preset-tonal">
					Load Example
				</button>
			</div>
			<textarea
				class="input w-full min-h-[200px] font-mono text-sm"
				bind:value={text1}
				oninput={computeDiff}
				placeholder="Enter original text..."
			></textarea>
		</div>

		<!-- Text 2 -->
		<div class="space-y-3">
			<div class="flex items-center justify-between">
				<div class="label">
					<span class="font-semibold">Modified Text</span>
				</div>
				<button
					onclick={swap}
					class="btn-icon btn-icon-sm hover:preset-tonal"
					title="Swap texts"
				>
					<ArrowRightLeftIcon class="size-4" />
				</button>
			</div>
			<textarea
				class="input w-full min-h-[200px] font-mono text-sm"
				bind:value={text2}
				oninput={computeDiff}
				placeholder="Enter modified text..."
			></textarea>
		</div>
	</div>

	<!-- Stats -->
	{#if diff.length > 0}
		<div class="flex gap-4 flex-wrap">
			<div class="card preset-outlined p-3 flex items-center gap-2">
				<div class="w-3 h-3 rounded-full bg-success-500"></div>
				<span class="font-semibold">{stats.additions}</span>
				<span class="text-surface-600 dark:text-surface-400">additions</span>
			</div>
			<div class="card preset-outlined p-3 flex items-center gap-2">
				<div class="w-3 h-3 rounded-full bg-error-500"></div>
				<span class="font-semibold">{stats.deletions}</span>
				<span class="text-surface-600 dark:text-surface-400">deletions</span>
			</div>
			<div class="card preset-outlined p-3 flex items-center gap-2">
				<div class="w-3 h-3 rounded-full bg-surface-400"></div>
				<span class="font-semibold">{stats.unchanged}</span>
				<span class="text-surface-600 dark:text-surface-400">unchanged</span>
			</div>
		</div>
	{/if}

	<!-- Diff Output -->
	{#if diff.length > 0}
		<div class="space-y-3">
			<h2 class="text-xl font-bold">Differences</h2>
			<div class="card preset-outlined overflow-hidden">
				<div class="font-mono text-sm">
					{#each diff as item}
						<div class="{getLineClass(item.type)} px-4 py-1">
							<span class="select-none text-surface-600 dark:text-surface-400">{getPrefix(item.type)}</span><span>{item.value}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{:else if text1 || text2}
		<div class="card preset-tonal-surface p-12 text-center">
			<p class="text-surface-600 dark:text-surface-400">
				Texts are identical
			</p>
		</div>
	{:else}
		<div class="card preset-tonal-surface p-12 text-center">
			<p class="text-surface-600 dark:text-surface-400">
				Enter texts to compare
			</p>
		</div>
	{/if}
</div>
