<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import { resolve } from '$app/paths';

	let { data } = $props();
	let tag = $derived(data.tag);
	let posts = $derived(data.posts);
</script>

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
