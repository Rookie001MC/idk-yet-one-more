<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import PageLayout from '$lib/layouts/PageLayout.svelte';
	import MarkdownParser from '$lib/components/markdown/MarkdownParser.svelte';
	import type { PageData } from './$types';
	import toLocalizedLongDate from '$lib/utils/dateFormatter';

	let { data }: { data: PageData } = $props();

	let isPreview = $derived(data.preview ?? false);

	// Snapshot into local $state so postMessage mutations are reactive.
	let previewContent = $state(untrack(() => (data.content ? { ...data.content } : null)));
	let serverContent = $derived(data.content ? { ...data.content } : null);
	let content = $derived(isPreview ? previewContent : serverContent);

	onMount(() => {
		if (!isPreview) return;

		const handler = (e: MessageEvent) => {
			if (e.data?.type === 'preview') {
				previewContent = { ...previewContent, ...e.data.data };
			}
		};

		window.addEventListener('message', handler);
		return () => window.removeEventListener('message', handler);
	});

	let lastUpdatedTimezoneString = $derived(
		content?.date_updated
			? toLocalizedLongDate(content.date_updated, {
					dateStyle: 'long',
					timeStyle: 'short'
				})
			: null
	);
</script>

<PageLayout title="Privacy Policy">
	<div class="prose">
		{#if content}
			{#if content.excerpt}
				<p class="lead">{content.excerpt}</p>
			{/if}
			<hr />
			{#if lastUpdatedTimezoneString}
				<p class="footer-note">Last updated: {lastUpdatedTimezoneString}</p>
			{/if}
			{#if content.content}
				<MarkdownParser content={content.content} />
			{/if}
		{:else}
			<p>Privacy policy content is currently unavailable.</p>
		{/if}
	</div>
</PageLayout>

{#if isPreview}
	<div class="preview-chip" role="status" aria-label="Preview mode active">● PREVIEW</div>
{/if}
