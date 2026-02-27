<script lang="ts">
	import ThemeSelector from './ThemeSelector.svelte';
	import LightSwitch from './LightSwitch.svelte';
	import { page } from '$app/stores';

	import { CodeXml, Music, WrenchIcon, Menu, X } from 'lucide-svelte';

	let mobileMenuOpen = $state(false);

	const navLinks = [
		{ href: '/projects', label: 'projects', icon: CodeXml },
		{ href: '/music', label: 'music', icon: Music },
		{ href: '/tools', label: 'tools', icon: WrenchIcon },
	];

	// Close mobile menu on route change
	$effect(() => {
		$page.url.pathname;
		mobileMenuOpen = false;
	});
</script>

<nav class="w-full bg-surface-100 dark:bg-surface-900 border-b border-surface-300 dark:border-surface-700 relative z-40">
	<div class="px-4 h-16 flex items-center justify-between gap-2 max-w-screen-xl mx-auto">

		<!-- Logo -->
		<a
			href="/"
			class="btn preset-tonal hover:preset-filled-primary-500 flex items-center flex-shrink-0 transition-all duration-200"
		>
			<img
				class="h-10 w-auto"
				src="/assets/logo_transparent_background.png"
				alt="kungraseri productions logo"
			/>
		</a>

		<!-- Desktop Center Nav -->
		<div class="hidden md:flex gap-2 flex-1 justify-center">
			{#each navLinks as link}
				<a
					href={link.href}
					class="btn preset-tonal hover:preset-filled-primary-500 flex items-center gap-2 transition-all duration-200"
					class:preset-filled-primary-500={$page.url.pathname.startsWith(link.href)}
				>
					<span>{link.label}</span>
					<link.icon class="size-5" />
				</a>
			{/each}
		</div>

		<!-- Right Side -->
		<div class="flex items-center gap-2 flex-shrink-0">
			<LightSwitch />
			<ThemeSelector />
			<!-- Hamburger — mobile only -->
			<button
				class="btn-icon preset-tonal hover:preset-filled-primary-500 transition-all duration-200 md:hidden"
				aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={mobileMenuOpen}
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			>
				{#if mobileMenuOpen}
					<X class="size-5" />
				{:else}
					<Menu class="size-5" />
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Dropdown Menu -->
	{#if mobileMenuOpen}
		<div class="md:hidden border-t border-surface-300 dark:border-surface-700 bg-surface-100 dark:bg-surface-900 px-4 py-3 flex flex-col gap-2">
			{#each navLinks as link}
				<a
					href={link.href}
					class="btn preset-tonal hover:preset-filled-primary-500 flex items-center justify-between gap-2 w-full transition-all duration-200"
					class:preset-filled-primary-500={$page.url.pathname.startsWith(link.href)}
				>
					<span class="text-base">{link.label}</span>
					<link.icon class="size-5" />
				</a>
			{/each}
		</div>
	{/if}
</nav>
