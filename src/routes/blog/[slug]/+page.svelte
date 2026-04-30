<script lang="ts">
	import { marked } from 'marked';
	import { resolve } from '$app/paths';
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

	const htmlContent = $derived(marked.parse(post.content || '', {}));
</script>

<svelte:head>
	<title>{post.title} | Rookie's Blog</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<article class="single-post">
	<header class="post-header">
		{#if data.featuredImageUrl}
			<div class="post-hero">
				<img src={data.featuredImageUrl} alt={post.title} class="hero-image" />
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
				<p class="tags-label">Tags</p>
				<div class="tags">
					{#each post.tags as tagObj (typeof tagObj.tagsId === 'object' ? tagObj.tagsId.id : tagObj.tagsId)}
						{#if typeof tagObj.tagsId === 'object'}
							<a href={resolve(`/tag/${tagObj.tagsId.slug}`)} class="tag">#{tagObj.tagsId.name}</a>
						{/if}
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

	// -------------------------
	// Hero Header
	// -------------------------

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

	// -------------------------
	// Layout
	// -------------------------

	.container {
		width: 100%;
		max-width: 740px;
		margin: 0 auto;
		padding: 0 var(--space-sm);
	}

	// -------------------------
	// Post Meta
	// -------------------------

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

	// -------------------------
	// Article Body
	// -------------------------

	.post-body {
		.content {
			font-family: var(--font-body);
			font-size: var(--font-size-body);
			line-height: 1.85;
			color: var(--color-text);

			// --- Paragraphs ---
			:global(p) {
				margin-bottom: 1.6em;
			}

			// --- Links ---
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

			// --- Headings ---
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
				font-size: 1.2rem;
				margin: 1.6em 0 0.4em;
			}

			// --- Images ---
			:global(img) {
				max-width: 100%;
				border-radius: var(--radius-md);
				margin: var(--space-md) auto;
				display: block;
			}

			// --- Blockquote ---
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

			// --- Lists ---
			:global(ul),
			:global(ol) {
				margin-bottom: 1.6em;
				padding-left: 1.6em;
			}

			:global(ul) {
				list-style: disc;
			}

			:global(ol) {
				list-style: decimal;
			}

			:global(li) {
				margin-bottom: 0.4em;
			}

			// --- Inline code ---
			:global(code) {
				font-family: var(--font-mono);
				font-size: 0.875em;
				background-color: var(--color-bg-light);
				border: 1px solid var(--color-border);
				padding: 0.15em 0.45em;
				border-radius: var(--radius-sm);
			}

			// --- Code block ---
			:global(pre) {
				background-color: var(--color-bg-light);
				border: 1px solid var(--color-border);
				padding: var(--space-md);
				border-radius: var(--radius-md);
				overflow-x: auto;
				margin-bottom: 1.6em;

				// Reset inline-code styles when inside a block
				:global(code) {
					background: none;
					border: none;
					padding: 0;
					border-radius: 0;
					font-size: 0.9em;
				}
			}

			// --- HR ---
			:global(hr) {
				margin: var(--space-lg) 0;
				border: none;
				border-top: 1px solid var(--color-border);
			}

			// --- Strong / Em ---
			:global(strong) {
				font-weight: 600;
				color: var(--color-text);
			}

			:global(em) {
				font-style: italic;
			}
		}
	}

	// -------------------------
	// Footer & Tags
	// -------------------------

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

	// -------------------------
	// Responsive
	// -------------------------

	@media (max-width: 768px) {
		.post-title {
			font-size: var(--font-size-h2);
		}

		.post-header {
			min-height: 300px;
		}
	}
</style>
