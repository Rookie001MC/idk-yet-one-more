<script lang="ts">
	import { resolve } from '$app/paths';
	import MarkdownParser from '$lib/components/markdown/MarkdownParser.svelte';
	import TableOfContents from '$lib/components/toc/TableOfContents.svelte';
	import toLocalizedLongDate from '$lib/utils/dateFormatter';
	import { Image } from '$lib/components/ui/image';
	import { resolveBlogPostExcerpt } from '$lib/utils/blogPostExcerpt';
	import type BlogPost from '$lib/types/blogPost';
	import { parseHeadings } from '$lib/utils/toc';

	type Props = {
		post: BlogPost;
	};

	let { post }: Props = $props();

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

	const tocHeadings = $derived(parseHeadings(post.content ?? ''));
</script>

<article class="single-post">
	<header class="post-header">
		{#if post.featuredImage}
			<div class="post-hero">
				<div class="hero-image-wrapper" style={`view-transition-name: image-${post.slug}`}>
					<Image
						src={post.featuredImage}
						alt={post.title ?? ''}
						lazy={false}
						widths={[800, 1200, 1600, 2400]}
						sizes="100vw"
						fit="cover"
						class="hero-image"
					/>
				</div>
				<div class="hero-overlay"></div>
			</div>
		{/if}

		<div class="header-content container">
			<div class="post-meta">
				{#if post.category && typeof post.category === 'object'}
					<a href={resolve(`/category/${post.category.slug}`)} class="post-category">
						{post.category.name}
					</a>
				{/if}
				<time datetime={post.datePublished ?? undefined}>{formattedDate}</time>
			</div>
			<h1 class="post-title font-heading">{post.title}</h1>
			{#if displayExcerpt}
				<p class="post-excerpt">{displayExcerpt}</p>
			{/if}
		</div>
	</header>

	<div class="post-body" class:has-toc={tocHeadings.length > 1}>
		<div class="post-main">
			<div class="content">
				<MarkdownParser content={post.content ?? ''} />
			</div>

			{#if post.tags && post.tags.length > 0}
				<footer class="post-footer">
					<p class="tags-label">Tags</p>
					<div class="tags">
						{#each post.tags as tagObj (typeof tagObj.tagsId === 'object' ? tagObj.tagsId.id : tagObj.tagsId)}
							{#if typeof tagObj.tagsId === 'object'}
								<a href={resolve(`/tag/${tagObj.tagsId.slug}`)} class="tag">#{tagObj.tagsId.name}</a
								>
							{/if}
						{/each}
					</div>
				</footer>
			{/if}
		</div>

		{#if tocHeadings.length > 1}
			<TableOfContents headings={tocHeadings} />
		{/if}
	</div>
</article>

<style lang="scss">
	.single-post {
		padding-bottom: var(--space-xl);
	}

	.post-header {
		position: relative;
		margin-bottom: var(--space-xl);
		min-height: 650px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding-bottom: var(--space-lg);
	}

	.post-hero {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;

		/* picture + img live inside <Image> — pierce scoping with :global */
		:global(picture) {
			display: block;
			width: 100%;
			height: 100%;
		}

		:global(.hero-image) {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		.hero-image-wrapper {
			width: 100%;
			height: 100%;
		}

		.hero-overlay {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(to bottom, rgba(16, 13, 46, 0.4) 0%, var(--color-bg) 100%);
		}
	}

	.header-content {
		position: relative;
		z-index: 10;
		text-align: center;
		width: 100%;
		max-width: 740px;
		margin: 0 auto;
		padding: 0 var(--space-sm);

		.post-title {
			margin-bottom: 1.2rem;
		}
	}

	.post-meta {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		margin-bottom: var(--space-sm);
		opacity: 0.8;
		letter-spacing: 0.02em;
	}

	.post-category {
		color: var(--color-accent);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		text-decoration: none;
		font-size: var(--font-size-sm);
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 0.7;
			text-decoration: none;
		}
	}

	.post-title {
		font-size: var(--font-size-h1);
		line-height: 1.1;
		margin: 0;
	}

	.post-body {
		width: 100%;
		max-width: 740px;
		margin: 0 auto;
		padding: 0 var(--space-sm);

		&.has-toc {
			@media (min-width: 1201px) {
				max-width: 1060px;
				display: grid;
				grid-template-columns: minmax(0, 740px) 220px;
				column-gap: var(--space-lg);
				align-items: start;
			}
		}
	}

	.post-main {
		min-width: 0;

		.content {
			font-family: var(--font-body);
			font-size: var(--font-size-body);
			line-height: 1.85;
			color: var(--color-text);

			:global(p) {
				margin-bottom: 1.6em;
			}

			:global(a) {
				color: var(--color-accent);
				text-decoration: underline;
				text-decoration-thickness: 1px;
				text-underline-offset: 3px;
				transition:
					color 0.2s ease,
					text-decoration-color 0.2s ease;

				&:hover {
					color: var(--color-text);
					text-decoration-color: transparent;
				}
			}

			:global(h2) {
				font-family: var(--font-heading);
				font-size: var(--font-size-h2);
				line-height: 1.2;
				font-weight: 400;
				margin: 2.5em 0 0.6em;
			}

			:global(h3) {
				font-family: var(--font-heading);
				font-size: var(--font-size-h3);
				line-height: 1.2;
				font-weight: 400;
				margin: 2em 0 0.5em;
			}

			:global(h4) {
				font-family: var(--font-heading);
				font-size: var(--font-size-h4);
				margin: 1.6em 0 0.4em;
			}

			:global(img) {
				max-width: 100%;
				border-radius: var(--radius-md);
				margin: var(--space-md) auto;
				display: block;
			}

			:global(blockquote) {
				border-left: 3px solid var(--color-accent);
				padding: 0.2em 0 0.2em var(--space-md);
				margin: var(--space-md) 0;
				color: var(--color-text-muted);
				opacity: 0.85;

				:global(p) {
					margin-bottom: 0;
				}
			}

			:global(ul),
			:global(ol) {
				margin-bottom: 1.6em;
				padding-left: 1.6em;
			}

			:global(code) {
				font-family: var(--font-mono);
				font-size: 0.875em;
				background-color: var(--color-bg-light);
				border: 1px solid var(--color-border);
				padding: 0.15em 0.45em;
				border-radius: var(--radius-sm);
			}

			:global(pre) {
				background-color: var(--color-bg-light);
				border: 1px solid var(--color-border);
				padding: var(--space-md);
				border-radius: var(--radius-md);
				overflow-x: auto;
				margin-bottom: 1.6em;

				:global(code) {
					background: none;
					border: none;
					padding: 0;
					border-radius: 0;
					font-size: 0.9em;
				}
			}

			:global(hr) {
				margin: var(--space-lg) 0;
				border: none;
				border-top: 1px solid var(--color-border);
			}

			:global(strong) {
				font-weight: 600;
				color: var(--color-text);
			}

			:global(em) {
				font-style: italic;
			}
		}
	}

	.post-footer {
		margin-top: var(--space-xl);
		padding-top: var(--space-md);
		border-top: 1px solid var(--color-border);
	}

	.tags-label {
		font-size: var(--font-size-xs);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-text-muted);
		opacity: 0.6;
		margin-bottom: var(--space-xs);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		display: inline-block;
		color: var(--color-text-muted);
		font-size: var(--font-size-xs);
		background-color: var(--color-bg-light);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		padding: 0.3em 0.85em;
		text-decoration: none;
		letter-spacing: 0.03em;
		transition:
			border-color 0.2s ease,
			color 0.2s ease;

		&:hover {
			border-color: var(--color-accent);
			color: var(--color-accent);
			text-decoration: none;
		}
	}

	@media (max-width: 768px) {
		.post-title {
			font-size: var(--font-size-h2);
		}

		.post-header {
			min-height: 500px;
			margin-bottom: var(--space-sm);
		}
	}
</style>
