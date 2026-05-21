<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import { resolve } from '$app/paths';
	import BlogPostLayout from '$lib/layouts/BlogPostLayout.svelte';
	let { data } = $props();
	let isPreview = $derived(data.preview ?? false);

	// Snapshot into local $state so postMessage mutations are reactive.
	// untrack prevents data.post from becoming a reactive dependency here —
	// post is intentionally diverged from data.post in preview mode.
	let post = $state(untrack(() => (data.post ? { ...data.post } : null)));

	// Outside preview mode, keep post in sync with server data (e.g. on invalidation).
	$effect(() => {
		if (!isPreview) post = data.post ? { ...data.post } : null;
	});

	onMount(() => {
		if (!isPreview) return;

		const handler = (e: MessageEvent) => {
			if (e.data?.type === 'preview') {
				post = { ...post, ...e.data.data };
			}
		};

		window.addEventListener('message', handler);
		return () => window.removeEventListener('message', handler);
	});

</script>

{#if !post}
	<div class="not-found">
		<div class="not-found-content">
			<h1 class="font-heading">Post not found.</h1>
			<p>This post may have been removed, or something went wrong loading it.</p>
			<a href={resolve('/blog')}>← Back to blog</a>
		</div>
	</div>
{:else}
	<BlogPostLayout {post} />
{/if}

{#if isPreview}
	<div class="preview-chip" role="status" aria-label="Preview mode active">● PREVIEW</div>
{/if}

<style lang="scss">
	.not-found {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 60vh;
		padding: var(--space-xl) var(--space-sm);
		text-align: center;
	}

	.not-found-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);

		h1 {
			font-size: var(--font-size-h2);
		}

		p {
			color: var(--color-text-muted);
			margin: 0;
		}

		a {
			color: var(--color-accent);
			text-decoration: underline;
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
