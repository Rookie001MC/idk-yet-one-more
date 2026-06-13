<script lang="ts">
	import type BlogPost from '$lib/types/blogPost';
	import { resolve } from '$app/paths';
	import toLocalizedLongDate from '$lib/utils/dateFormatter';
	import { resolveBlogPostExcerpt } from '$lib/utils/blogPostExcerpt';
	import { Image } from '$lib/components/ui/image';
	let {
		post,
		featured = false,
		compact = false
	} = $props<{
		post: BlogPost;
		featured?: boolean;
		compact?: boolean;
	}>();

	const formattedDate = $derived(
		post.datePublished
			? toLocalizedLongDate(post.datePublished, {
					dateStyle: 'medium',
					timeStyle: 'short'
				})
			: ''
	);

	/** CMS excerpt if set; otherwise auto-generated unless disabled for free-form posts. */
	const displayExcerpt = $derived(resolveBlogPostExcerpt(post));
</script>

<article class="post-card" class:featured class:compact>
	{#if post.featuredImage}
		<a
			href={resolve(`/blog/${post.slug}`)}
			class="post-image"
			style={`view-transition-name: image-${post.slug}`}
		>
			<Image
				src={post.featuredImage}
				alt={post.title}
				widths={[400, 800, 1200]}
				sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
				fit="cover"
				class="post-image-inner"
			/>
		</a>
	{/if}

	<div class="post-content">
		<div class="post-meta">
			{#if post.category && typeof post.category === 'object'}
				<a href={resolve(`/category/${post.category.slug}`)} class="post-category">
					{post.category.name}
				</a>
				<span class="meta-divider">·</span>
			{/if}
			<time datetime={post.datePublished}>{formattedDate}</time>
		</div>

		<h3 class="post-title">
			<a href={resolve(`/blog/${post.slug}`)}>{post.title}</a>
		</h3>

		{#if post.tags && post.tags.length > 0}
			<div class="post-tags">
				{#each post.tags as tagObj (tagObj.tagsId.id)}
					{#if tagObj.tagsId && typeof tagObj.tagsId === 'object'}
						<a href={resolve(`/tag/${tagObj.tagsId.slug}`)} class="post-tag">
							#{tagObj.tagsId.name}
						</a>
					{/if}
				{/each}
			</div>
		{/if}

		{#if displayExcerpt}
			<p class="post-excerpt">
				{displayExcerpt}
			</p>
		{/if}
	</div>
</article>
