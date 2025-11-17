<script lang="ts">
	import FolderMusic from 'svelte-material-icons/FolderMusic.svelte';
	import CodeBraces from 'svelte-material-icons/CodeBraces.svelte';
	import TwitchIcon from 'svelte-material-icons/Twitch.svelte';
	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';
</script>

<div class="container mx-auto px-4 py-8 max-w-6xl">
	<!-- Hero Section -->
	<section class="text-center py-8 md:py-12">
		<h1 class="text-4xl md:text-6xl font-bold mb-4 text-primary-500">KungRaseri Productions</h1>
		<p class="text-xl md:text-2xl text-surface-600 dark:text-surface-300 mb-6">
			Development • Streaming • Music Production
		</p>
		<p class="text-lg text-surface-700 dark:text-surface-400 max-w-2xl mx-auto">
			Creating immersive digital experiences through code, sound, and community.
		</p>
	</section>

	<!-- What I Do Section -->
	<section class="py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
		<!-- Development -->
		<a
			href="/projects"
			class="card hover:scale-105 transition-transform duration-200 cursor-pointer"
		>
			<div class="flex flex-col items-center text-center p-6">
				<div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mb-4">
					<CodeBraces size="32" class="text-white" />
				</div>
				<h3 class="text-2xl font-bold mb-3">Development</h3>
				<p class="text-surface-600 dark:text-surface-400 mb-4">
					Building web applications, games, and tools. From SvelteKit apps to browser-based games.
				</p>
				<div class="flex items-center text-primary-500 font-medium">
					<span>View Projects</span>
					<ChevronRight size="20" />
				</div>
			</div>
		</a>

		<!-- Music -->
		<a href="/music" class="card hover:scale-105 transition-transform duration-200 cursor-pointer">
			<div class="flex flex-col items-center text-center p-6">
				<div class="w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center mb-4">
					<FolderMusic size="32" class="text-white" />
				</div>
				<h3 class="text-2xl font-bold mb-3">Music Production</h3>
				<p class="text-surface-600 dark:text-surface-400 mb-4">
					Electronic music producer with albums spanning multiple years. Listen to Ascension,
					Emergent, and more.
				</p>
				<div class="flex items-center text-secondary-500 font-medium">
					<span>Explore Albums</span>
					<ChevronRight size="20" />
				</div>
			</div>
		</a>

		<!-- Streaming -->
		<a
			href="https://twitch.tv/KungRaseri"
			target="_blank"
			class="card hover:scale-105 transition-transform duration-200 cursor-pointer"
		>
			<div class="flex flex-col items-center text-center p-6">
				<div class="w-16 h-16 bg-tertiary-500 rounded-full flex items-center justify-center mb-4">
					<TwitchIcon size="32" class="text-white" />
				</div>
				<h3 class="text-2xl font-bold mb-3">Streaming</h3>
				<p class="text-surface-600 dark:text-surface-400 mb-4">
					Live coding, gaming, and creative sessions. Join the community on Twitch.
				</p>
				<div class="flex items-center text-tertiary-500 font-medium">
					<span>Watch Live</span>
					<ChevronRight size="20" />
				</div>
			</div>
		</a>
	</section>

	<!-- Featured Projects -->
	<section class="py-8">
		<h2 class="text-3xl font-bold text-center mb-6">Featured Work</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="card p-6">
				<h4 class="text-xl font-bold mb-3">Uncharted Lands</h4>
				<p class="text-surface-600 dark:text-surface-400 mb-4">
					Open-source settlement and resource management browser-based game
				</p>
				<a href="https://ul.redsyndicate.org" target="_blank" class="btn preset-filled-primary-500">
					Play Now
				</a>
			</div>
			<div class="card p-6">
				<h4 class="text-xl font-bold mb-3">Latest Album: Emergent</h4>
				<p class="text-surface-600 dark:text-surface-400 mb-4">
					Released in 2020, featuring electronic soundscapes and ambient production
				</p>
				<a
					href="https://soundcloud.com/kungraseri/sets/emergent"
					target="_blank"
					class="btn preset-filled-secondary-500"
				>
					Listen on SoundCloud
				</a>
			</div>
		</div>
	</section>

	<!-- Call to Action -->
	<section class="py-8 text-center">
		<div
			class="card p-8 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border-2 border-primary-500/20"
		>
			<h2 class="text-3xl font-bold mb-4">Let's Connect</h2>
			<p class="text-lg text-surface-600 dark:text-surface-400 mb-6">
				Interested in collaboration or just want to chat? Reach out on social media.
			</p>
			<div class="flex flex-wrap gap-4 justify-center">
				<a href="https://twitch.tv/KungRaseri" target="_blank" class="btn preset-filled-primary-500">
					Twitch
				</a>
				<a href="https://twitter.com/KungRaseri" target="_blank" class="btn preset-filled-primary-500">
					Twitter
				</a>
				<a
					href="https://mastodon.social/@kungraseri"
					target="_blank"
					class="btn preset-filled-primary-500"
				>
					Mastodon
				</a>
			</div>
		</div>
	</section>
</div>
