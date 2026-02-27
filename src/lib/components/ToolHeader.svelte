<script lang="ts">
	import { onMount } from 'svelte';
	import { ChevronRightIcon, LinkIcon, CheckIcon } from 'lucide-svelte';
	import { pushRecentTool } from '$lib/stores/recentTools';
	import { browser } from '$app/environment';

	interface Props {
		title: string;
		description: string;
		slug: string;
		icon: string; // icon key stored in recentTools
	}

	let { title, description, slug, icon }: Props = $props();

	let copied = $state(false);

	onMount(() => {
		pushRecentTool({ slug, title, icon, description });
	});

	async function copyLink() {
		if (!browser) return;
		try {
			await navigator.clipboard.writeText(window.location.href);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {
			// fallback — select the URL bar via prompt on older browsers
		}
	}
</script>

<!-- Breadcrumb -->
<nav class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
	<a href="/tools" class="hover:text-primary-500 transition-colors">Tools</a>
	<ChevronRightIcon class="size-4" />
	<span class="text-surface-900 dark:text-surface-100">{title}</span>
</nav>

<!-- Header row -->
<div class="flex flex-wrap items-start justify-between gap-3">
	<div class="space-y-1 min-w-0">
		<h1 class="text-2xl md:text-4xl font-bold">{title}</h1>
		<p class="text-lg text-surface-700 dark:text-surface-300">{description}</p>
	</div>
	<button
		onclick={copyLink}
		class="btn-icon preset-tonal hover:preset-filled-primary-500 transition-all duration-200 shrink-0"
		aria-label="Copy link to this tool"
		title="Copy link"
	>
		{#if copied}
			<CheckIcon class="size-5 text-success-500" />
		{:else}
			<LinkIcon class="size-5" />
		{/if}
	</button>
</div>
