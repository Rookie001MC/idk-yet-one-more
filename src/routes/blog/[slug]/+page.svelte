<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import { resolve } from '$app/paths';
	import BlogPostLayout from '$lib/layouts/BlogPostLayout.svelte';
	let { data } = $props();
	let isPreview = $derived(data.preview ?? false);

	// Snapshot into local $state so postMessage mutations are reactive.
	// untrack prevents data.post from becoming a reactive dependency here —
	// previewPost is intentionally diverged from data.post in preview mode.
	let previewPost = $state(untrack(() => (data.post ? { ...data.post } : null)));
	let serverPost = $derived(data.post ? { ...data.post } : null);
	let post = $derived(isPreview ? previewPost : serverPost);

	onMount(() => {
		if (!isPreview) return;

		const handler = (e: MessageEvent) => {
			if (e.data?.type === 'preview') {
				previewPost = { ...previewPost, ...e.data.data };
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
