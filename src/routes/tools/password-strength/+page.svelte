<script lang="ts">
	import { ShieldCheckIcon, ChevronRightIcon } from 'lucide-svelte';

	let password = $state('');
	let result = $state<any>(null);
	let error = $state('');
	let loading = $state(false);

	async function checkStrength() {
		if (!password) {
			error = '';
			result = null;
			return;
		}

		loading = true;
		error = '';
		result = null;

		try {
			const response = await fetch('/api/tools/password-strength', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Failed to check password';
			} else {
				result = data;
			}
		} catch {
			error = 'Failed to check password strength';
		} finally {
			loading = false;
		}
	}

	// Auto-check on changes
	$effect(() => {
		checkStrength();
	});

	function getStrengthColor(strength: string) {
		const colors: Record<string, string> = {
			'very-weak': 'text-error-600 dark:text-error-400',
			weak: 'text-error-500 dark:text-error-400',
			fair: 'text-warning-600 dark:text-warning-400',
			good: 'text-success-600 dark:text-success-400',
			strong: 'text-success-700 dark:text-success-300',
			'very-strong': 'text-success-800 dark:text-success-200'
		};
		return colors[strength] || '';
	}

	function getStrengthBg(strength: string) {
		const colors: Record<string, string> = {
			'very-weak': 'bg-error-500',
			weak: 'bg-error-400',
			fair: 'bg-warning-500',
			good: 'bg-success-500',
			strong: 'bg-success-600',
			'very-strong': 'bg-success-700'
		};
		return colors[strength] || '';
	}

	function getScoreWidth(score: number) {
		return `${(score / 10) * 100}%`;
	}
</script>

<div class="container mx-auto px-4 py-8 space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
		<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
		<ChevronRightIcon class="size-4" />
		<span class="text-surface-900 dark:text-surface-100">Password Strength Tester</span>
	</nav>

	<!-- Header -->
	<div class="space-y-2">
		<div class="flex items-center gap-3">
			<ShieldCheckIcon class="size-8 text-primary-500" />
			<h1 class="text-4xl font-bold">Password Strength Tester</h1>
		</div>
		<p class="text-lg text-surface-600 dark:text-surface-400">
			Test your password strength and get recommendations for improvement.
		</p>
	</div>

	<div class="grid md:grid-cols-2 gap-6">
		<!-- Input -->
		<div class="space-y-4">
			<div class="card preset-outlined-surface-200-800 bg-surface-50 dark:bg-surface-900 p-6 space-y-4">
				<label class="label">
					<span class="font-semibold mb-2 block">Password</span>
					<input
						type="text"
						bind:value={password}
						class="input font-mono"
						placeholder="Enter password to test..."
					/>
				</label>

				<div class="text-xs text-surface-600 dark:text-surface-400">
					⚠️ Note: For testing only. Never enter real passwords on any website.
				</div>
			</div>

			<div class="card preset-tonal-surface p-4 space-y-2">
				<h3 class="font-semibold">Strong Password Tips</h3>
				<ul class="text-sm text-surface-600 dark:text-surface-400 space-y-1">
					<li>• Use at least 12 characters</li>
					<li>• Mix uppercase and lowercase letters</li>
					<li>• Include numbers and special characters</li>
					<li>• Avoid common words and patterns</li>
					<li>• Don't use personal information</li>
					<li>• Use a unique password for each account</li>
				</ul>
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
					<h2 class="text-xl font-bold">Strength Analysis</h2>

					<!-- Strength Meter -->
					<div class="space-y-2">
						<div class="flex items-center justify-between">
							<span class="text-sm font-semibold">Strength</span>
							<span class="text-sm font-bold capitalize {getStrengthColor(result.strength)}">
								{result.strength.replace('-', ' ')}
							</span>
						</div>
						<div class="h-3 bg-surface-200 dark:bg-surface-800 rounded-full overflow-hidden">
							<div
								class="h-full transition-all duration-300 {getStrengthBg(result.strength)}"
								style="width: {getScoreWidth(result.score)}"
							></div>
						</div>
						<div class="text-xs text-surface-600 dark:text-surface-400 text-right">
							Score: {result.score}/10
						</div>
					</div>

					<!-- Character Types -->
					<div class="grid grid-cols-2 gap-3">
						<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
							<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Lowercase</div>
							<div class="text-sm">
								{result.hasLowercase ? '✓ Yes' : '✗ No'}
							</div>
						</div>
						<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
							<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Uppercase</div>
							<div class="text-sm">
								{result.hasUppercase ? '✓ Yes' : '✗ No'}
							</div>
						</div>
						<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
							<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Numbers</div>
							<div class="text-sm">
								{result.hasNumbers ? '✓ Yes' : '✗ No'}
							</div>
						</div>
						<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
							<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Special Chars</div>
							<div class="text-sm">
								{result.hasSpecial ? '✓ Yes' : '✗ No'}
							</div>
						</div>
					</div>

					<div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg">
						<div class="text-xs text-surface-600 dark:text-surface-400 mb-1">Length</div>
						<div class="text-lg font-bold">{result.length} characters</div>
					</div>

					<!-- Feedback -->
					{#if result.feedback.length > 0}
						<div class="space-y-2">
							<h3 class="font-semibold">Recommendations</h3>
							<ul class="space-y-2">
								{#each result.feedback as feedback}
									<li
										class="text-sm bg-surface-100 dark:bg-surface-800 p-3 rounded-lg flex items-start gap-2"
									>
										<span class="text-warning-500">⚠</span>
										<span>{feedback}</span>
									</li>
								{/each}
							</ul>
						</div>
					{:else}
						<div
							class="bg-success-50 dark:bg-success-950/20 border border-success-300 dark:border-success-700 p-4 rounded-lg"
						>
							<div class="flex items-center gap-2 text-success-700 dark:text-success-300">
								<span class="text-xl">✓</span>
								<span class="font-semibold">Excellent password!</span>
							</div>
						</div>
					{/if}
				</div>
			{:else if !password}
				<div class="card preset-tonal-surface p-6">
					<p class="text-center text-surface-600 dark:text-surface-400">
						Enter a password to see the strength analysis
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>
