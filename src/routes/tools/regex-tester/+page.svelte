<script lang="ts">
	import { SearchCodeIcon, CopyIcon, CheckIcon, ChevronRightIcon } from 'lucide-svelte';
	
	let pattern = $state('');
	let testText = $state('');
	let flags = $state({ g: true, i: false, m: false });
	let matches = $state<Array<{ match: string; index: number; groups: string[] }>>([]);
	let matchCount = $state(0);
	let error = $state('');
	let copied = $state(false);
	let isProcessing = $state(false);

	async function test() {
		if (!pattern) {
			matches = [];
			matchCount = 0;
			error = '';
			return;
		}

		isProcessing = true;
		try {
			const flagStr = Object.entries(flags)
				.filter(([_, enabled]) => enabled)
				.map(([flag]) => flag)
				.join('');

			const response = await fetch('/api/tools/regex-tester', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ pattern, text: testText, flags: flagStr })
			});

			const data = await response.json();
			
			if (data.error) {
				error = data.error;
				matches = [];
				matchCount = 0;
			} else {
				matches = data.matches;
				matchCount = data.matchCount;
				error = '';
			}
		} catch (err) {
			console.error('Failed to test regex:', err);
			error = 'Failed to test regex';
		} finally {
			isProcessing = false;
		}
	}

	async function copyPattern() {
		if (!pattern) return;
		
		try {
			const flagStr = Object.entries(flags)
				.filter(([_, enabled]) => enabled)
				.map(([flag]) => flag)
				.join('');
			await navigator.clipboard.writeText(`/${pattern}/${flagStr}`);
			copied = true;
			setTimeout(() => copied = false, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	function loadExample() {
		pattern = '\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b';
		flags = { g: true, i: true, m: false };
		testText = 'Contact us at support@example.com or sales@company.co.uk for more information.';
		test();
	}
</script>

<svelte:head>
	<title>Regex Tester - Tools</title>
	<meta name="description" content="Test and debug regular expressions" />
</svelte:head>

<div class="container mx-auto px-4 py-8 space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">Regex Tester</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<SearchCodeIcon class="size-8 text-primary-500" />
			<h1 class="text-3xl font-bold">Regex Tester</h1>
		</div>
		<p class="text-surface-700 dark:text-surface-300">
			Test and debug regular expressions with real-time matching
		</p>
	</div>

	<!-- Main Content -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<!-- Left: Pattern & Test Text -->
		<div class="space-y-4">
			<div class="space-y-3">
				<div class="flex items-center justify-between">
					<div class="label">
						<span class="font-semibold">Regular Expression</span>
					</div>
					<button onclick={loadExample} class="btn btn-sm preset-tonal">
						Load Example
					</button>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-2xl font-mono">/</span>
					<input
						type="text"
						bind:value={pattern}
						oninput={test}
						placeholder="Enter regex pattern..."
						class="input flex-1 font-mono"
					/>
					<span class="text-2xl font-mono">/</span>
					<button
						onclick={copyPattern}
						class="btn-icon hover:preset-tonal"
						disabled={!pattern}
					>
						{#if copied}
							<CheckIcon class="size-5 text-success-500" />
						{:else}
							<CopyIcon class="size-5" />
						{/if}
					</button>
				</div>

				<div class="flex gap-4">
					<label class="flex items-center gap-2 cursor-pointer">
						<input
							type="checkbox"
							bind:checked={flags.g}
							onchange={test}
							class="checkbox"
						/>
						<span class="font-mono">g</span>
						<span class="text-sm text-surface-600 dark:text-surface-400">global</span>
					</label>
					<label class="flex items-center gap-2 cursor-pointer">
						<input
							type="checkbox"
							bind:checked={flags.i}
							onchange={test}
							class="checkbox"
						/>
						<span class="font-mono">i</span>
						<span class="text-sm text-surface-600 dark:text-surface-400">case insensitive</span>
					</label>
					<label class="flex items-center gap-2 cursor-pointer">
						<input
							type="checkbox"
							bind:checked={flags.m}
							onchange={test}
							class="checkbox"
						/>
						<span class="font-mono">m</span>
						<span class="text-sm text-surface-600 dark:text-surface-400">multiline</span>
					</label>
				</div>

				{#if error}
					<div class="card preset-filled-error p-3">
						<p class="text-sm text-error-contrast-500">{error}</p>
					</div>
				{/if}
			</div>

			<div class="space-y-3">
				<div class="label">
					<span class="font-semibold">Test String</span>
				</div>
				<textarea
					class="input w-full min-h-[300px] font-mono text-sm"
					bind:value={testText}
					oninput={test}
					placeholder="Enter text to test against..."
				></textarea>
			</div>
		</div>

		<!-- Right: Matches -->
		<div class="space-y-3">
			<div class="flex items-center justify-between">
				<h2 class="text-xl font-bold">
					Matches
					{#if matchCount > 0}
						<span class="text-primary-500">({matchCount})</span>
					{/if}
				</h2>
			</div>

			{#if matches.length > 0}
				<div class="space-y-2">
					{#each matches as match, index}
						<div class="card preset-outlined p-4 space-y-2">
							<div class="flex items-start justify-between gap-2">
								<div class="space-y-1 flex-1">
									<div class="flex items-center gap-2">
										<span class="chip preset-filled-primary text-xs">Match {index + 1}</span>
										<span class="text-sm text-surface-600 dark:text-surface-400">
											at index {match.index}
										</span>
									</div>
									<code class="block font-mono text-sm bg-primary-500/10 p-2 rounded break-all">
										{match.match}
									</code>
								</div>
							</div>
							{#if match.groups.length > 0}
								<div class="space-y-1">
									<p class="text-sm font-semibold">Capture Groups:</p>
									{#each match.groups as group, groupIndex}
										{#if group}
											<div class="flex items-center gap-2">
												<span class="chip preset-tonal text-xs">Group {groupIndex + 1}</span>
												<code class="text-sm font-mono">{group}</code>
											</div>
										{/if}
									{/each}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{:else if testText && pattern && !error}
				<div class="card preset-tonal-surface p-12 text-center">
					<p class="text-surface-600 dark:text-surface-400">
						No matches found
					</p>
				</div>
			{:else}
				<div class="card preset-tonal-surface p-12 text-center">
					<p class="text-surface-600 dark:text-surface-400">
						Enter a pattern and test string to see matches
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>
