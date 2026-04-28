<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import siteCover from '$lib/assets/site-cover.jpg';
	import { resolve } from '$app/paths';

	let { data } = $props();
	let latestPosts = $derived(data.latestPosts);
</script>

<svelte:head>
	<title>Home | Rookie's Blog</title>
</svelte:head>

<!-- Hero Section -->
<section class="hero">
	<img src={siteCover} alt="Site Cover" class="hero-bg" />
	<div class="hero-overlay"></div>

	<div class="hero-content">
		<h1 class="hero-title font-heading">
			rookienguyen's place<br />of random thoughts.
		</h1>
	</div>
</section>

<!-- Welcome Section -->
<section class="welcome">
	<div class="welcome-container">
		<h2 class="section-heading">Hi there!</h2>
		<p class="welcome-text">
			This is the place where I would be writing anything that comes to my mind. Of course, being an
			outlet of my own <i>(almost)</i> unfiltered thoughts, this place will be random as hell.
		</p>
		<p class="welcome-text">So, with that being said, have fun, and be my guest.</p>
	</div>
</section>

<!-- Latest Posts Section -->
<section class="latest-posts">
	<!-- if connection to Directus is not available, disable this section entirely-->
	{#if !data.cmsError}
		<div class="posts-container">
			<h2 class="section-heading">Latest posts</h2>

			{#if latestPosts.length > 0}
				<div class="featured-post-wrapper">
					<PostCard post={latestPosts[0]} featured={true} />
				</div>
			{/if}

			{#if latestPosts.length > 1}
				<div class="posts-grid">
					{#each latestPosts.slice(1) as post (post.id)}
						<PostCard {post} compact={true} />
					{/each}
				</div>
			{/if}

			<div class="view-all-wrapper">
				<a href={resolve('/blog')} class="btn-primary">View All Posts</a>
			</div>
		</div>
	{/if}
</section>

<style lang="scss">
	.hero {
		position: relative;
		height: 100vh;
		min-height: 600px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.hero-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 1;
	}

	.hero-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, rgba(16, 13, 46, 0.3) 0%, var(--color-bg) 100%);
		z-index: 2;
	}

	.hero-content {
		position: relative;
		z-index: 10;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-sm) var(--space-xl);
		height: 100%;
		display: flex;
		align-items: flex-end;
	}

	.hero-title {
		max-width: 800px;
		line-height: 1.1;
		font-size: var(--font-size-hero);
		font-weight: 400;
		color: #ffffff;
		text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
		margin: 0;
	}

	.welcome {
		padding: var(--space-xl) 0;
	}

	.welcome-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-sm);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.section-heading {
		font-size: var(--font-size-h2);
		font-weight: 400;
		margin: 0;
	}

	.welcome-text {
		margin: 0;

		& + .welcome-text {
			margin-top: var(--space-sm);
		}
	}

	.latest-posts {
		padding: var(--space-lg) 0;
	}

	.posts-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-sm);
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	.featured-post-wrapper {
		margin-bottom: var(--space-lg);
	}

	.posts-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-lg);

		@media (min-width: 768px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media (min-width: 1024px) {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.view-all-wrapper {
		text-align: center;
		margin-top: var(--space-lg);
	}

	.btn-primary {
		display: inline-block;
		padding: 0.75rem 2rem;
		border: 1px solid var(--color-text);
		border-radius: var(--radius-full);
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-decoration: none;
		color: var(--color-text);
		transition:
			background-color 0.2s ease,
			color 0.2s ease;

		&:hover {
			background-color: var(--color-text);
			color: var(--color-bg);
		}
	}

	@media (max-width: 768px) {
		.hero-title {
			font-size: 3rem;
		}

		.section-heading {
			font-size: 2.5rem;
		}
	}
</style>
