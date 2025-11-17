<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="container mx-auto p-4 flex items-center justify-center min-h-[60vh]">
	<div class="card preset-filled-surface-100-900 p-8 max-w-lg text-center space-y-4">
		<h1 class="text-6xl font-bold text-error-500">{$page.status}</h1>
		<h2 class="text-2xl font-semibold text-surface-900 dark:text-surface-100">
			{$page.status === 404 ? 'Page Not Found' : 'Something Went Wrong'}
		</h2>
		<p class="text-surface-700 dark:text-surface-300">
			{$page.error?.message || "We couldn't find what you were looking for. Some features on the site are under construction."}
		</p>
		<a href="/" class="btn preset-filled-primary-500">
			Return Home
		</a>
	</div>
</div>
