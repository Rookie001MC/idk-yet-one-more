<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// isPreview stays in sync with the server data prop.
	let isPreview = $derived(data.preview);

	// Snapshot the initial post into local $state so postMessage mutations are reactive.
	// untrack is used intentionally: post is a one-time snapshot that diverges from data.post
	// after mount (it gets patched by postMessage events).
	let post = $state(untrack(() => ({ ...data.post })));

	onMount(() => {
		if (!isPreview) return;

		const handler = (event: MessageEvent) => {
			if (event.data?.type === 'preview') {
				post = { ...post, ...event.data.data };
			}
		};

		window.addEventListener('message', handler);
		return () => window.removeEventListener('message', handler);
	});
</script>

{#if post}
	<article>
		<h1>{post.title}</h1>
		<p>Slug: {post.slug}</p>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<div>{@html post.content ?? ''}</div>
		{#if isPreview}
			<p style="color:red;">Preview Mode</p>
		{/if}
	</article>
{:else}
	<p>Loading...</p>
{/if}
