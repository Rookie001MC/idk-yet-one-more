<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import { resolve } from '$app/paths';

	let { data } = $props();
	let category = $derived(data.category);
	let posts = $derived(data.posts);
</script>

{#if !category}
	<div class="not-found">
		<div class="not-found-content">
			<h1 class="font-heading">Category not found.</h1>
			<p>This category may have been removed, or something went wrong loading it.</p>
			<a href={resolve('/blog')}>← Back to blog</a>
		</div>
	</div>
{:else}
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
{/if}
