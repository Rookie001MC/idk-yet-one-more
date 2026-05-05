<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import { resolve } from '$app/paths';
	import { PUBLIC_BASE_URL } from '$env/static/public';

	let { data } = $props();
	let tag = $derived(data.tag);
	let posts = $derived(data.posts);
</script>

{#if tag}
	<MetaTags
		title={`Tag: ${tag.name}`}
		description={`Posts tagged with ${tag.name}`}
		openGraph={{
			images: [
				{
					url: `${PUBLIC_BASE_URL}/opengraph?title=${encodeURIComponent(`#${tag.name}`)}&description=${encodeURIComponent(`Posts tagged with ${tag.name}`)}&category=Tag`,
					width: 1200,
					height: 630,
					alt: `Tag: ${tag.name}`
				}
			]
		}}
		twitter={{
			image: `${PUBLIC_BASE_URL}/opengraph?title=${encodeURIComponent(`#${tag.name}`)}&description=${encodeURIComponent(`Posts tagged with ${tag.name}`)}&category=Tag`,
			imageAlt: `Tag: ${tag.name}`
		}}
	/>
{:else}
	<MetaTags title="Tag Not Found" />
{/if}

{#if !tag}
	<div class="not-found">
		<div class="not-found-content">
			<h1 class="font-heading">Tag not found.</h1>
			<p>This tag may have been removed, or something went wrong loading it.</p>
			<a href={resolve('/blog')}>← Back to blog</a>
		</div>
	</div>
{:else}
	<div class="tag-page">
		<header class="page-header">
			<div class="container">
				<span class="eyebrow">Tag</span>
				<h1 class="page-title font-heading">#{tag.name}</h1>
			</div>
		</header>

		<main class="posts-section">
			<div class="container">
				{#if posts.length > 0}
					<div class="posts-grid">
						{#each posts as post (post.id)}
							<PostCard {post} />
						{/each}
					</div>
				{:else}
					<div class="no-posts">
						<p>No posts found with this tag.</p>
					</div>
				{/if}
			</div>
		</main>
	</div>
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

	.tag-page {
		padding-top: var(--space-xl);
	}

	.page-header {
		padding: var(--space-xl) 0 var(--space-lg);
		background-color: var(--color-bg);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-sm);
	}

	.eyebrow {
		text-transform: uppercase;
		font-weight: 700;
		font-size: var(--font-size-xs);
		letter-spacing: 0.1em;
		color: var(--color-text-muted);
		display: block;
		margin-bottom: var(--space-xs);
	}

	.page-title {
		font-size: var(--font-size-h1);
		font-weight: 400;
		margin: 0 0 var(--space-sm);
	}

	.posts-section {
		padding-bottom: var(--space-xl);
	}

	.posts-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-xl) var(--space-lg);

		@media (min-width: 768px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media (min-width: 1024px) {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.no-posts {
		text-align: center;
		padding: var(--space-xl) 0;
		color: var(--color-text-muted);
		font-size: var(--font-size-body);
	}

	@media (max-width: 768px) {
		.page-title {
			font-size: var(--font-size-h2);
		}
	}
</style>
