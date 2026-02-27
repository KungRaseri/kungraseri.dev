<svelte:head>
	<title>About — KungRaseri Productions</title>
	<meta name="description" content="Developer, electronic music producer, and community builder. Learn more about KungRaseri Productions." />
	<meta property="og:title" content="About — KungRaseri Productions" />
	<meta property="og:description" content="Developer, electronic music producer, and community builder." />
	<meta property="og:type" content="profile" />
</svelte:head>

<div class="relative container mx-auto px-4 py-8 max-w-4xl">
	<!-- Blobs -->
	<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
		<div class="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-primary-500/20 blur-3xl"></div>
		<div class="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-secondary-500/15 blur-3xl"></div>
	</div>

	<div class="relative space-y-10">
		<!-- Hero -->
		<section class="text-center space-y-4 py-8">
			<div class="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center ring-4 ring-primary-500/30">
				<span class="text-3xl font-bold text-white">KR</span>
			</div>
			<h1 class="text-3xl md:text-5xl font-bold">KungRaseri</h1>
			<p class="text-xl text-surface-600 dark:text-surface-300 max-w-xl mx-auto">
				Developer · Electronic Music Producer · Community Builder
			</p>
		</section>

		<!-- Bio -->
		<section class="card preset-blur p-6 md:p-8 space-y-4">
			<h2 class="text-2xl font-bold text-primary-500">About</h2>
			<p class="text-surface-700 dark:text-surface-300 leading-relaxed">
				I'm a software developer and electronic music producer operating under the banner of
				<strong>KungRaseri Productions</strong>. I build open-source tools, web applications, and
				browser-based games — and in between I produce ambient and electronic music.
			</p>
			<p class="text-surface-700 dark:text-surface-300 leading-relaxed">
				My development work spans full-stack web (SvelteKit, .NET, Node.js), game development (C#,
				Godot), and developer tooling. On the music side I've released two albums —
				<em>Ascension</em> and <em>Emergent</em> — with a third in progress.
			</p>
			<p class="text-surface-700 dark:text-surface-300 leading-relaxed">
				This site is a living portfolio: a collection of projects, music releases, and developer
				utilities I've built for myself and others.
			</p>
		</section>

		<!-- Tech Stack -->
		<section class="space-y-4">
			<h2 class="text-2xl font-bold">Tech Stack</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{#each techStack as group}
					<div class="card preset-blur p-5 space-y-3">
						<h3 class="font-semibold text-primary-500">{group.category}</h3>
						<ul class="space-y-1">
							{#each group.items as item}
								<li class="text-sm text-surface-700 dark:text-surface-300 flex items-center gap-2">
									<span class="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0"></span>
									{item}
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</section>

		<!-- Timeline -->
		<section class="space-y-4">
			<h2 class="text-2xl font-bold">Timeline</h2>
			<div class="card preset-blur p-6 space-y-0">
				{#each timeline as entry, i}
					<div class="relative flex gap-4 {i < timeline.length - 1 ? 'pb-8' : ''}">
						<!-- Line connector -->
						{#if i < timeline.length - 1}
							<div class="absolute left-[13px] top-6 bottom-0 w-px bg-surface-300 dark:bg-surface-700"></div>
						{/if}
						<!-- Dot -->
						<div class="mt-1 w-7 h-7 rounded-full shrink-0 flex items-center justify-center
							{entry.type === 'dev' ? 'bg-primary-500' : entry.type === 'music' ? 'bg-secondary-500' : 'bg-tertiary-500'}">
							<span class="text-xs font-bold text-white">{entry.year.toString().slice(2)}</span>
						</div>
						<!-- Content -->
						<div class="flex-1 min-w-0">
							<div class="flex flex-wrap items-center gap-2 mb-1">
								<span class="text-sm font-semibold text-surface-500 dark:text-surface-400">{entry.year}</span>
								<span class="chip preset-tonal text-xs py-0.5
									{entry.type === 'dev' ? 'preset-tonal-primary' : entry.type === 'music' ? 'preset-tonal-secondary' : 'preset-tonal-tertiary'}">
									{entry.type === 'dev' ? 'Development' : entry.type === 'music' ? 'Music' : 'Site'}
								</span>
							</div>
							<p class="font-medium text-surface-900 dark:text-surface-100">{entry.title}</p>
							{#if entry.description}
								<p class="text-sm text-surface-600 dark:text-surface-400 mt-0.5">{entry.description}</p>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Connect -->
		<section class="card preset-blur p-6 md:p-8 text-center space-y-4">
			<h2 class="text-2xl font-bold">Get in Touch</h2>
			<p class="text-surface-600 dark:text-surface-400">
				Find me on Discord or check out the source code on GitHub.
			</p>
			<div class="flex flex-wrap gap-3 justify-center">
				<a href="https://discord.gg/eUuBSP6Qcb" target="_blank" class="btn preset-filled-primary-500 flex items-center gap-2 transition-all duration-200">
					Discord
				</a>
				<a href="https://github.com/kungraseri" target="_blank" class="btn preset-tonal hover:preset-filled-primary-500 flex items-center gap-2 transition-all duration-200">
					GitHub
				</a>
			</div>
		</section>
	</div>
</div>

<script lang="ts">
	const techStack = [
		{
			category: 'Frontend',
			items: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Skeleton UI']
		},
		{
			category: 'Backend',
			items: ['.NET / C#', 'Node.js', 'REST APIs', 'PostgreSQL']
		},
		{
			category: 'Game Dev',
			items: ['Godot Engine', 'C#', 'Browser-based games']
		},
		{
			category: 'DevOps',
			items: ['Vercel', 'GitHub Actions', 'Docker']
		},
		{
			category: 'Music',
			items: ['FL Studio', 'Electronic / Ambient', 'SoundCloud']
		},
		{
			category: 'Tools & More',
			items: ['Git', 'VS Code', 'Linux / Windows']
		}
	];

	const timeline = [
		{
			year: 2025,
			type: 'dev',
			title: 'Tools suite expanded',
			description: '30+ developer tools added to the site.'
		},
		{
			year: 2024,
			type: 'site',
			title: 'KungRaseri.dev relaunched',
			description: 'Portfolio site rebuilt — projects, music, and developer tools.'
		},
		{
			year: 2022,
			type: 'dev',
			title: 'Realm Engine',
			description: 'Game-engine-agnostic RPG backend engine in C#.'
		},
		{
			year: 2020,
			type: 'music',
			title: 'Emergent released',
			description: 'Second album, originally planned for 2019.'
		},
		{
			year: 2020,
			type: 'music',
			title: 'Expanse released',
			description: 'Third album, released the same year as Emergent.'
		},
		{
			year: 2019,
			type: 'dev',
			title: 'Uncharted Lands started',
			description: 'Open-source browser-based settlement management game.'
		},
		{
			year: 2018,
			type: 'music',
			title: 'Ascension released',
			description: 'First album — the beginning of the music production journey.'
		},
		{
			year: 2018,
			type: 'site',
			title: 'KungRaseri.dev launched',
			description: 'The site goes live for the first time.'
		}
	];
</script>
