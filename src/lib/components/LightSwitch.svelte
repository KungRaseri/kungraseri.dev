<script lang="ts">
	import { Switch } from '@skeletonlabs/skeleton-svelte';

	let checked = $state(false);

	$effect(() => {
		const mode = localStorage.getItem('mode') || 'light';
		checked = mode === 'dark';
	});

	const onCheckedChange = (event: { checked: boolean }) => {
		const mode = event.checked ? 'dark' : 'light';
		document.documentElement.setAttribute('data-mode', mode);
		localStorage.setItem('mode', mode);
		checked = event.checked;
	};
</script>

<svelte:head>
	<script>
		const mode = localStorage.getItem('mode') || 'light';
		document.documentElement.setAttribute('data-mode', mode);
	</script>
</svelte:head>

<Switch {checked} {onCheckedChange}>
	<Switch.Control class="preset-filled-surface-300-700 data-[state=checked]:preset-filled-primary-500">
		<Switch.Thumb />
	</Switch.Control>
	<Switch.Label class="text-sm">{checked ? '🌙 Dark' : '☀️ Light'}</Switch.Label>
	<Switch.HiddenInput />
</Switch>
