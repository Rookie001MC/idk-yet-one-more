<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title?: string;
		description?: string;
		featuredImage?: {
			src: string;
			alt?: string;
		};
		children: Snippet;
	};

	let { title, description, featuredImage, children }: Props = $props();
</script>

<div class="page-layout">
	{#if title || featuredImage}
		<header class="page-header" class:has-image={!!featuredImage}>
			<div class="header-container">
				{#if title}
					<h1 class="page-title font-heading">{title}</h1>
				{/if}
				{#if description}
					<p class="page-description">{description}</p>
				{/if}

				{#if featuredImage}
					<div class="featured-image-wrapper">
						<img src={featuredImage.src} alt={featuredImage.alt || ''} class="featured-image" />
					</div>
				{/if}
			</div>
		</header>
	{/if}

	<main class="page-main">
		<div class="content-container">
			{@render children()}
		</div>
	</main>
</div>

<style lang="scss">
	.page-layout {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-top: var(--space-xl);
	}

	.page-header {
		padding: 0 var(--space-lg);
		background-color: var(--color-bg);
		text-align: left;
	}

	.header-container {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-sm);
	}

	.page-title {
		font-size: var(--font-size-h1);
		font-weight: 400;
		margin: 0;
	}

	.page-description {
		font-size: var(--font-size-body);
		color: var(--color-text-muted);
		max-width: 600px;
		margin: var(--space-sm) 0 0;
	}

	.featured-image-wrapper {
		margin-top: var(--space-lg);
		border-radius: var(--radius-md);
		overflow: hidden;
		aspect-ratio: 21 / 9;
		background-color: var(--color-bg-light);

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.page-main {
		padding-bottom: var(--space-xl);
	}

	.content-container {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-sm);
	}

	/* Responsive tweaks */
	@media (max-width: 768px) {
		.page-title {
			font-size: var(--font-size-h2);
		}

		.featured-image-wrapper {
			aspect-ratio: 16 / 9;
		}
	}
</style>
