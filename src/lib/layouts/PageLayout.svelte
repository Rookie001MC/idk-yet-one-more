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
