<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import '../app.css';

	import Navigation from '$lib/components/Navigation.svelte';

	import OpenInNew from 'svelte-material-icons/OpenInNew.svelte';

	let isAuthenticated: boolean = false;
	let user: any;
</script>

<div class="flex flex-col h-full">
	<Navigation {isAuthenticated} />

	<main class="flex-1 overflow-y-auto">
		<slot />
	</main>

	<footer class="w-full bg-surface-100-900 border-t border-surface-300-700">
		<section class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="px-5 py-2.5">
				<span class="mx-1">© {new Date().getFullYear()}</span>-
				<span class="mx-1 uppercase">
					<span class="font-bold">KungRaseri</span>
					<span class="font-light"> Productions</span>
					<span class="font-extralight"> LLC</span>
				</span>
			</div>
			<div class="flex flex-wrap gap-2 justify-start md:justify-end items-center">
				<!-- <a class="btn btn-sm variant-ghost-surface" href="https://www.guilded.gg/i/mk397GKE" target="_blank">
					<span class="mr-1">guilded</span>
					<OpenInNew />
				</a> -->
				<a class="btn btn-sm preset-tonal-surface border border-surface-500" href="https://twitch.tv/KungRaseri" target="_blank">
					<span class="mr-1">twitch</span>
					<OpenInNew />
				</a>
				<a class="btn btn-sm preset-tonal-surface border border-surface-500" href="https://twitter.com/KungRaseri" target="_blank">
					<span class="mr-1">twitter</span>
					<OpenInNew />
				</a>
				<a rel="me" class="btn btn-sm preset-tonal-surface border border-surface-500" href="https://mastodon.social/@kungraseri" target="_blank">
					<span class="mr-1">mastodon</span>
					<OpenInNew />
				</a>
				<a class="btn btn-sm preset-tonal-surface border border-surface-500" href="https://github.com/kungraseri/kungraseri.dev" target="_blank">
					<span class="mr-1">source</span>
					<OpenInNew />
				</a>
			</div>
		</section>
	</footer>
</div>
