<script lang="ts">
	import '$lib/styles/main.scss';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';

	let { data, children } = $props();

	onMount(() => {
		if (data.cmsError) {
			toast.error('CMS Connection Failed', {
				description: 'The site is currently running on fallback content.',
				duration: 5000,
				position: 'bottom-right'
			});
		}
	});

	// Wire up the View Transitions API for smooth page-to-page animations.
	// Progressive enhancement: falls back gracefully on unsupported browsers.
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<Toaster richColors closeButton />

<div class="app-layout">
	<Header />
	<main class="main-content">
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.app-layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.main-content {
		flex: 1;
	}
</style>
