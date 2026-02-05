<script lang="ts">
	import { QrCodeIcon, DownloadIcon, CopyIcon, CheckIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';

	let inputText = $state('https://kungraseri.dev');
	let qrCodeDataUrl = $state('');
	let copied = $state(false);
	let size = $state(256);
	let errorLevel = $state<'L' | 'M' | 'Q' | 'H'>('M');

	async function generateQRCode() {
		if (!inputText.trim()) {
			qrCodeDataUrl = '';
			return;
		}

		try {
			qrCodeDataUrl = await QRCode.toDataURL(inputText, {
				width: size,
				margin: 2,
				errorCorrectionLevel: errorLevel
			});
		} catch (err) {
			console.error('Failed to generate QR code:', err);
		}
	}

	async function copyImage() {
		if (!qrCodeDataUrl) return;

		try {
			const response = await fetch(qrCodeDataUrl);
			const blob = await response.blob();
			await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	function downloadQRCode() {
		if (!qrCodeDataUrl) return;

		const link = document.createElement('a');
		link.download = 'qrcode.png';
		link.href = qrCodeDataUrl;
		link.click();
	}

	onMount(() => {
		generateQRCode();
	});
</script>

<svelte:head>
	<title>QR Code Generator - Tools</title>
	<meta name="description" content="Generate QR codes from text or URLs" />
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-6xl space-y-8">
	<!-- Header -->
	<div class="space-y-4">
		<a href="/tools" class="anchor flex items-center gap-2 w-fit"> ← Back to Tools </a>
		<div class="flex items-center gap-3">
			<QrCodeIcon class="size-10 text-primary-500" />
			<h1 class="text-4xl font-bold">QR Code Generator</h1>
		</div>
		<p class="text-xl text-surface-700 dark:text-surface-300">
			Create QR codes from any text or URL
		</p>
	</div>

	<!-- Two Column Layout -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<!-- Left Column: Settings -->
		<div class="space-y-6">
			<!-- Input -->
			<div class="card preset-outlined-surface-200 p-6 space-y-4">
				<div class="space-y-2">
					<div class="label">
						<span class="font-semibold">Text or URL</span>
					</div>
					<textarea
						class="input w-full min-h-[100px] font-mono"
						bind:value={inputText}
						oninput={generateQRCode}
						placeholder="Enter text or URL to encode..."
					>
					</textarea>
				</div>

				<!-- Error Correction Level -->
				<div class="space-y-2">
					<div class="label">
						<span class="font-semibold">Error Correction Level</span>
					</div>
					<div class="grid grid-cols-4 gap-2">
						<button
							class="btn transition-all duration-200"
							class:preset-filled-primary={errorLevel === 'L'}
							class:preset-tonal={errorLevel !== 'L'}
							onclick={() => {
								errorLevel = 'L';
								generateQRCode();
							}}
						>
							L (7%)
						</button>
						<button
							class="btn transition-all duration-200"
							class:preset-filled-primary={errorLevel === 'M'}
							class:preset-tonal={errorLevel !== 'M'}
							onclick={() => {
								errorLevel = 'M';
								generateQRCode();
							}}
						>
							M (15%)
						</button>
						<button
							class="btn transition-all duration-200"
							class:preset-filled-primary={errorLevel === 'Q'}
							class:preset-tonal={errorLevel !== 'Q'}
							onclick={() => {
								errorLevel = 'Q';
								generateQRCode();
							}}
						>
							Q (25%)
						</button>
						<button
							class="btn transition-all duration-200"
							class:preset-filled-primary={errorLevel === 'H'}
							class:preset-tonal={errorLevel !== 'H'}
							onclick={() => {
								errorLevel = 'H';
								generateQRCode();
							}}
						>
							H (30%)
						</button>
					</div>
					<p class="text-sm text-surface-600 dark:text-surface-400">
						Higher levels allow QR code to remain readable even if partially damaged
					</p>
				</div>

				<!-- Size Slider -->
				<div class="space-y-2">
					<div class="flex items-center justify-between">
						<div class="label">
							<span class="font-semibold">QR Code Size</span>
						</div>
						<span class="text-lg font-bold text-primary-500">{size}px</span>
					</div>
					<input
						type="range"
						min="128"
						max="512"
						step="64"
						bind:value={size}
						class="w-full"
						oninput={generateQRCode}
					/>
					<div class="flex justify-between text-sm text-surface-600 dark:text-surface-400">
						<span>128px</span>
						<span>512px</span>
					</div>
				</div>
			</div>

			<!-- Info -->
			<div class="card preset-tonal-primary p-6 space-y-3">
				<h3 class="text-lg font-bold">💡 QR Code Tips</h3>
				<ul class="list-disc list-inside space-y-2 text-surface-700 dark:text-surface-300">
					<li>QR codes can store URLs, text, contact info, and more</li>
					<li>Most smartphones can scan QR codes using the camera app</li>
					<li>Larger sizes work better for printing (use 300+ pixels)</li>
					<li>Higher error correction helps with damaged or dirty codes</li>
					<li>Test your QR code before sharing widely</li>
				</ul>
			</div>
		</div>

		<!-- Right Column: QR Code Preview -->
		<div class="space-y-6">
			<!-- QR Code Display -->
			{#if qrCodeDataUrl}
				<div class="card preset-outlined-surface-200 p-6 space-y-4 lg:sticky lg:top-8">
					<h2 class="text-2xl font-bold">QR Code Preview</h2>

					<div class="flex flex-col items-center space-y-4">
						<div class="bg-white p-6 rounded-lg">
							<img src={qrCodeDataUrl} alt="QR Code" class="max-w-full" />
						</div>

						<div class="flex gap-2 w-full">
							<button
								class="btn preset-filled-primary flex items-center justify-center gap-2 flex-1"
								onclick={downloadQRCode}
							>
								<DownloadIcon class="size-5" />
								<span>Download</span>
							</button>
							<button
								class="btn preset-tonal flex items-center justify-center gap-2 flex-1"
								onclick={copyImage}
							>
								{#if copied}
									<CheckIcon class="size-5" />
									<span>Copied!</span>
								{:else}
									<CopyIcon class="size-5" />
									<span>Copy</span>
								{/if}
							</button>
						</div>
					</div>
				</div>
			{:else}
				<div class="card preset-tonal-surface p-6 lg:sticky lg:top-8">
					<div class="flex flex-col items-center justify-center space-y-4 min-h-[400px]">
						<QrCodeIcon class="size-16 text-surface-400 dark:text-surface-600" />
						<p class="text-center text-surface-600 dark:text-surface-400">
							Your QR code will appear here
						</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
