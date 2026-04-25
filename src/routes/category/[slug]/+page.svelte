<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';

	let { data } = $props();
	let category = $derived(data.category);
	let posts = $derived(data.posts);
</script>

<svelte:head>
	<title>{category.name} | Rookie's Blog</title>
</svelte:head>

<div class="category-page">
	<header class="page-header">
		<div class="container">
			<span class="eyebrow">Category</span>
			<h1 class="page-title font-heading">{category.name}</h1>
			{#if category.description}
				<p class="page-description">{category.description}</p>
			{/if}
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
					<p>No posts found in this category.</p>
				</div>
			{/if}
		</div>
	</main>
</div>

<style lang="scss">
	.category-page {
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

	.page-description {
		font-size: var(--font-size-body);
		color: var(--color-text-muted);
		max-width: 600px;
		margin: 0;
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
