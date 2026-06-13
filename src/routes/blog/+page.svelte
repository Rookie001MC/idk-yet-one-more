<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	let { data } = $props();
	let posts = $derived(data.posts);
</script>

<div class="blog-page">
	<header class="page-header">
		<div class="container">
			<h1 class="page-title font-heading">Blog</h1>
			<p class="page-description">
				A collection of random thoughts, experiences, and whatever comes to mind.
			</p>
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
					<p>No posts found. Check back later!</p>
				</div>
			{/if}
		</div>
	</main>
</div>
