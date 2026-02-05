<script lang="ts">
	import { LockKeyholeIcon, CopyIcon, CheckIcon } from 'lucide-svelte';
	
	let inputText = $state('');
	let md5Hash = $state('');
	let sha1Hash = $state('');
	let sha256Hash = $state('');
	let sha512Hash = $state('');
	let copiedHash = $state<string | null>(null);
	
	async function generateHashes() {
		if (!inputText) {
			md5Hash = sha1Hash = sha256Hash = sha512Hash = '';
			return;
		}
		
		const encoder = new TextEncoder();
		const data = encoder.encode(inputText);
		
		// SHA-256 using Web Crypto API
		try {
			const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
			sha256Hash = Array.from(new Uint8Array(sha256Buffer))
				.map(b => b.toString(16).padStart(2, '0'))
				.join('');
		} catch (err) {
			sha256Hash = 'Error generating SHA-256';
		}
		
		// SHA-512 using Web Crypto API
		try {
			const sha512Buffer = await crypto.subtle.digest('SHA-512', data);
			sha512Hash = Array.from(new Uint8Array(sha512Buffer))
				.map(b => b.toString(16).padStart(2, '0'))
				.join('');
		} catch (err) {
			sha512Hash = 'Error generating SHA-512';
		}
		
		// SHA-1 using Web Crypto API
		try {
			const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
			sha1Hash = Array.from(new Uint8Array(sha1Buffer))
				.map(b => b.toString(16).padStart(2, '0'))
				.join('');
		} catch (err) {
			sha1Hash = 'Error generating SHA-1';
		}
		
		// MD5 - Note: Not available in Web Crypto API, using simple implementation
		md5Hash = 'MD5 requires external library';
	}
	
	async function copyHash(hash: string, type: string) {
		try {
			await navigator.clipboard.writeText(hash);
			copiedHash = type;
			setTimeout(() => copiedHash = null, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}
</script>

<svelte:head>
	<title>Hash Generator - Tools</title>
	<meta name="description" content="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes" />
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-4xl space-y-8">
	<!-- Header -->
	<div class="space-y-4">
		<a href="/tools" class="anchor flex items-center gap-2 w-fit">
			← Back to Tools
		</a>
		<div class="flex items-center gap-3">
			<LockKeyholeIcon class="size-10 text-primary-500" />
			<h1 class="text-4xl font-bold">Hash Generator</h1>
		</div>
		<p class="text-xl text-surface-700 dark:text-surface-300">
			Generate cryptographic hashes from text
		</p>
	</div>

	<!-- Input -->
	<div class="card preset-outlined-surface-200 p-6 space-y-4">
		<div class="space-y-2">
			<div class="label">
				<span class="font-semibold">Input Text</span>
			</div>
			<textarea 
				class="input w-full min-h-[150px] font-mono"
				bind:value={inputText}
				oninput={generateHashes}
				placeholder="Enter text to hash..."
			/>
		</div>
	</div>

	<!-- Hash Results -->
	{#if inputText}
		<div class="space-y-4">
			<!-- SHA-256 -->
			<div class="card preset-outlined-surface-200 p-6 space-y-3">
				<div class="flex items-center justify-between">
					<h3 class="text-xl font-bold">SHA-256</h3>
					<button 
						class="btn-icon preset-tonal flex items-center gap-2"
						onclick={() => copyHash(sha256Hash, 'sha256')}
						aria-label="Copy SHA-256"
					>
						{#if copiedHash === 'sha256'}
							<CheckIcon class="size-5" />
						{:else}
							<CopyIcon class="size-5" />
						{/if}
					</button>
				</div>
				<div class="bg-surface-100 dark:bg-surface-800 p-4 rounded font-mono text-sm break-all">
					{sha256Hash}
				</div>
			</div>

			<!-- SHA-512 -->
			<div class="card preset-outlined-surface-200 p-6 space-y-3">
				<div class="flex items-center justify-between">
					<h3 class="text-xl font-bold">SHA-512</h3>
					<button 
						class="btn-icon preset-tonal flex items-center gap-2"
						onclick={() => copyHash(sha512Hash, 'sha512')}
						aria-label="Copy SHA-512"
					>
						{#if copiedHash === 'sha512'}
							<CheckIcon class="size-5" />
						{:else}
							<CopyIcon class="size-5" />
						{/if}
					</button>
				</div>
				<div class="bg-surface-100 dark:bg-surface-800 p-4 rounded font-mono text-sm break-all">
					{sha512Hash}
				</div>
			</div>

			<!-- SHA-1 -->
			<div class="card preset-outlined-surface-200 p-6 space-y-3">
				<div class="flex items-center justify-between">
					<h3 class="text-xl font-bold">SHA-1 <span class="text-sm text-warning-500">(Legacy)</span></h3>
					<button 
						class="btn-icon preset-tonal flex items-center gap-2"
						onclick={() => copyHash(sha1Hash, 'sha1')}
						aria-label="Copy SHA-1"
					>
						{#if copiedHash === 'sha1'}
							<CheckIcon class="size-5" />
						{:else}
							<CopyIcon class="size-5" />
						{/if}
					</button>
				</div>
				<div class="bg-surface-100 dark:bg-surface-800 p-4 rounded font-mono text-sm break-all">
					{sha1Hash}
				</div>
			</div>
		</div>
	{/if}

	<!-- Info -->
	<div class="card preset-tonal-primary p-6 space-y-3">
		<h3 class="text-lg font-bold">💡 Hash Security Notes</h3>
		<ul class="list-disc list-inside space-y-2 text-surface-700 dark:text-surface-300">
			<li><strong>SHA-256</strong> and <strong>SHA-512</strong> are recommended for secure applications</li>
			<li><strong>SHA-1</strong> is deprecated for security purposes but still used for compatibility</li>
			<li>Hashes are one-way functions - cannot be reversed to get original text</li>
			<li>Never use hashes alone for password storage - use proper password hashing (bcrypt, Argon2)</li>
		</ul>
	</div>
</div>
