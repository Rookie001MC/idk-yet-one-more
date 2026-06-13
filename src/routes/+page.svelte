<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import { resolve } from '$app/paths';
	import { Admonition } from '$lib/components/ui/admonition';
	import { Button } from '$lib/components/ui/button';
	import { Image } from '$lib/components/ui/image';

	let { data } = $props();
	let latestPosts = $derived(data.latestPosts);
</script>

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
