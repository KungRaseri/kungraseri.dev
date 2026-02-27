<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import '../app.css';

	import Navigation from '$lib/components/Navigation.svelte';
	import { ExternalLink } from 'lucide-svelte';

	let isAuthenticated: boolean = false;
	let user: any;
</script>

<div class="flex flex-col h-full overflow-x-hidden">
	<Navigation />

	<main class="flex-1 overflow-y-auto">
		<slot />
	</main>

	<footer
		class="w-full bg-surface-100 dark:bg-surface-900 border-t border-surface-300 dark:border-surface-700"
	>
		<div class="max-w-screen-xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
			<p class="text-sm text-surface-900 dark:text-surface-100 text-center md:text-left">
				<span>© {new Date().getFullYear()}</span>
				<span class="mx-1">—</span>
				<span class="uppercase">
					<span class="font-bold">KungRaseri</span><span class="font-light"> Productions</span><span class="font-extralight"> LLC</span>
				</span>
			</p>
			<div class="flex flex-wrap gap-2 justify-center md:justify-end items-center">
				<a
					class="btn preset-tonal hover:preset-filled-primary-500 flex items-center gap-2 transition-all duration-200"
					href="https://discord.gg/eUuBSP6Qcb"
					target="_blank"
				>
					<span>discord</span>
					<ExternalLink class="size-4" />
				</a>
				<a
					class="btn preset-tonal hover:preset-filled-primary-500 flex items-center gap-2 transition-all duration-200"
					href="https://github.com/kungraseri/kungraseri.dev"
					target="_blank"
				>
					<span>source</span>
					<ExternalLink class="size-4" />
				</a>
			</div>
		</div>
	</footer>
</div>
