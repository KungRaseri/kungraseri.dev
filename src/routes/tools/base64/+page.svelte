<script lang="ts">
	import { TypeIcon, ArrowLeftRightIcon, CopyIcon, CheckIcon } from 'lucide-svelte';
	
	type Mode = 'encode' | 'decode';
	
	let mode = $state<Mode>('encode');
	let input = $state('');
	let output = $state('');
	let error = $state('');
	let copied = $state(false);
	let isProcessing = $state(false);
	
	async function process() {
		if (!input.trim()) {
			output = '';
			error = '';
			return;
		}
		
		isProcessing = true;
		error = '';
		
		try {
			const response = await fetch('/api/tools/base64', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ text: input, mode })
			});
			
			const data = await response.json();
			
			if (!response.ok) {
				error = data.error || 'Failed to process';
				output = '';
			} else {
				output = data.result;
			}
		} catch (err) {
			console.error('Error processing Base64:', err);
			error = 'Failed to process request';
			output = '';
		} finally {
			isProcessing = false;
		}
	}
	
	function switchMode() {
		mode = mode === 'encode' ? 'decode' : 'encode';
		// Swap input and output
		const temp = input;
		input = output;
		output = temp;
		error = '';
		process();
	}
	
	async function copyOutput() {
		if (!output) return;
		
		try {
			await navigator.clipboard.writeText(output);
			copied = true;
			setTimeout(() => copied = false, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}
</script>

<svelte:head>
	<title>Base64 Encoder/Decoder - Tools</title>
	<meta name="description" content="Encode and decode Base64 strings" />
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-4xl space-y-8">
	<!-- Header -->
	<div class="space-y-4">
		<a href="/tools" class="anchor flex items-center gap-2 w-fit">
			← Back to Tools
		</a>
		<div class="flex items-center gap-3">
			<TypeIcon class="size-10 text-primary-500" />
			<h1 class="text-4xl font-bold">Base64 Encoder/Decoder</h1>
		</div>
		<p class="text-xl text-surface-700 dark:text-surface-300">
			Encode and decode Base64 strings
		</p>
	</div>

	<!-- Mode Toggle -->
	<div class="card preset-tonal-surface p-4">
		<div class="flex items-center gap-2">
			<button 
				class="btn flex-1 flex items-center justify-center gap-2 transition-all duration-200"
				class:preset-filled-primary={mode === 'encode'}
				class:preset-tonal={mode !== 'encode'}
				onclick={() => { mode = 'encode'; process(); }}
			>
				Encode
			</button>
			<button 
				class="btn-icon preset-tonal flex items-center gap-2"
				onclick={switchMode}
				aria-label="Switch mode"
			>
				<ArrowLeftRightIcon class="size-5" />
			</button>
			<button 
				class="btn flex-1 flex items-center justify-center gap-2 transition-all duration-200"
				class:preset-filled-primary={mode === 'decode'}
				class:preset-tonal={mode !== 'decode'}
				onclick={() => { mode = 'decode'; process(); }}
			>
				Decode
			</button>
		</div>
	</div>

	<!-- Input -->
	<div class="card preset-outlined-surface-200 p-6 space-y-4">
		<div class="space-y-2">
			<div class="label">
				<span class="font-semibold">
					{mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
				</span>
			</div>
			<textarea 
				class="input w-full min-h-[200px] font-mono text-sm"
				bind:value={input}
				oninput={process}
				placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
			/>
		</div>
	</div>

	<!-- Output -->
	{#if output || error}
		<div class="card preset-outlined-surface-200 p-6 space-y-4">
			<div class="flex items-center justify-between">
				<div class="label">
					<span class="font-semibold">
						{mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
					</span>
				</div>
				{#if output && !error}
					<button 
						class="btn-icon preset-tonal flex items-center gap-2"
						onclick={copyOutput}
						aria-label="Copy output"
					>
						{#if copied}
							<CheckIcon class="size-5" />
						{:else}
							<CopyIcon class="size-5" />
						{/if}
					</button>
				{/if}
			</div>
			
			{#if error}
				<div class="bg-error-100 dark:bg-error-900 text-error-700 dark:text-error-300 p-4 rounded">
					{error}
				</div>
			{:else}
				<div class="bg-surface-100 dark:bg-surface-800 p-4 rounded font-mono text-sm break-all max-h-[400px] overflow-y-auto">
					{output}
				</div>
			{/if}
		</div>
	{/if}

	<!-- Info -->
	<div class="card preset-tonal-primary p-6 space-y-3">
		<h3 class="text-lg font-bold">💡 Base64 Information</h3>
		<ul class="list-disc list-inside space-y-2 text-surface-700 dark:text-surface-300">
			<li>Base64 encoding converts binary data to ASCII text</li>
			<li>Commonly used for embedding images in HTML/CSS</li>
			<li>Used in email attachments and data URLs</li>
			<li>Note: Base64 is encoding, not encryption - data is not secured</li>
		</ul>
	</div>
</div>
