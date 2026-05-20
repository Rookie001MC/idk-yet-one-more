<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import PageLayout from '$lib/layouts/PageLayout.svelte';
	import MarkdownParser from '$lib/components/markdown/MarkdownParser.svelte';
	import type { PageData } from './$types';
	import toLocalizedLongDate from '$lib/utils/dateFormatter';

	let { data }: { data: PageData } = $props();

	let isPreview = $derived(data.preview ?? false);

	// Snapshot into local $state so postMessage mutations are reactive.
	let content = $state(untrack(() => (data.content ? { ...data.content } : null)));

	// Outside preview mode, keep content in sync with server data.
	$effect(() => {
		if (!isPreview) content = data.content ? { ...data.content } : null;
	});

	onMount(() => {
		if (!isPreview) return;

		const handler = (e: MessageEvent) => {
			if (e.data?.type === 'preview') {
				content = { ...content, ...e.data.data };
			}
		};

		window.addEventListener('message', handler);
		return () => window.removeEventListener('message', handler);
	});

	let lastUpdatedTimezoneString: string | null = $derived(null);

	$effect(() => {
		if (content?.date_updated) {
			lastUpdatedTimezoneString = toLocalizedLongDate(content.date_updated, {
				dateStyle: 'long',
				timeStyle: 'short'
			});
		}
	});
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

<style lang="scss">
	.prose {
		.lead {
			font-size: 1.25em;
			font-weight: 500;
			margin-bottom: var(--space-md);
		}

		:global(h2) {
			font-family: var(--font-heading);
			font-size: var(--font-size-h2);
			margin-bottom: var(--space-sm);
		}

		:global(ul) {
			margin: var(--space-md) 0;
			padding-left: var(--space-md);

			:global(li) {
				margin-bottom: var(--space-xs);
			}
		}

		.footer-note {
			font-size: var(--font-size-md);
			color: var(--color-text-muted);
		}
	}

	.preview-chip {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		z-index: 9999;
		padding: 0.25rem 0.75rem;
		border-radius: 999px;
		background: #7c3aed;
		color: #fff;
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		font-weight: 700;
		letter-spacing: 0.06em;
		pointer-events: none;
		user-select: none;
	}
</style>
