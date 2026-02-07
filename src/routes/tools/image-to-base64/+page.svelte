<script lang="ts">
	import { ImageIcon, UploadIcon, CopyIcon, CheckIcon, ChevronRightIcon } from 'lucide-svelte';

	let result = $state<{
		dataUrl?: string;
		size?: number;
		type?: string;
		name?: string;
		error?: string;
	}>({});
	let loading = $state(false);
	let copied = $state(false);

	async function handleFile(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (!file) return;

		loading = true;
		result = {};

		try {
			const formData = new FormData();
			formData.append('file', file);

			const response = await fetch('/api/tools/image-to-base64', {
				method: 'POST',
				body: formData
			});

			const data = await response.json();

			if (!response.ok) {
				result = { error: data.error || 'Failed to convert' };
			} else {
				result = data;
			}
		} catch {
			result = { error: 'Failed to convert image' };
		} finally {
			loading = false;
		}
	}

	async function copy() {
		if (!result.dataUrl) return;
		await navigator.clipboard.writeText(result.dataUrl);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	function formatSize(bytes: number): string {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
		return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
	}
</script>

<div class="container mx-auto px-4 py-8 space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">Image to Base64</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<ImageIcon class="size-8 text-primary-500" />
			<h1 class="text-4xl font-bold">Image to Base64 Converter</h1>
		</div>
		<p class="text-lg text-surface-600 dark:text-surface-400">
			Convert images to Base64 data URLs for embedding in HTML/CSS.
		</p>
	</div>

	<div class="grid md:grid-cols-2 gap-6">
		<!-- Upload -->
		<div class="space-y-4">
			<div
				class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4"
			>
				<label
					class="border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-lg p-8 flex flex-col items-center gap-4 cursor-pointer hover:border-primary-500 transition-colors"
				>
					<UploadIcon class="size-12 text-surface-400" />
					<div class="text-center">
						<p class="font-semibold">Click to upload image</p>
						<p class="text-sm text-surface-600 dark:text-surface-400">PNG, JPG, GIF, SVG, WebP</p>
					</div>
					<input type="file" accept="image/*" onchange={handleFile} class="hidden" />
				</label>

				{#if loading}
					<div class="text-center text-surface-600 dark:text-surface-400">Converting...</div>
				{/if}
			</div>

			<div class="card preset-tonal-surface p-4 space-y-2">
				<h3 class="font-semibold">Use Cases</h3>
				<ul class="text-sm text-surface-600 dark:text-surface-400 space-y-1">
					<li>• Embed images in HTML/CSS without external files</li>
					<li>• Include images in JSON/API responses</li>
					<li>• Store images in databases</li>
					<li>• Email templates with inline images</li>
				</ul>
			</div>
		</div>

		<!-- Result -->
		<div class="space-y-4">
			{#if result.error}
				<div class="card preset-outlined-error-500 bg-error-50 dark:bg-error-950/20 p-6">
					<p class="text-error-700 dark:text-error-400">{result.error}</p>
				</div>
			{:else if result.dataUrl}
				<div
					class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4"
				>
					<div class="space-y-2">
						<h2 class="text-xl font-bold">Preview</h2>
						<div
							class="bg-surface-100 dark:bg-surface-800 p-4 rounded-lg flex items-center justify-center"
						>
							<img src={result.dataUrl} alt="Preview" class="max-w-full max-h-64 object-contain" />
						</div>
						<div class="flex gap-4 text-sm text-surface-600 dark:text-surface-400">
							{#if result.name}
								<span>📄 {result.name}</span>
							{/if}
							{#if result.size}
								<span>📦 {formatSize(result.size)}</span>
							{/if}
							{#if result.type}
								<span>🏷️ {result.type}</span>
							{/if}
						</div>
					</div>
				</div>

				<div
					class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-3"
				>
					<div class="flex items-center justify-between">
						<h2 class="text-xl font-bold">Base64 Data URL</h2>
						<button
							onclick={copy}
							class="btn-icon btn-icon-sm hover:preset-tonal"
							aria-label="Copy data URL"
						>
							{#if copied}
								<CheckIcon class="size-4 text-success-500" />
							{:else}
								<CopyIcon class="size-4" />
							{/if}
						</button>
					</div>
					<pre
						class="bg-surface-100 dark:bg-surface-800 p-4 rounded-lg overflow-x-auto text-xs font-mono max-h-48 break-all">{result.dataUrl}</pre>
				</div>
			{/if}
		</div>
	</div>
</div>
