<script lang="ts">
	import '$lib/styles/main.scss';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import DevelopmentMode from '$lib/components/DevelopmentMode.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import { MetaTags, type MetaTagsProps } from 'svelte-meta-tags';
	import { page } from '$app/state';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import { env } from '$env/dynamic/public';
	import siteConfig from '$lib/config';

	let { data, children } = $props();

	// Default meta tags for all pages
	const defaultMetaTags: MetaTagsProps = $derived({
		title: siteConfig.name,
		titleTemplate: `%s | ${siteConfig.name}`,
		description: siteConfig.description,
		canonical: `${PUBLIC_BASE_URL}${page.url.pathname}`,
		openGraph: {
			type: 'website',
			url: `${PUBLIC_BASE_URL}${page.url.pathname}`,
			title: siteConfig.name,
			description: siteConfig.description,
			images: [
				{
					url: `${PUBLIC_BASE_URL}/opengraph`,
					width: 1200,
					height: 630,
					alt: `${siteConfig.name} Cover`
				}
			],
			siteName: siteConfig.name
		},
		twitter: {
			cardType: 'summary_large_image',
			title: siteConfig.name,
			description: siteConfig.description,
			image: `${PUBLIC_BASE_URL}/opengraph`,
			imageAlt: `${siteConfig.name} Cover`
		}
	});

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

<MetaTags {...defaultMetaTags} />

<Toaster richColors closeButton />

<DevelopmentMode />

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
