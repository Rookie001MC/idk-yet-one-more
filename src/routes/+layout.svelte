<script lang="ts">
	import '$lib/styles/main.scss';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import DevelopmentMode from '$lib/components/DevelopmentMode.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import { MetaTags } from 'svelte-meta-tags';
	import { page } from '$app/state';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import { env } from '$env/dynamic/public';
	import siteConfig from '$lib/config';
	import type { PageMeta } from '$lib/types/pageMeta';

	let { data, children } = $props();

	// Read page-level meta returned by any +page.server.ts or +page.ts load function.
	// Falls back to site-wide defaults when a page doesn't supply its own meta.
	const meta = $derived((page.data as { meta?: PageMeta }).meta);

	const resolvedTitle       = $derived(meta?.title       ?? siteConfig.name);
	const resolvedDescription = $derived(meta?.description ?? siteConfig.description);
	const resolvedImageUrl    = $derived(meta?.imageUrl    ?? `${PUBLIC_BASE_URL}/opengraph`);
	const resolvedType        = $derived(meta?.type        ?? 'website');

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

<MetaTags
	title={resolvedTitle}
	titleTemplate={`%s | ${siteConfig.name}`}
	description={resolvedDescription}
	canonical={`${PUBLIC_BASE_URL}${page.url.pathname}`}
	openGraph={{
		type: resolvedType,
		url: `${PUBLIC_BASE_URL}${page.url.pathname}`,
		title: resolvedTitle,
		description: resolvedDescription,
		images: [
			{
				url: resolvedImageUrl,
				width: 1200,
				height: 630,
				alt: resolvedTitle
			}
		],
		siteName: siteConfig.name,
		...(resolvedType === 'article' && {
			article: {
				publishedTime: meta?.publishedTime,
				authors: meta?.authors ?? ['Rookie Nguyen']
			}
		})
	}}
	twitter={{
		cardType: 'summary_large_image',
		title: resolvedTitle,
		description: resolvedDescription,
		image: resolvedImageUrl,
		imageAlt: resolvedTitle
	}}
/>

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
