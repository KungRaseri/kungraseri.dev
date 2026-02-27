<script lang="ts">
	import { LinkIcon, CopyIcon, CheckIcon, ArrowRightLeftIcon, ChevronRightIcon } from 'lucide-svelte';
	import ToolHeader from '$lib/components/ToolHeader.svelte';
	
	let input = $state('');
	let output = $state('');
	let mode = $state<'encode' | 'decode'>('encode');
	let copied = $state(false);
	let isProcessing = $state(false);

	async function process() {
		if (!input.trim()) {
			output = '';
			return;
		}

		isProcessing = true;
		try {
			const response = await fetch('/api/tools/url-encoder', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ text: input, mode })
			});

			const data = await response.json();
			
			if (data.error) {
				output = `Error: ${data.error}`;
			} else {
				output = data.result;
			}
		} catch (err) {
			console.error('Failed to process:', err);
			output = 'Error processing URL';
		} finally {
			isProcessing = false;
		}
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

	function swap() {
		const temp = input;
		input = output;
		output = temp;
		mode = mode === 'encode' ? 'decode' : 'encode';
	}

	function loadExample() {
		if (mode === 'encode') {
			input = 'https://example.com/search?q=hello world&category=news';
		} else {
			input = 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26category%3Dnews';
		}
		process();
	}
</script>

<svelte:head>
	<title>URL Encoder/Decoder - Tools</title>
	<meta name="description" content="Encode and decode URLs" />
</svelte:head>

<div class="container mx-auto px-4 py-8 space-y-6">
	<ToolHeader title="URL Encoder/Decoder" description="Encode or decode URLs for safe transmission" slug="url-encoder" icon="LinkIcon" />

	<!-- Mode Selection -->
	<div class="flex gap-2">
		<button
			onclick={() => { mode = 'encode'; output = ''; }}
			class="btn flex-1 {mode === 'encode' ? 'preset-filled-primary-500' : 'preset-tonal'}"
		>
			Encode
		</button>
		<button
			onclick={() => { mode = 'decode'; output = ''; }}
			class="btn flex-1 {mode === 'decode' ? 'preset-filled-primary-500' : 'preset-tonal'}"
		>
			Decode
		</button>
	</div>

	<!-- Main Content -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<!-- Input -->
		<div class="space-y-3">
			<div class="flex items-center justify-between">
				<div class="label">
					<span class="font-semibold">Input</span>
				</div>
				<button onclick={loadExample} class="btn btn-sm preset-tonal">
					Load Example
				</button>
			</div>
			<textarea
				class="input w-full min-h-[300px] font-mono text-sm"
				bind:value={input}
				oninput={process}
				placeholder={mode === 'encode' ? 'Enter URL to encode...' : 'Enter encoded URL to decode...'}
			></textarea>
		</div>

		<!-- Output -->
		<div class="space-y-3">
			<div class="flex items-center justify-between">
				<div class="label">
					<span class="font-semibold">Output</span>
				</div>
				<div class="flex gap-2">
					<button
						onclick={swap}
						class="btn-icon btn-icon-sm hover:preset-tonal"
						disabled={!output || isProcessing}
						title="Swap input and output"
					>
						<ArrowRightLeftIcon class="size-4" />
					</button>
					<button
						onclick={copyOutput}
						class="btn-icon btn-icon-sm hover:preset-tonal"
						disabled={!output || isProcessing}
					>
						{#if copied}
							<CheckIcon class="size-4 text-success-500" />
						{:else}
							<CopyIcon class="size-4" />
						{/if}
					</button>
				</div>
			</div>
			<textarea
				class="input w-full min-h-[300px] font-mono text-sm bg-surface-50 dark:bg-surface-900"
				value={output}
				readonly
				placeholder="Output will appear here..."
			></textarea>
		</div>
	</div>
</div>
