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

<style lang="scss">
	.post-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.post-image {
		overflow: hidden;
		border-radius: var(--radius-md);
		aspect-ratio: 16 / 9;
		display: block;

		:global(picture) {
			display: block;
			width: 100%;
			height: 100%;
		}

		:global(.post-image-inner) {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.5s ease;
		}
	}

	.post-card:hover .post-image :global(.post-image-inner) {
		transform: scale(1.05);
	}

	.post-content {
		display: flex;
		flex-direction: column;
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		margin-bottom: var(--space-xs);
	}

	.post-category {
		color: var(--color-text);
		font-size: var(--font-size-xs);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-decoration: none;
	}

	.meta-divider {
		margin: 0 4px;
	}

	.post-title {
		font-family: var(--font-heading);
		line-height: 1.2;
		margin: 0;

		a {
			text-decoration: none;
			color: var(--color-text);

			&:hover {
				opacity: 0.8;
				text-decoration: underline;
			}
		}
	}

	.post-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		margin-top: var(--space-xs);
	}

	.post-tag {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		text-decoration: none;
		background-color: var(--color-base-3);
		padding: 2px 8px;
		border-radius: var(--radius-sm);

		&:hover {
			color: var(--color-primary);
			background-color: var(--color-accent);
		}
	}

	.post-excerpt {
		margin-top: var(--space-sm);
		color: var(--color-text-muted);
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		line-clamp: 3;
		overflow: hidden;
		font-size: var(--font-size-body);
	}

	/* Featured styling */
	.featured {
		gap: var(--space-lg);

		.post-title {
			font-size: var(--font-size-h2);
		}
	}

	.compact {
		.post-title {
			font-size: var(--font-size-h3);
		}
	}

	@media (min-width: 1024px) {
		.featured {
			flex-direction: row;
			align-items: center;

			.post-image {
				flex: 1.5;
			}

			.post-content {
				flex: 1;
			}
		}
	}

	@media (max-width: 768px) {
		.featured .post-title {
			font-size: var(--font-size-h3);
		}
	}
</style>
