<script lang="ts">
	import { PaletteIcon, RefreshCwIcon, CopyIcon, CheckIcon } from 'lucide-svelte';
	
	type ColorScheme = 'monochromatic' | 'complementary' | 'triadic' | 'analogous' | 'split-complementary';
	type PaletteMode = 'harmony' | 'material';
	
	let baseColor = $state('#3b82f6');
	let scheme = $state<ColorScheme>('complementary');
	let mode = $state<PaletteMode>('harmony');
	let colors = $state<string[]>([]);
	let copiedColor = $state<string | null>(null);
	
	function hexToHSL(hex: string): [number, number, number] {
		const r = parseInt(hex.slice(1, 3), 16) / 255;
		const g = parseInt(hex.slice(3, 5), 16) / 255;
		const b = parseInt(hex.slice(5, 7), 16) / 255;
		
		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		let h = 0, s = 0, l = (max + min) / 2;
		
		if (max !== min) {
			const d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			
			switch (max) {
				case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
				case g: h = ((b - r) / d + 2) / 6; break;
				case b: h = ((r - g) / d + 4) / 6; break;
			}
		}
		
		return [h * 360, s * 100, l * 100];
	}
	
	function hslToHex(h: number, s: number, l: number): string {
		h = h / 360;
		s = s / 100;
		l = l / 100;
		
		let r, g, b;
		
		if (s === 0) {
			r = g = b = l;
		} else {
			const hue2rgb = (p: number, q: number, t: number) => {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1/6) return p + (q - p) * 6 * t;
				if (t < 1/2) return q;
				if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				return p;
			};
			
			const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			const p = 2 * l - q;
			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
		}
		
		const toHex = (x: number) => {
			const hex = Math.round(x * 255).toString(16);
			return hex.length === 1 ? '0' + hex : hex;
		};
		
		return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
	}
	
	function generatePalette() {
		if (mode === 'material') {
			generateMaterialPalette();
			return;
		}
		
		const [h, s, l] = hexToHSL(baseColor);
		const newColors: string[] = [];
		
		switch (scheme) {
			case 'monochromatic':
				newColors.push(
					hslToHex(h, s, Math.max(10, l - 30)),
					hslToHex(h, s, Math.max(10, l - 15)),
					baseColor,
					hslToHex(h, s, Math.min(90, l + 15)),
					hslToHex(h, s, Math.min(90, l + 30))
				);
				break;
			
			case 'complementary':
				newColors.push(
					baseColor,
					hslToHex((h + 180) % 360, s, l)
				);
				break;
			
			case 'triadic':
				newColors.push(
					baseColor,
					hslToHex((h + 120) % 360, s, l),
					hslToHex((h + 240) % 360, s, l)
				);
				break;
			
			case 'analogous':
				newColors.push(
					hslToHex((h - 30 + 360) % 360, s, l),
					baseColor,
					hslToHex((h + 30) % 360, s, l)
				);
				break;
			
			case 'split-complementary':
				newColors.push(
					baseColor,
					hslToHex((h + 150) % 360, s, l),
					hslToHex((h + 210) % 360, s, l)
				);
				break;
		}
		
		colors = newColors;
	}
	
	function generateMaterialPalette() {
		const [h, s, l] = hexToHSL(baseColor);
		const shades = [
			{ name: '50', lightness: 95 },
			{ name: '100', lightness: 90 },
			{ name: '200', lightness: 80 },
			{ name: '300', lightness: 70 },
			{ name: '400', lightness: 60 },
			{ name: '500', lightness: 50 },
			{ name: '600', lightness: 40 },
			{ name: '700', lightness: 30 },
			{ name: '800', lightness: 20 },
			{ name: '900', lightness: 10 }
		];
		
		colors = shades.map(shade => hslToHex(h, s, shade.lightness));
	}
	
	function randomColor() {
		const randomHex = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
		baseColor = '#' + randomHex;
		generatePalette();
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
