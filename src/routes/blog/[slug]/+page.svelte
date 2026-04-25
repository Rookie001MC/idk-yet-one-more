<script lang="ts">
	import { marked } from 'marked';
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public';

	let { data } = $props();
	let post = $derived(data.post);

	const formattedDate = $derived(
		post.datePublished
			? new Date(post.datePublished).toLocaleDateString('vi-VN', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric'
				})
			: ''
	);

	const htmlContent = $derived(marked.parse(post.content || ''));
</script>

<svelte:head>
	<title>{post.title} | Rookie's Blog</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<article class="single-post">
	<header class="post-header">
		{#if post.featuredImage}
			<div class="post-hero">
				<img
					src={`${PUBLIC_DIRECTUS_URL}/assets/${post.featuredImage.id}?width=1920&height=1080&fit=cover`}
					alt={post.featuredImage.title}
					class="hero-image"
				/>
				<div class="hero-overlay"></div>
			</div>
		{/if}

		<div class="header-content container">
			<div class="post-meta">
				{#if post.category}
					<a href="/category/{post.category.slug}" class="post-category">
						{post.category.name}
					</a>
					<span class="meta-divider">·</span>
				{/if}
				<time datetime={post.datePublished}>{formattedDate}</time>
			</div>
			<h1 class="post-title font-heading">{post.title}</h1>
		</div>
	</header>

	<div class="post-body container">
		<div class="content">
			{@html htmlContent}
		</div>

		{#if post.tags && post.tags.length > 0}
			<footer class="post-footer">
				<div class="tags">
					{#each post.tags as tagObj (tagObj.tagsId.id)}
						<a href="/tag/{tagObj.tagsId.slug}" class="tag">#{tagObj.tagsId.name}</a>
					{/each}
				</div>
			</footer>
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
		min-height: 400px;
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

		.hero-image {
			width: 100%;
			height: 100%;
			object-fit: cover;
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
	}

	.container {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		padding: 0 var(--space-md);
	}

	.post-meta {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-xs);
		font-size: var(--font-size-body);
		color: var(--color-text-muted);
		margin-bottom: var(--space-sm);
	}

	.post-category {
		color: var(--color-text);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-decoration: none;
	}

	.post-title {
		font-size: var(--font-size-h1);
		line-height: 1.1;
		margin: 0;
	}

	.post-body {
		.content {
			font-family: var(--font-body);
			font-size: var(--font-size-body);
			line-height: 1.8;
			color: var(--color-text);

			:global(p) {
				margin-bottom: var(--space-md);
			}

			:global(h2) {
				font-family: var(--font-heading);
				font-size: var(--font-size-h2);
				margin: var(--space-lg) 0 var(--space-sm);
			}

			:global(h3) {
				font-family: var(--font-heading);
				font-size: var(--font-size-h3);
				margin: var(--space-md) 0 var(--space-sm);
			}

			:global(img) {
				max-width: 100%;
				border-radius: var(--radius-md);
				margin: var(--space-md) auto;
			}

			:global(blockquote) {
				border-left: 4px solid var(--color-text);
				padding-left: var(--space-md);
				margin: var(--space-md) 0;
				font-style: italic;
				color: var(--color-text-muted);
			}

			:global(ul) {
				margin-bottom: var(--space-md);
				padding-left: var(--space-md);
			}

			:global(ol) {
				margin-bottom: var(--space-md);
				padding-left: var(--space-md);
			}

			:global(li) {
				margin-bottom: var(--space-xs);
			}

			:global(pre) {
				background-color: var(--color-bg-light);
				padding: var(--space-md);
				border-radius: var(--radius-md);
				overflow-x: auto;
				margin-bottom: var(--space-md);
			}

			:global(code) {
				font-family: var(--font-mono);
				font-size: 0.9em;
				background-color: var(--color-bg-light);
				padding: 0.2em 0.4em;
				border-radius: var(--radius-sm);
			}
		}
	}

	.post-footer {
		margin-top: var(--space-xl);
		padding-top: var(--space-md);
		border-top: 1px solid var(--color-border);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}

	.tag {
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
	}

	@media (max-width: 768px) {
		.post-title {
			font-size: var(--font-size-h2);
		}

		.post-header {
			min-height: 300px;
		}
	}
</style>
