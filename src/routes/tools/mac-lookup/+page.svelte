<script lang="ts">
	import { WifiIcon, ChevronRightIcon } from 'lucide-svelte';

	let macAddress = $state('');
	let result = $state<any>(null);
	let error = $state('');
	let loading = $state(false);

	async function lookup() {
		if (!macAddress.trim()) {
			error = 'Please enter a MAC address';
			return;
		}

		loading = true;
		error = '';
		result = null;

		try {
			const response = await fetch('/api/tools/mac-lookup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ macAddress: macAddress.trim() })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Failed to lookup MAC address';
			} else {
				result = data;
			}
		} catch {
			error = 'Failed to lookup MAC address';
		} finally {
			loading = false;
		}
	}

	// Auto-lookup on changes
	$effect(() => {
		if (macAddress.trim().length >= 8) {
			lookup();
		}
	});

	function useExample(mac: string) {
		macAddress = mac;
		lookup();
	}

	const examples = [
		{ mac: '00:1B:63:84:45:E6', vendor: 'Apple' },
		{ mac: '00:50:56:C0:00:08', vendor: 'VMware' },
		{ mac: '08:00:27:12:34:56', vendor: 'VirtualBox' },
		{ mac: 'B8:27:EB:AA:BB:CC', vendor: 'Raspberry Pi' }
	];
</script>

<div class="container mx-auto px-4 py-8 space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">MAC Address Lookup</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<WifiIcon class="size-8 text-primary-500" />
			<h1 class="text-4xl font-bold">MAC Address Lookup</h1>
		</div>
		<p class="text-lg text-surface-600 dark:text-surface-400">
			Identify the manufacturer of a network device from its MAC address.
		</p>
	</div>

	<div class="grid md:grid-cols-2 gap-6">
		<!-- Input -->
		<div class="space-y-4">
			<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4">
				<label class="label">
					<span class="font-semibold mb-2 block">MAC Address</span>
					<input
						type="text"
						bind:value={macAddress}
						class="input font-mono"
						placeholder="00:1B:63:84:45:E6"
					/>
				</label>

				<button onclick={lookup} class="btn preset-filled-primary-500 w-full" disabled={loading}>
					{loading ? 'Looking up...' : 'Lookup'}
				</button>
			</div>

			<div class="card preset-tonal-surface p-4 space-y-3">
				<h3 class="font-semibold">Example MAC Addresses</h3>
				<div class="space-y-2">
					{#each examples as example}
						<button
							onclick={() => useExample(example.mac)}
							class="w-full text-left bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 p-3 rounded-lg transition-colors"
						>
							<div class="font-mono text-sm">{example.mac}</div>
							<div class="text-xs text-surface-600 dark:text-surface-400">{example.vendor}</div>
						</button>
					{/each}
				</div>
			</div>

			<div class="card preset-tonal-surface p-4 space-y-2">
				<h3 class="font-semibold">About MAC Addresses</h3>
				<p class="text-sm text-surface-600 dark:text-surface-400">
					A MAC (Media Access Control) address is a unique identifier assigned to network
					interfaces. The first 6 digits (OUI) identify the manufacturer.
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
					<h2 class="text-xl font-bold">Lookup Result</h2>

					<div class="space-y-3">
						{#if result.vendor}
							<div
								class="bg-primary-50 dark:bg-primary-950/20 border border-primary-300 dark:border-primary-700 p-4 rounded-lg"
							>
								<div class="text-xs text-primary-600 dark:text-primary-400 mb-1">Vendor</div>
								<div class="text-2xl font-bold text-primary-700 dark:text-primary-300">
									{result.vendor}
								</div>
							</div>
						{:else}
							<div
								class="bg-warning-50 dark:bg-warning-950/20 border border-warning-300 dark:border-warning-700 p-4 rounded-lg"
							>
								<div class="text-warning-700 dark:text-warning-300">
									Vendor not found in database
								</div>
							</div>
						{/if}

						<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
							<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">MAC Address</div>
							<div class="font-mono text-sm">{result.macAddress}</div>
						</div>

						<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
							<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">OUI Prefix</div>
							<div class="font-mono text-sm font-bold">{result.prefix}</div>
						</div>
					</div>

					{#if result.vendor}
						<div class="bg-surface-100 dark:bg-surface-800 p-4 rounded-lg">
							<div class="text-xs text-surface-600 dark:text-surface-400 mb-2">Common Devices</div>
							<div class="text-sm">
								{#if result.vendor.includes('Apple')}
									iPhones, iPads, Macs, Apple Watch
								{:else if result.vendor.includes('Cisco')}
									Routers, Switches, Access Points
								{:else if result.vendor.includes('Intel')}
									Network Adapters, Wireless Cards
								{:else if result.vendor.includes('Dell')}
									Laptops, Desktops, Servers
								{:else if result.vendor.includes('VMware')}
									Virtual Machines, Virtual NICs
								{:else if result.vendor.includes('VirtualBox')}
									Virtual Machines
								{:else if result.vendor.includes('Raspberry Pi')}
									Raspberry Pi Boards
								{:else}
									Network devices from this manufacturer
								{/if}
							</div>
						</div>
					{/if}
				</div>
			{:else}
				<div class="card preset-tonal-surface p-6">
					<p class="text-center text-surface-600 dark:text-surface-400">
						Enter a MAC address to lookup the vendor
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>
