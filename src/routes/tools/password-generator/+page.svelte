<script lang="ts">
	import { KeyRoundIcon, CopyIcon, CheckIcon, RefreshCwIcon, Volume2Icon } from 'lucide-svelte';
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';

	import words from '../data/words.json';
	import phoneticAlphabetRaw from '../data/phonetic.json';

	const phoneticAlphabet = phoneticAlphabetRaw as Record<string, string>;

	type GeneratorMode = 'simple' | 'complex';

	let mode = $state<GeneratorMode>('simple');
	let password = $state('');
	let length = $state(16);
	let includeUppercase = $state(true);
	let includeLowercase = $state(true);
	let includeNumbers = $state(true);
	let includeSymbols = $state(true);
	let copied = $state(false);
	let showPhonetics = $state(false);

	const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const lowercase = 'abcdefghijklmnopqrstuvwxyz';
	const numbers = '0123456789';
	const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

	function generateSimplePassword() {
		const array = new Uint32Array(4);
		crypto.getRandomValues(array);

		// Pick two random words
		const word1 = words[array[0] % words.length];
		const word2 = words[array[1] % words.length];

		// Pick a random symbol
		const symbol = symbols[array[2] % symbols.length];

		// Generate 2-3 random digits
		const digitCount = 2 + (array[3] % 2); // 2 or 3
		const digitArray = new Uint32Array(digitCount);
		crypto.getRandomValues(digitArray);
		let digits = Array.from(digitArray)
			.map((n) => n % 10)
			.join('');

		// Build initial password
		let generatedPassword = `${word1}${symbol}${word2}${digits}`;

		// Ensure minimum length of 13 characters by adding more digits if needed
		while (generatedPassword.length < 13) {
			const extraDigitArray = new Uint32Array(1);
			crypto.getRandomValues(extraDigitArray);
			digits += extraDigitArray[0] % 10;
			generatedPassword = `${word1}${symbol}${word2}${digits}`;
		}

		password = generatedPassword;
		copied = false;
		showPhonetics = false;
	}

	function generateComplexPassword() {
		let charset = '';
		if (includeUppercase) charset += uppercase;
		if (includeLowercase) charset += lowercase;
		if (includeNumbers) charset += numbers;
		if (includeSymbols) charset += symbols;

		if (charset === '') {
			password = 'Please select at least one character type';
			return;
		}

		let newPassword = '';
		const array = new Uint32Array(length);
		crypto.getRandomValues(array);

		for (let i = 0; i < length; i++) {
			newPassword += charset[array[i] % charset.length];
		}

		password = newPassword;
		copied = false;
		showPhonetics = false;
	}

	function generatePassword() {
		if (mode === 'simple') {
			generateSimplePassword();
		} else {
			generateComplexPassword();
		}
	}

	function getPhonetics() {
		return password.split('').map((char) => {
			const upper = char.toUpperCase();
			return {
				char,
				phonetic: phoneticAlphabet[upper] || phoneticAlphabet[char] || char
			};
		});
	}

	async function copyToClipboard() {
		if (!password || password === 'Please select at least one character type') return;

		try {
			await navigator.clipboard.writeText(password);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	// Generate initial password
	$effect(() => {
		if (!password) {
			generatePassword();
		}
	});

	// Regenerate when mode changes
	$effect(() => {
		mode; // Track mode changes
		generatePassword();
	});

	// Strength indicator
	let strength = $derived(() => {
		if (!password || password === 'Please select at least one character type') return 0;

		let score = 0;
		if (password.length >= 12) score += 25;
		if (password.length >= 16) score += 25;
		if (/[A-Z]/.test(password)) score += 15;
		if (/[a-z]/.test(password)) score += 15;
		if (/[0-9]/.test(password)) score += 10;
		if (/[^A-Za-z0-9]/.test(password)) score += 10;

		return Math.min(score, 100);
	});

	let strengthLabel = $derived(() => {
		const s = strength();
		if (s >= 80) return { text: 'Strong', color: 'success' };
		if (s >= 50) return { text: 'Moderate', color: 'warning' };
		return { text: 'Weak', color: 'error' };
	});
</script>

<svelte:head>
	<title>Password Generator - Tools</title>
	<meta name="description" content="Generate secure passwords with customizable options" />
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-2xl space-y-8">
	<!-- Header -->
	<div class="space-y-4">
		<a href="/tools" class="anchor flex items-center gap-2 w-fit"> ← Back to Tools </a>
		<div class="flex items-center gap-3">
			<KeyRoundIcon class="size-10 text-primary-500" />
			<h1 class="text-4xl font-bold">Password Generator</h1>
		</div>
		<p class="text-xl text-surface-700 dark:text-surface-300">
			Generate secure passwords with simple or complex patterns
		</p>
	</div>

	<!-- Mode Selector -->
	<div class="card preset-tonal-surface p-4">
		<div class="flex gap-2">
			<button
				class="btn flex-1 flex items-center justify-center gap-2 transition-all duration-200"
				class:preset-filled-primary={mode === 'simple'}
				class:preset-tonal={mode !== 'simple'}
				onclick={() => (mode = 'simple')}
			>
				Simple (Memorable)
			</button>
			<button
				class="btn flex-1 flex items-center justify-center gap-2 transition-all duration-200"
				class:preset-filled-primary={mode === 'complex'}
				class:preset-tonal={mode !== 'complex'}
				onclick={() => (mode = 'complex')}
			>
				Complex (Maximum Security)
			</button>
		</div>
	</div>

	<!-- Password Display -->
	<div class="card preset-outlined-surface-200 p-6 space-y-4">
		<div class="space-y-2">
			<div class="label">
				<span class="font-semibold">Generated Password</span>
			</div>
			<div class="flex gap-2">
				<input type="text" class="input flex-1 font-mono text-lg" value={password} readonly />
				<button
					class="btn-icon btn-icon-lg preset-filled-primary flex items-center gap-2"
					onclick={copyToClipboard}
					aria-label="Copy password"
				>
					{#if copied}
						<CheckIcon class="size-5" />
					{:else}
						<CopyIcon class="size-5" />
					{/if}
				</button>
				<button
					class="btn-icon btn-icon-lg preset-tonal flex items-center gap-2"
					onclick={generatePassword}
					aria-label="Generate new password"
				>
					<RefreshCwIcon class="size-5" />
				</button>
				<Dialog>
					<Dialog.Trigger
						class="btn-icon btn-icon-lg preset-tonal flex items-center gap-2"
						aria-label="Show phonetics"
					>
						<Volume2Icon class="size-5" />
					</Dialog.Trigger>
					<Portal>
						<Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-950/80" />
						<Dialog.Positioner class="fixed inset-0 z-50 flex justify-center items-center p-4">
							<Dialog.Content
								class="card bg-surface-50 dark:bg-surface-900 w-full max-w-md max-h-[80vh] overflow-y-auto p-6 space-y-4 shadow-xl"
							>
								<!-- Single Column List -->
								<div class="space-y-3">
									{#each getPhonetics() as item}
										<div class="flex items-center gap-4">
											<!-- Character Box with Inset Styling -->
											<div
												class="w-10 h-10 flex items-center justify-center font-mono font-bold text-lg bg-surface-200 dark:bg-surface-800 rounded shadow-inner border border-surface-300 dark:border-surface-700"
											>
												{item.char}
											</div>
											<!-- Phonetic Word -->
											<span class="text-lg">{item.phonetic}</span>
										</div>
									{/each}
								</div>
							</Dialog.Content>
						</Dialog.Positioner>
					</Portal>
				</Dialog>
			</div>
		</div>

		<!-- Strength Indicator -->
		<div class="space-y-2">
			<div class="flex items-center justify-between">
				<span class="text-sm font-semibold">Password Strength</span>
				<span class="text-sm font-semibold text-{strengthLabel().color}-500">
					{strengthLabel().text}
				</span>
			</div>
			<div class="w-full bg-surface-200 dark:bg-surface-800 rounded-full h-2">
				<div
					class="bg-{strengthLabel().color}-500 h-2 rounded-full transition-all duration-300"
					style="width: {strength()}%"
				></div>
			</div>
		</div>
	</div>

	<!-- Options -->
	{#if mode === 'simple'}
		<div class="card preset-outlined-surface-200 p-6 space-y-4">
			<h2 class="text-2xl font-bold">Simple Mode</h2>
			<p class="text-surface-700 dark:text-surface-300">
				Generates memorable passwords using the pattern: <code
					class="font-mono preset-tonal px-2 py-1 rounded">Word + Symbol + Word + Digits</code
				>
			</p>
			<p class="text-sm text-surface-600 dark:text-surface-400">
				Example: <code class="font-mono">Tiger#Phoenix42</code>
			</p>
		</div>
	{:else}
		<div class="card preset-outlined-surface-200 p-6 space-y-6">
			<h2 class="text-2xl font-bold">Complex Mode Options</h2>

			<!-- Length Slider -->
			<div class="space-y-2">
				<div class="flex items-center justify-between">
					<div class="label">
						<span class="font-semibold">Password Length</span>
					</div>
					<span class="text-lg font-bold text-primary-500">{length}</span>
				</div>
				<input
					type="range"
					min="8"
					max="64"
					bind:value={length}
					class="w-full"
					oninput={generatePassword}
				/>
				<div class="flex justify-between text-sm text-surface-600 dark:text-surface-400">
					<span>8</span>
					<span>64</span>
				</div>
			</div>

			<!-- Character Type Checkboxes -->
			<div class="space-y-3">
				<label class="flex items-center gap-3">
					<input
						type="checkbox"
						class="checkbox"
						bind:checked={includeUppercase}
						onchange={generatePassword}
					/>
					<span>Uppercase Letters (A-Z)</span>
				</label>

				<label class="flex items-center gap-3">
					<input
						type="checkbox"
						class="checkbox"
						bind:checked={includeLowercase}
						onchange={generatePassword}
					/>
					<span>Lowercase Letters (a-z)</span>
				</label>

				<label class="flex items-center gap-3">
					<input
						type="checkbox"
						class="checkbox"
						bind:checked={includeNumbers}
						onchange={generatePassword}
					/>
					<span>Numbers (0-9)</span>
				</label>

				<label class="flex items-center gap-3">
					<input
						type="checkbox"
						class="checkbox"
						bind:checked={includeSymbols}
						onchange={generatePassword}
					/>
					<span>Symbols (!@#$%^&*)</span>
				</label>
			</div>
		</div>
	{/if}

	<!-- Tips -->
	<div class="card preset-tonal-primary p-6 space-y-3">
		<h3 class="text-lg font-bold">💡 Password Security Tips</h3>
		<ul class="list-disc list-inside space-y-2 text-surface-700 dark:text-surface-300">
			{#if mode === 'simple'}
				<li>Simple passwords are easier to remember but less secure</li>
				<li>Use phonetic breakdown to help remember each character</li>
				<li>Best for passwords you need to type frequently</li>
				<li>Consider upgrading to complex for sensitive accounts</li>
			{:else}
				<li>Use at least 12 characters for better security</li>
				<li>Include a mix of uppercase, lowercase, numbers, and symbols</li>
				<li>Best for maximum security on critical accounts</li>
				<li>Store in a password manager if hard to remember</li>
			{/if}
			<li>Never reuse passwords across different sites</li>
			<li>Change passwords regularly for important accounts</li>
		</ul>
	</div>
</div>
