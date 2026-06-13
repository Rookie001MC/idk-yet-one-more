<script lang="ts">
	import { ExternalLink, Play } from '@lucide/svelte';

	import { resolveEmbed } from '$lib/utils/embed';

	let {
		provider,
		href,
		title
	}: {
		provider?: string;
		href?: string;
		title?: string;
	} = $props();

	let isLoaded = $state(false);
	const embed = $derived(resolveEmbed(provider, href, title));
	const unsupportedLabel = $derived(provider?.trim() || 'embed');
</script>

{#if embed}
	<figure class="markdown-embed markdown-embed--{embed.provider}" data-layout={embed.layout}>
		{#if isLoaded}
			<div class="markdown-embed__frame">
				<iframe
					src={embed.embedUrl}
					title={embed.title}
					loading="lazy"
					referrerpolicy="strict-origin-when-cross-origin"
					allow={embed.allow}
					sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox"
					allowfullscreen
				></iframe>
			</div>
		{:else}
			<div class="markdown-embed__prompt">
				<div class="markdown-embed__copy">
					<span class="markdown-embed__provider">{embed.providerLabel}</span>
					<p class="markdown-embed__title">{embed.title}</p>
					<p>This embed connects to {embed.providerLabel} when loaded.</p>
				</div>

				<div class="markdown-embed__actions">
					<button
						class="markdown-embed__load"
						type="button"
						aria-label="Load {embed.title}"
						onclick={() => (isLoaded = true)}
					>
						<Play aria-hidden="true" size={18} strokeWidth={2.2} />
						Load embed
					</button>
					<a class="markdown-embed__open" href={embed.externalUrl} target="_blank" rel="noreferrer">
						<ExternalLink aria-hidden="true" size={16} strokeWidth={2.1} />
						Open
					</a>
				</div>
			</div>
		{/if}
	</figure>
{:else}
	<aside class="markdown-embed markdown-embed--unsupported" aria-label="Unsupported embed">
		<p>Unsupported {unsupportedLabel} embed.</p>
	</aside>
{/if}

<style lang="scss">
	.markdown-embed {
		margin: var(--space-lg) 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
		background:
			linear-gradient(135deg, rgba(0, 164, 203, 0.12), transparent 58%), var(--color-bg-light);
		color: var(--color-text);
	}

	.markdown-embed__frame {
		background-color: #000;
	}

	.markdown-embed[data-layout='video'] .markdown-embed__frame {
		aspect-ratio: 16 / 9;
	}

	.markdown-embed[data-layout='audio-compact'] .markdown-embed__frame {
		height: 152px;
	}

	.markdown-embed[data-layout='audio-large'] .markdown-embed__frame {
		height: min(380px, 70vh);
	}

	iframe {
		display: block;
		width: 100%;
		height: 100%;
		border: 0;
	}

	.markdown-embed__prompt {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: var(--space-sm);
		align-items: center;
		padding: var(--space-sm);
	}

	.markdown-embed__copy {
		min-width: 0;
	}

	.markdown-embed__provider {
		display: block;
		margin-bottom: 0.35rem;
		color: var(--color-accent);
		font-family: var(--font-mono);
		font-size: 0.78rem;
		text-transform: uppercase;
	}

	.markdown-embed__title {
		margin: 0;
		font-family: var(--font-heading);
		font-size: clamp(1.1rem, 1rem + 0.45vw, 1.45rem);
		line-height: 1.2;
		opacity: 1;
	}

	p {
		margin: 0.45rem 0 0;
		color: var(--color-text-muted);
		font-size: 0.95rem;
		line-height: 1.5;
		opacity: 0.82;
	}

	.markdown-embed__actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		justify-content: flex-end;
	}

	.markdown-embed__load,
	.markdown-embed__open {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		min-height: 2.5rem;
		border-radius: var(--radius-sm);
		font-family: var(--font-heading);
		font-weight: 650;
		line-height: 1;
		text-decoration: none;
	}

	.markdown-embed__load {
		padding: 0.65rem 0.9rem;
		background-color: var(--color-accent);
		color: var(--color-base);
	}

	.markdown-embed__open {
		padding: 0.65rem 0.75rem;
		border: 1px solid var(--color-border);
		color: var(--color-text);
	}

	.markdown-embed__load:hover,
	.markdown-embed__open:hover {
		text-decoration: none;
		filter: brightness(1.08);
	}

	.markdown-embed--unsupported {
		padding: var(--space-sm);
	}

	.markdown-embed--unsupported p {
		margin: 0;
	}

	@media (max-width: 640px) {
		.markdown-embed__prompt {
			grid-template-columns: 1fr;
		}

		.markdown-embed__actions {
			justify-content: flex-start;
		}
	}
</style>
