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
