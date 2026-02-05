<script lang="ts">
	import { PaletteIcon, RefreshCwIcon, CopyIcon, CheckIcon } from 'lucide-svelte';
	
	type ColorScheme = 'monochromatic' | 'complementary' | 'triadic' | 'analogous' | 'split-complementary';
	type PaletteMode = 'harmony' | 'material';
	
	let baseColor = $state('#3b82f6');
	let scheme = $state<ColorScheme>('complementary');
	let mode = $state<PaletteMode>('harmony');
	let colors = $state<string[]>([]);
	let copiedColor = $state<string | null>(null);
	let isGenerating = $state(false);
	
	async function generatePalette() {
		isGenerating = true;
		try {
			const response = await fetch('/api/tools/color-palette', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					baseColor,
					mode,
					scheme: mode === 'harmony' ? scheme : undefined
				})
			});

			const data = await response.json();
			colors = data.colors;
		} catch (err) {
			console.error('Failed to generate palette:', err);
		} finally {
			isGenerating = false;
		}
	}
	
	function randomColor() {
		const randomHex = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
		baseColor = '#' + randomHex;
	}
	
	async function copyColor(color: string) {
		try {
			await navigator.clipboard.writeText(color);
			copiedColor = color;
			setTimeout(() => copiedColor = null, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}
	
	// Generate initial palette
	$effect(() => {
		generatePalette();
	});
</script>

<svelte:head>
	<title>Color Palette Generator - Tools</title>
	<meta name="description" content="Generate beautiful color schemes and palettes" />
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-6xl space-y-8">
	<!-- Header -->
	<div class="space-y-4">
		<a href="/tools" class="anchor flex items-center gap-2 w-fit">
			← Back to Tools
		</a>
		<div class="flex items-center gap-3">
			<PaletteIcon class="size-10 text-primary-500" />
			<h1 class="text-4xl font-bold">Color Palette Generator</h1>
		</div>
		<p class="text-xl text-surface-700 dark:text-surface-300">
			Generate beautiful color schemes from a base color
		</p>
	</div>

	<!-- Two Column Layout -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<!-- Left Column: Settings -->
		<div class="space-y-6">
			<!-- Controls -->
			<div class="card preset-outlined-surface-200 p-6 space-y-6">
				<!-- Mode Selector -->
				<div class="space-y-2">
					<div class="label">
						<span class="font-semibold">Palette Type</span>
					</div>
					<div class="grid grid-cols-2 gap-2">
						<button 
							class="btn transition-all duration-200"
							class:preset-filled-primary={mode === 'harmony'}
							class:preset-tonal={mode !== 'harmony'}
							onclick={() => { mode = 'harmony'; generatePalette(); }}
						>
							Color Harmony
						</button>
						<button 
							class="btn transition-all duration-200"
							class:preset-filled-primary={mode === 'material'}
							class:preset-tonal={mode !== 'material'}
							onclick={() => { mode = 'material'; generatePalette(); }}
						>
							Material Design
						</button>
					</div>
				</div>
				
				<!-- Base Color Picker -->
				<div class="space-y-2">
					<div class="label">
						<span class="font-semibold">Base Color</span>
					</div>
					<div class="flex gap-2">
						<input 
							type="color"
							bind:value={baseColor}
							onchange={generatePalette}
							class="h-12 w-20 rounded cursor-pointer"
						/>
						<input 
							type="text"
							bind:value={baseColor}
							oninput={generatePalette}
							class="input flex-1 font-mono"
							placeholder="#3b82f6"
						/>
						<button 
							class="btn-icon btn-icon-lg preset-tonal flex items-center gap-2"
							onclick={randomColor}
							aria-label="Random color"
						>
							<RefreshCwIcon class="size-5" />
						</button>
					</div>
				</div>
				
				<!-- Color Scheme Selector (only for harmony mode) -->
				{#if mode === 'harmony'}
					<div class="space-y-2">
						<div class="label">
							<span class="font-semibold">Color Scheme</span>
						</div>
						<div class="grid grid-cols-1 gap-2">
							<button 
								class="btn transition-all duration-200"
								class:preset-filled-primary={scheme === 'monochromatic'}
								class:preset-tonal={scheme !== 'monochromatic'}
								onclick={() => { scheme = 'monochromatic'; generatePalette(); }}
							>
								Monochromatic
							</button>
							<button 
								class="btn transition-all duration-200"
								class:preset-filled-primary={scheme === 'complementary'}
								class:preset-tonal={scheme !== 'complementary'}
								onclick={() => { scheme = 'complementary'; generatePalette(); }}
							>
								Complementary
							</button>
							<button 
								class="btn transition-all duration-200"
								class:preset-filled-primary={scheme === 'triadic'}
								class:preset-tonal={scheme !== 'triadic'}
								onclick={() => { scheme = 'triadic'; generatePalette(); }}
							>
								Triadic
							</button>
							<button 
								class="btn transition-all duration-200"
								class:preset-filled-primary={scheme === 'analogous'}
								class:preset-tonal={scheme !== 'analogous'}
								onclick={() => { scheme = 'analogous'; generatePalette(); }}
							>
								Analogous
							</button>
							<button 
								class="btn transition-all duration-200"
								class:preset-filled-primary={scheme === 'split-complementary'}
								class:preset-tonal={scheme !== 'split-complementary'}
								onclick={() => { scheme = 'split-complementary'; generatePalette(); }}
							>
								Split-Complementary
							</button>
						</div>
					</div>
				{/if}
			</div>

			<!-- Info -->
			<div class="card preset-tonal-primary p-6 space-y-3">
				{#if mode === 'harmony'}
					<h3 class="text-lg font-bold">💡 Color Scheme Guide</h3>
					<ul class="list-disc list-inside space-y-2 text-surface-700 dark:text-surface-300">
						<li><strong>Monochromatic:</strong> Variations of a single hue - harmonious and elegant</li>
						<li><strong>Complementary:</strong> Opposite colors on the wheel - high contrast and vibrant</li>
						<li><strong>Triadic:</strong> Three evenly spaced colors - balanced and colorful</li>
						<li><strong>Analogous:</strong> Adjacent colors on the wheel - serene and comfortable</li>
						<li><strong>Split-Complementary:</strong> Base color plus two adjacent to its complement - dynamic yet balanced</li>
					</ul>
				{:else}
					<h3 class="text-lg font-bold">💡 Material Design Palette</h3>
					<ul class="list-disc list-inside space-y-2 text-surface-700 dark:text-surface-300">
						<li>Generates 10 shades (50-900) based on your base color</li>
						<li>50 is the lightest shade, 900 is the darkest</li>
						<li>500 is typically used as the primary color</li>
						<li>Use lighter shades (50-300) for backgrounds and surfaces</li>
						<li>Use darker shades (700-900) for text and emphasis</li>
					</ul>
				{/if}
			</div>
		</div>

		<!-- Right Column: Color Palette Display -->
		<div class="space-y-6">
			<div class="card preset-outlined-surface-200 p-6 space-y-4 lg:sticky lg:top-8">
				<h2 class="text-2xl font-bold">
					{mode === 'material' ? 'Material Design Shades' : 'Generated Palette'}
				</h2>
				<div class="grid grid-cols-2 gap-4">
					{#each colors as color, index}
						<div class="space-y-2">
							<div 
								class="w-full h-32 rounded-lg shadow-lg border-2 border-surface-300 dark:border-surface-700"
								style="background-color: {color}"
							></div>
							<div class="flex items-center justify-between">
								<div class="flex flex-col">
									<span class="font-mono text-sm font-bold">{color}</span>
									{#if mode === 'material'}
										<span class="text-xs text-surface-600 dark:text-surface-400">
											{['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'][index]}
										</span>
									{/if}
								</div>
								<button 
									class="btn-icon preset-tonal flex items-center gap-2"
									onclick={() => copyColor(color)}
									aria-label="Copy color"
								>
									{#if copiedColor === color}
										<CheckIcon class="size-5" />
									{:else}
										<CopyIcon class="size-5" />
									{/if}
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
