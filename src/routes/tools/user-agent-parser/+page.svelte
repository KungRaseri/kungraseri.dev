<script lang="ts">
	import { MonitorSmartphoneIcon, ChevronRightIcon } from 'lucide-svelte';

	let userAgent = $state('');
	let result = $state<any>(null);
	let error = $state('');
	let loading = $state(false);

	async function parse() {
		if (!userAgent.trim()) {
			error = 'Please enter a user agent string';
			return;
		}

		loading = true;
		error = '';
		result = null;

		try {
			const response = await fetch('/api/tools/user-agent-parser', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userAgent: userAgent.trim() })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Failed to parse user agent';
			} else {
				result = data;
			}
		} catch {
			error = 'Failed to parse user agent';
		} finally {
			loading = false;
		}
	}

	function useCurrent() {
		userAgent = navigator.userAgent;
		parse();
	}

	function useExample(ua: string) {
		userAgent = ua;
		parse();
	}

	// Auto-parse on changes
	$effect(() => {
		if (userAgent.trim().length > 20) {
			parse();
		}
	});

	const examples = [
		{
			name: 'Chrome (Desktop)',
			ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
		},
		{
			name: 'Safari (iPhone)',
			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
		},
		{
			name: 'Firefox (Linux)',
			ua: 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/121.0'
		},
		{
			name: 'Edge (Mobile)',
			ua: 'Mozilla/5.0 (Linux; Android 10; HD1913) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.144 Mobile Safari/537.36 EdgA/120.0.2210.86'
		}
	];

	function getDeviceBadge(device: string) {
		const badges: Record<string, string> = {
			Desktop: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
			Mobile: 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300',
			Tablet: 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300',
			Bot: 'bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-300'
		};
		return badges[device] || 'bg-surface-200 dark:bg-surface-800';
	}
</script>

<div class="container mx-auto px-4 py-8 space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">User Agent Parser</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<MonitorSmartphoneIcon class="size-8 text-primary-500" />
			<h1 class="text-4xl font-bold">User Agent Parser</h1>
		</div>
		<p class="text-lg text-surface-600 dark:text-surface-400">
			Parse and analyze HTTP User Agent strings to identify browsers, operating systems, and
			devices.
		</p>
	</div>

	<div class="grid md:grid-cols-2 gap-6">
		<!-- Input -->
		<div class="space-y-4">
			<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4">
				<label class="label">
					<span class="font-semibold mb-2 block">User Agent String</span>
					<textarea
						bind:value={userAgent}
						class="input font-mono text-xs min-h-[150px]"
						placeholder="Enter user agent string to parse..."
					></textarea>
				</label>

				<div class="flex gap-2">
					<button onclick={useCurrent} class="btn preset-tonal flex-1">Use Current Browser</button>
					<button onclick={parse} class="btn preset-filled-primary-500 flex-1" disabled={loading}>
						{loading ? 'Parsing...' : 'Parse'}
					</button>
				</div>
			</div>

			<div class="card preset-tonal-surface p-4 space-y-3">
				<h3 class="font-semibold">Example User Agents</h3>
				<div class="space-y-2">
					{#each examples as example}
						<button
							onclick={() => useExample(example.ua)}
							class="w-full text-left bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 p-3 rounded-lg transition-colors"
						>
							<div class="font-semibold text-sm">{example.name}</div>
							<div class="text-xs text-surface-600 dark:text-surface-400 font-mono truncate">
								{example.ua}
							</div>
						</button>
					{/each}
				</div>
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
					<h2 class="text-xl font-bold">Parsed Information</h2>

					<div class="space-y-3">
						<!-- Device Type Badge -->
						<div>
							<span
								class="inline-block px-3 py-1 rounded-full text-sm font-semibold {getDeviceBadge(
									result.device
								)}"
							>
								{result.device}
							</span>
						</div>

						<!-- Browser -->
						<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
							<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Browser</div>
							<div class="font-semibold">
								{result.browser || 'Unknown'}
								{#if result.browserVersion}
									<span class="text-surface-600 dark:text-surface-400">
										v{result.browserVersion}
									</span>
								{/if}
							</div>
						</div>

						<!-- Operating System -->
						<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
							<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Operating System</div>
							<div class="font-semibold">
								{result.os || 'Unknown'}
								{#if result.osVersion}
									<span class="text-surface-600 dark:text-surface-400">
										{result.osVersion}
									</span>
								{/if}
							</div>
						</div>

						<!-- Device Model (if available) -->
						{#if result.deviceModel}
							<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
								<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Device Model</div>
								<div class="font-semibold">{result.deviceModel}</div>
							</div>
						{/if}

						<!-- Bot Detection -->
						{#if result.isBot}
							<div
								class="bg-warning-50 dark:bg-warning-950/20 border border-warning-300 dark:border-warning-700 p-4 rounded-lg"
							>
								<div class="flex items-center gap-2 text-warning-700 dark:text-warning-300">
									<span class="text-xl">🤖</span>
									<span class="font-semibold">Bot Detected</span>
								</div>
								{#if result.botName}
									<div class="text-sm mt-1">{result.botName}</div>
								{/if}
							</div>
						{/if}

						<!-- Raw User Agent -->
						<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
							<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">
								Raw User Agent
							</div>
							<div class="font-mono text-xs break-all">{result.raw}</div>
						</div>
					</div>
				</div>
			{:else}
				<div class="card preset-tonal-surface p-6">
					<p class="text-center text-surface-600 dark:text-surface-400">
						Enter a user agent string to parse
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>
