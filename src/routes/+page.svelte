<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import { resolve } from '$app/paths';
	import { Admonition } from '$lib/components/ui/admonition';
	import { Button } from '$lib/components/ui/button';
	import { Image } from '$lib/components/ui/image';
	import { MetaTags } from 'svelte-meta-tags';

	let { data } = $props();
	let latestPosts = $derived(data.latestPosts);
</script>

<MetaTags title="Home" />

<!-- Hero Section -->
<section class="hero">
	<Image src="/images/site-cover.jpg" alt="Site Cover" class="hero-bg" />
	<div class="hero-overlay"></div>

	<div class="hero-content">
		<h1 class="hero-title font-heading">
			rookienguyen's place<br />of random thoughts.
		</h1>
	</div>
</section>

<div class="page-main-content">
	<!-- Welcome Section -->
	<section class="welcome">
		<div class="welcome-container">
			<h2 class="section-heading">Hi there!</h2>
			<p class="welcome-text">
				This is the place where I would be writing anything that comes to my mind. Of course, being
				an outlet of my own <i>(almost)</i> unfiltered thoughts, this place will be random as hell.
			</p>
			<p class="welcome-text">So, with that being said, have fun, and be my guest.</p>
		</div>
	</section>

	<Admonition variant="important">
		<Admonition.Title>Here Be Warned!</Admonition.Title>
		<Admonition.Description>
			This site is still currently under construction! As this is completely rebuilt from the ground
			up, a lot of features might not work, and the site might be broken in some cases. Thanks for
			your understanding!
		</Admonition.Description>
	</Admonition>

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
					<Button href={resolve('/blog')} variant="outline">View All Posts</Button>
				</div>
			</div>
		{:else}
			<div class="posts-container">
				<p>Failed to load posts. Please try again later.</p>
			</div>
		{/if}
	</section>
</div>

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

	.page-main-content {
		max-width: 1300px;
		margin: 0 auto;
		padding: 0 var(--space-sm);
	}

	.welcome {
		padding: var(--space-xl) 0;
	}

	.welcome-container {
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

	@media (max-width: 768px) {
		.hero-title {
			font-size: 3rem;
		}

		.section-heading {
			font-size: 2.5rem;
		}
	}
</style>
