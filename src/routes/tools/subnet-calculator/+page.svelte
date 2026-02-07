<script lang="ts">
	import { NetworkIcon, ChevronRightIcon } from 'lucide-svelte';

	let ipAddress = $state('192.168.1.0');
	let cidr = $state(24);
	let result = $state<any>(null);
	let error = $state('');
	let loading = $state(false);

	async function calculate() {
		if (!ipAddress.trim()) {
			error = 'Please enter an IP address';
			return;
		}

		loading = true;
		error = '';
		result = null;

		try {
			const response = await fetch('/api/tools/subnet-calculator', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ipAddress: ipAddress.trim(), cidr })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Failed to calculate';
			} else {
				result = data;
			}
		} catch {
			error = 'Failed to calculate subnet';
		} finally {
			loading = false;
		}
	}

	// Auto-calculate on changes
	$effect(() => {
		if (ipAddress.trim()) {
			calculate();
		}
	});

	function useExample(example: { ip: string; cidr: number }) {
		ipAddress = example.ip;
		cidr = example.cidr;
		calculate();
	}
</script>

<div class="container mx-auto px-4 py-8 space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">IP Subnet Calculator</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<NetworkIcon class="size-8 text-primary-500" />
			<h1 class="text-4xl font-bold">IP Subnet Calculator</h1>
		</div>
		<p class="text-lg text-surface-600 dark:text-surface-400">
			Calculate network ranges, subnet masks, and host addresses from IP and CIDR notation.
		</p>
	</div>

	<div class="grid md:grid-cols-2 gap-6">
		<!-- Input -->
		<div class="space-y-4">
			<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4">
				<label class="label">
					<span class="font-semibold mb-2 block">IP Address</span>
					<input
						type="text"
						bind:value={ipAddress}
						class="input font-mono"
						placeholder="192.168.1.0"
					/>
				</label>

				<label class="label">
					<span class="font-semibold mb-2 flex items-center justify-between">
						<span>CIDR Notation</span>
						<span class="text-sm font-normal text-surface-600 dark:text-surface-400"
							>/{cidr}</span
						>
					</span>
					<input type="range" bind:value={cidr} min="0" max="32" class="w-full" />
				</label>

				<button onclick={calculate} class="btn preset-filled-primary-500 w-full" disabled={loading}>
					{loading ? 'Calculating...' : 'Calculate'}
				</button>
			</div>

			<div class="card preset-tonal-surface p-4 space-y-3">
				<h3 class="font-semibold">Common Subnet Examples</h3>
				<div class="flex flex-wrap gap-2">
					<button
						onclick={() => useExample({ ip: '192.168.1.0', cidr: 24 })}
						class="btn btn-sm preset-outlined"
					>
						/24
					</button>
					<button
						onclick={() => useExample({ ip: '10.0.0.0', cidr: 16 })}
						class="btn btn-sm preset-outlined"
					>
						/16
					</button>
					<button
						onclick={() => useExample({ ip: '172.16.0.0', cidr: 12 })}
						class="btn btn-sm preset-outlined"
					>
						/12
					</button>
					<button
						onclick={() => useExample({ ip: '192.168.0.0', cidr: 28 })}
						class="btn btn-sm preset-outlined"
					>
						/28
					</button>
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
				<div
					class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4"
				>
					<h2 class="text-xl font-bold">Subnet Information</h2>

					<div class="space-y-3">
						<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
							<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Network Address</div>
							<div class="font-mono text-sm font-bold">{result.networkAddress}</div>
						</div>

						<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
							<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Broadcast Address</div>
							<div class="font-mono text-sm font-bold">{result.broadcastAddress}</div>
						</div>

						<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
							<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Subnet Mask</div>
							<div class="font-mono text-sm">{result.subnetMask}</div>
						</div>

						<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
							<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Wildcard Mask</div>
							<div class="font-mono text-sm">{result.wildcardMask}</div>
						</div>

						<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
							<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">First Host</div>
							<div class="font-mono text-sm">{result.firstHost}</div>
						</div>

						<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
							<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Last Host</div>
							<div class="font-mono text-sm">{result.lastHost}</div>
						</div>

						<div class="grid grid-cols-2 gap-3">
							<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
								<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Total Hosts</div>
								<div class="font-mono text-sm font-bold">{result.totalHosts}</div>
							</div>
							<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
								<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Usable Hosts</div>
								<div class="font-mono text-sm font-bold">{result.usableHosts}</div>
							</div>
						</div>

						<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
							<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">CIDR Notation</div>
							<div class="font-mono text-sm font-bold">{result.cidrNotation}</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
