<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import '../app.css';

	import Navigation from '$lib/components/Navigation.svelte';
	import { ExternalLink } from 'lucide-svelte';

	let isAuthenticated: boolean = false;
	let user: any;
</script>

<div class="flex flex-col h-full">
	<Navigation />

	<main class="flex-1 overflow-y-auto">
		<slot />
	</main>

	<footer
		class="w-full bg-surface-100 dark:bg-surface-900 border-t border-surface-300 dark:border-surface-700"
	>
		<section class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="px-5 py-2.5 text-surface-900 dark:text-surface-100">
				<span class="mx-1">© {new Date().getFullYear()}</span>-
				<span class="mx-1 uppercase">
					<span class="font-bold">KungRaseri</span>
					<span class="font-light"> Productions</span>
					<span class="font-extralight"> LLC</span>
				</span>
			</div>
			<div class="flex flex-wrap gap-2 justify-start md:justify-end items-center">
				<a
					class="btn btn-sm preset-tonal hover:preset-filled-primary-500 flex items-center gap-2 transition-all duration-200"
					href="https://twitch.tv/KungRaseri"
					target="_blank"
				>
					<span>twitch</span>
					<ExternalLink class="size-4" />
				</a>
				<a
					class="btn btn-sm preset-tonal hover:preset-filled-primary-500 flex items-center gap-2 transition-all duration-200"
					href="https://twitter.com/KungRaseri"
					target="_blank"
				>
					<span>twitter</span>
					<ExternalLink class="size-4" />
				</a>
				<a
					rel="me"
					class="btn btn-sm preset-tonal hover:preset-filled-primary-500 flex items-center gap-2 transition-all duration-200"
					href="https://mastodon.social/@kungraseri"
					target="_blank"
				>
					<span>mastodon</span>
					<ExternalLink class="size-4" />
				</a>
				<a
					class="btn btn-sm preset-tonal hover:preset-filled-primary-500 flex items-center gap-2 transition-all duration-200"
					href="https://github.com/kungraseri/kungraseri.dev"
					target="_blank"
				>
					<span>source</span>
					<ExternalLink class="size-4" />
				</a>
			</div>
		</section>
	</footer>
</div>
