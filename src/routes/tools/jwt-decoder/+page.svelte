<script lang="ts">
	import { KeySquareIcon, CopyIcon, CheckIcon, ChevronRightIcon } from 'lucide-svelte';

	let token = $state('');
	let result = $state<{
		header?: Record<string, unknown>;
		payload?: Record<string, unknown>;
		signature?: string;
		isExpired?: boolean;
		error?: string;
	}>({});
	let loading = $state(false);
	let copied = $state<string | null>(null);

	async function decode() {
		if (!token.trim()) {
			result = { error: 'Please enter a JWT token' };
			return;
		}

		loading = true;
		result = {};

		try {
			const response = await fetch('/api/tools/jwt-decoder', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token: token.trim() })
			});

			const data = await response.json();

			if (!response.ok) {
				result = { error: data.error || 'Failed to decode JWT' };
			} else {
				result = data;
			}
		} catch {
			result = { error: 'Failed to decode JWT' };
		} finally {
			loading = false;
		}
	}

	async function copy(text: string, type: string) {
		await navigator.clipboard.writeText(text);
		copied = type;
		setTimeout(() => (copied = null), 2000);
	}
</script>

<div class="container mx-auto px-4 py-8 space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">JWT Decoder</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<KeySquareIcon class="size-8 text-primary-500" />
			<h1 class="text-4xl font-bold">JWT Decoder</h1>
		</div>
		<p class="text-lg text-surface-600 dark:text-surface-400">
			Decode and inspect JSON Web Tokens (JWT) to view header, payload, and signature.
		</p>
	</div>

	<!-- Input Section -->
	<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4">
		<label class="label">
			<span class="font-semibold mb-2 block">JWT Token</span>
			<textarea
				bind:value={token}
				class="input min-h-32 font-mono text-sm"
				placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
			></textarea>
		</label>

		<button
			onclick={decode}
			disabled={loading}
			class="btn preset-filled-primary-500 w-full flex items-center justify-center gap-2"
		>
			{loading ? 'Decoding...' : 'Decode JWT'}
		</button>
	</div>

	<!-- Result Section -->
	{#if result.error}
		<div class="card preset-outlined-error-500 bg-error-50 dark:bg-error-950/20 p-6">
			<p class="text-error-700 dark:text-error-400">{result.error}</p>
		</div>
	{:else if result.header || result.payload}
		<div class="space-y-4">
			<!-- Status -->
			{#if result.isExpired !== undefined}
				<div
					class="card preset-outlined-{result.isExpired
						? 'warning'
						: 'success'}-500 bg-{result.isExpired
						? 'warning'
						: 'success'}-50 dark:bg-{result.isExpired ? 'warning' : 'success'}-950/20 p-4"
				>
					<p
						class="font-semibold text-{result.isExpired
							? 'warning'
							: 'success'}-700 dark:text-{result.isExpired ? 'warning' : 'success'}-400"
					>
						{result.isExpired ? '⚠️ Token Expired' : '✓ Token Valid'}
					</p>
				</div>
			{/if}

			<!-- Header -->
			{#if result.header}
				<div
					class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-3"
				>
					<div class="flex items-center justify-between">
						<h2 class="text-xl font-bold">Header</h2>
						<button
							onclick={() => copy(JSON.stringify(result.header, null, 2), 'header')}
							class="btn-icon btn-icon-sm hover:preset-tonal"
							aria-label="Copy header"
						>
							{#if copied === 'header'}
								<CheckIcon class="size-4 text-success-500" />
							{:else}
								<CopyIcon class="size-4" />
							{/if}
						</button>
					</div>
					<pre
						class="bg-surface-100 dark:bg-surface-800 p-4 rounded-lg overflow-x-auto text-sm font-mono">{JSON.stringify(
							result.header,
							null,
							2
						)}</pre>
				</div>
			{/if}

			<!-- Payload -->
			{#if result.payload}
				<div
					class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-3"
				>
					<div class="flex items-center justify-between">
						<h2 class="text-xl font-bold">Payload</h2>
						<button
							onclick={() => copy(JSON.stringify(result.payload, null, 2), 'payload')}
							class="btn-icon btn-icon-sm hover:preset-tonal"
							aria-label="Copy payload"
						>
							{#if copied === 'payload'}
								<CheckIcon class="size-4 text-success-500" />
							{:else}
								<CopyIcon class="size-4" />
							{/if}
						</button>
					</div>
					<pre
						class="bg-surface-100 dark:bg-surface-800 p-4 rounded-lg overflow-x-auto text-sm font-mono">{JSON.stringify(
							result.payload,
							null,
							2
						)}</pre>
				</div>
			{/if}

			<!-- Signature -->
			{#if result.signature}
				<div
					class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-3"
				>
					<div class="flex items-center justify-between">
						<h2 class="text-xl font-bold">Signature</h2>
						<button
							onclick={() => copy(result.signature || '', 'signature')}
							class="btn-icon btn-icon-sm hover:preset-tonal"
							aria-label="Copy signature"
						>
							{#if copied === 'signature'}
								<CheckIcon class="size-4 text-success-500" />
							{:else}
								<CopyIcon class="size-4" />
							{/if}
						</button>
					</div>
					<pre
						class="bg-surface-100 dark:bg-surface-800 p-4 rounded-lg overflow-x-auto text-sm font-mono break-all">{result.signature}</pre>
				</div>
			{/if}
		</div>
	{/if}
</div>
