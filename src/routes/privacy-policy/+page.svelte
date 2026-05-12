<script lang="ts">
	import PageLayout from '$lib/components/layouts/PageLayout.svelte';
	import MarkdownParser from '$lib/components/markdown/MarkdownParser.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const lastUpdated = $derived(
		data.content?.date_updated
			? new Date(data.content.date_updated).toLocaleDateString('en-US', {
					month: 'long',
					year: 'numeric'
				})
			: null
	);
</script>

<MetaTags
	title="Privacy Policy"
	description="Privacy policy for Rookie's Blog. I don't collect your personal info."
/>

<PageLayout title="Privacy Policy">
	<div class="prose">
		{#if data.content}
			{#if data.content.excerpt}
				<p class="lead">{data.content.excerpt}</p>
			{/if}
			<hr />
			{#if lastUpdated}
				<p class="footer-note">Last updated: {lastUpdated}</p>
			{/if}
			{#if data.content.content}
				<MarkdownParser content={data.content.content} />
			{/if}
		{:else}
			<p>Privacy policy content is currently unavailable.</p>
		{/if}
	</div>
</PageLayout>

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
</style>
