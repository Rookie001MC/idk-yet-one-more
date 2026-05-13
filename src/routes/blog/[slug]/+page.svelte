<script lang="ts">
	import { resolve } from '$app/paths';
	import BlogPostLayout from '$lib/components/layouts/BlogPostLayout.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	let { data } = $props();
	let post = $derived(data.post);

	const imageUrl = $derived.by(() => {
		if (data.featuredImageUrl) {
			return `${PUBLIC_BASE_URL}${data.featuredImageUrl}`;
		}

		// Generate dynamic OG image URL with post details
		const params = new SvelteURLSearchParams({
			title: post?.title || '',
			description: post?.excerpt || ''
		});

		if (post?.category && typeof post.category === 'object') {
			params.set('category', post.category.name);
		}

		return `${PUBLIC_BASE_URL}/opengraph?${params.toString()}`;
	});
</script>

{#if post}
	<MetaTags
		title={post.title}
		description={post.excerpt ?? ''}
		openGraph={{
			type: 'article',
			url: `${PUBLIC_BASE_URL}/blog/${post.slug}`,
			title: post.title,
			description: post.excerpt ?? '',
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: post.title
				}
			],
			article: {
				publishedTime: post.datePublished ?? undefined,
				authors: ['Rookie Nguyen']
			}
		}}
		twitter={{
			cardType: 'summary_large_image',
			title: post.title,
			description: post.excerpt ?? '',
			image: imageUrl,
			imageAlt: post.title
		}}
	/>
{:else}
	<MetaTags title="Post Not Found" />
{/if}

{#if !post}
	<div class="not-found">
		<div class="not-found-content">
			<h1 class="font-heading">Post not found.</h1>
			<p>This post may have been removed, or something went wrong loading it.</p>
			<a href={resolve('/blog')}>← Back to blog</a>
		</div>
	</div>
{:else}
	<BlogPostLayout {post} featuredImageUrl={data.featuredImageUrl} />
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
</style>
