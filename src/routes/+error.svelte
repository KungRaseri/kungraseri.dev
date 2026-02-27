<script lang="ts">
	import { page } from '$app/stores';
	import { HomeIcon, WrenchIcon, FolderOpenIcon, Music2Icon, AlertTriangleIcon, SearchXIcon } from 'lucide-svelte';

	const is404 = $derived($page.status === 404);

	const quickLinks = [
		{ href: '/', label: 'Home', icon: HomeIcon },
		{ href: '/projects', label: 'Projects', icon: FolderOpenIcon },
		{ href: '/music', label: 'Music', icon: Music2Icon },
		{ href: '/tools', label: 'Tools', icon: WrenchIcon }
	];
</script>

<svelte:head>
	<title>{$page.status} — KungRaseri Productions</title>
</svelte:head>

<div class="relative min-h-[70vh] flex items-center justify-center px-4 py-16">
	<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
		<div class="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-error-500/10 blur-3xl"></div>
		<div class="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-primary-500/10 blur-3xl"></div>
	</div>

	<div class="relative w-full max-w-lg text-center space-y-8">
		<!-- Status icon -->
		<div class="flex justify-center">
			<div class="w-20 h-20 rounded-full bg-error-500/15 flex items-center justify-center ring-4 ring-error-500/20">
				{#if is404}
					<SearchXIcon class="size-10 text-error-500" />
				{:else}
					<AlertTriangleIcon class="size-10 text-error-500" />
				{/if}
			</div>
		</div>

		<!-- Status code + message -->
		<div class="space-y-2">
			<p class="text-8xl font-black text-error-500 leading-none">{$page.status}</p>
			<h1 class="text-2xl font-semibold">
				{is404 ? 'Page not found' : 'Something went wrong'}
			</h1>
			<p class="text-surface-600 dark:text-surface-400 max-w-sm mx-auto">
				{#if is404}
					The page you're looking for doesn't exist or may have moved.
				{:else}
					{$page.error?.message ?? 'An unexpected error occurred. Some features may still be under construction.'}
				{/if}
			</p>
		</div>

		<!-- Quick nav -->
		<div class="card preset-blur p-5 space-y-3">
			<p class="text-sm font-medium text-surface-500 dark:text-surface-400">Go somewhere useful</p>
			<div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
				{#each quickLinks as link}
					<a
						href={link.href}
						class="btn preset-tonal hover:preset-filled-primary-500 flex flex-col items-center gap-1 py-3 transition-all duration-200"
					>
						<link.icon class="size-5" />
						<span class="text-xs">{link.label}</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>

