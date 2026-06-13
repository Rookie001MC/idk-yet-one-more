<script lang="ts">
	import '$lib/styles/main.scss';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import DevelopmentMode from '$lib/components/DevelopmentMode.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import { MetaTags, deepMerge } from 'svelte-meta-tags';
	import { page } from '$app/state';
	import { env } from '$env/dynamic/public';

	let { data, children } = $props();

	let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));

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

<svelte:head>
	{#if env.PUBLIC_UMAMI_URL !== '' && env.PUBLIC_UMAMI_WEBSITE_ID !== ''}
		<script defer data-website-id={env.PUBLIC_UMAMI_WEBSITE_ID} src={env.PUBLIC_UMAMI_URL}></script>
	{/if}
</svelte:head>

<MetaTags {...metaTags} />

<Toaster richColors closeButton />

<DevelopmentMode />

<div class="app-layout">
	<Header />
	<main class="main-content">
		{@render children()}
	</main>
	<Footer />
</div>
