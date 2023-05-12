<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/components/Navigation.svelte';

	import OpenInNew from 'svelte-material-icons/OpenInNew.svelte';

	let isAuthenticated: boolean = false;
	let user: any;
</script>

<AppShell>
	<svelte:fragment slot="header">
		<Navigation {isAuthenticated} />
	</svelte:fragment>
	<slot />

	<svelte:fragment slot="pageFooter">
		<footer class="w-full">
			<div class="card rounded-none">
				<section class="p-4 grid grid-cols-2">
					<div class="px-5 py-2.5">
						<span class="mx-1">&copy; {new Date().getFullYear()}</span>-
						<span class="mx-1 uppercase">
							<span class="bold">KungRaseri</span>
							<span class="font-weight-lighter">&nbsp;Productions</span>
							<span class="font-weight-light">&nbsp;LLC</span>
						</span>
					</div>
					<div class="text-right">
						<a class="btn" href="https://www.guilded.gg/i/mk397GKE" target="_blank">
							<span class="mr-2">guilded</span>
							<OpenInNew />
						</a>
						<a class="btn" href="https://twitch.tv/KungRaseri" target="_blank">
							<span class="mr-2">twitch</span>
							<OpenInNew />
						</a>
						<a class="btn" href="https://twitter.com/KungRaseri" target="_blank">
							<span class="mr-2">twitter</span>
							<OpenInNew />
						</a>
						<a
							class="btn"
							href="https://github.com/kungraseri/kungraseri.dev"
							target="_blank"
						>
							<span class="mr-2">source</span>
							<OpenInNew />
						</a>
					</div>
				</section>
			</div>
		</footer>
	</svelte:fragment>
</AppShell>
