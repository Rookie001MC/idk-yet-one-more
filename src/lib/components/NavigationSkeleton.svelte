<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Skeleton } from '$lib/components/ui/skeleton';

	type Variant = 'page' | 'post';

	let { variant = 'page' }: { variant?: Variant } = $props();

	const articleLines = [96, 88, 92, 76, 84, 68];
	const pageLines = [72, 100, 92];
	const pageCards = [0, 1, 2];
</script>

<div
	class={`navigation-skeleton navigation-skeleton--${variant}`}
	role="status"
	aria-live="polite"
	aria-label="Loading page"
	transition:fade={{ duration: 140 }}
>
	<div class="navigation-skeleton__inner">
		{#if variant === 'post'}
			<div class="navigation-skeleton__article">
				<div class="navigation-skeleton__meta">
					<Skeleton class="navigation-skeleton__pill" />
					<Skeleton class="navigation-skeleton__pill navigation-skeleton__pill--short" />
				</div>

				<div class="navigation-skeleton__title-stack" aria-hidden="true">
					<Skeleton class="navigation-skeleton__title" />
					<Skeleton class="navigation-skeleton__title navigation-skeleton__title--short" />
				</div>

				<Skeleton class="navigation-skeleton__media" />

				<div class="navigation-skeleton__body">
					{#each articleLines as line (line)}
						<Skeleton class="navigation-skeleton__line" style={`--line-width: ${line}%`} />
					{/each}
				</div>
			</div>
		{:else}
			<div class="navigation-skeleton__page">
				<Skeleton class="navigation-skeleton__eyebrow" />
				<div class="navigation-skeleton__title-stack" aria-hidden="true">
					<Skeleton class="navigation-skeleton__title" />
					<Skeleton class="navigation-skeleton__title navigation-skeleton__title--medium" />
				</div>

				<div class="navigation-skeleton__summary">
					{#each pageLines as line (line)}
						<Skeleton class="navigation-skeleton__line" style={`--line-width: ${line}%`} />
					{/each}
				</div>

				<div class="navigation-skeleton__grid">
					{#each pageCards as card (card)}
						<div class="navigation-skeleton__card">
							<Skeleton class="navigation-skeleton__card-media" />
							<Skeleton class="navigation-skeleton__card-title" />
							<Skeleton
								class="navigation-skeleton__line"
								style={`--line-width: ${card === 1 ? 72 : 88}%`}
							/>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.navigation-skeleton {
		position: fixed;
		inset: 0;
		z-index: 90;
		overflow: hidden auto;
		padding: clamp(6rem, 12vh, 8rem) var(--space-sm) var(--space-lg);
		background:
			linear-gradient(180deg, rgba(10, 4, 42, 0.92) 0%, var(--color-bg) 62%), var(--color-bg);
		backdrop-filter: blur(16px);
	}

	.navigation-skeleton::before {
		content: '';
		position: absolute;
		inset: 0 0 auto;
		height: 1px;
		background: color-mix(in srgb, var(--color-accent) 36%, transparent);
	}

	.navigation-skeleton__inner {
		position: relative;
		width: min(100%, 1200px);
		margin: 0 auto;
	}

	.navigation-skeleton__article,
	.navigation-skeleton__page {
		display: grid;
		gap: var(--space-md);
	}

	.navigation-skeleton__article {
		max-width: 760px;
		margin: 0 auto;
	}

	.navigation-skeleton__page {
		max-width: 1100px;
	}

	.navigation-skeleton__meta,
	.navigation-skeleton__summary,
	.navigation-skeleton__body {
		display: grid;
		gap: var(--space-xs);
	}

	.navigation-skeleton__meta {
		grid-template-columns: 8rem 5.5rem;
	}

	.navigation-skeleton__title-stack {
		display: grid;
		gap: 0.85rem;
	}

	.navigation-skeleton__pill {
		width: 100%;
		height: 1.2rem;
		border-radius: var(--radius-full);
	}

	.navigation-skeleton__pill--short {
		width: 80%;
	}

	.navigation-skeleton__eyebrow {
		width: 7rem;
		height: 1rem;
		border-radius: var(--radius-full);
	}

	.navigation-skeleton__title {
		width: min(100%, 42rem);
		height: clamp(2.5rem, 7vw, 4.8rem);
	}

	.navigation-skeleton__title--short {
		width: min(72%, 30rem);
	}

	.navigation-skeleton__title--medium {
		width: min(84%, 34rem);
	}

	.navigation-skeleton__media {
		width: 100%;
		height: clamp(18rem, 46vh, 34rem);
	}

	.navigation-skeleton__line {
		width: var(--line-width, 100%);
		height: 1.05rem;
	}

	.navigation-skeleton__grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-md);
		margin-top: var(--space-sm);
	}

	.navigation-skeleton__card {
		display: grid;
		gap: var(--space-xs);
		min-width: 0;
	}

	.navigation-skeleton__card-media {
		width: 100%;
		aspect-ratio: 4 / 3;
	}

	.navigation-skeleton__card-title {
		width: 82%;
		height: 1.6rem;
	}

	@media (max-width: 768px) {
		.navigation-skeleton {
			padding-top: 5.75rem;
		}

		.navigation-skeleton__meta {
			grid-template-columns: 7rem 4.5rem;
		}

		.navigation-skeleton__media {
			height: clamp(14rem, 34vh, 22rem);
		}

		.navigation-skeleton__grid {
			grid-template-columns: 1fr;
		}

		.navigation-skeleton__card {
			grid-template-columns: 7rem 1fr;
			align-items: center;
		}

		.navigation-skeleton__card-media {
			aspect-ratio: 1;
		}
	}
</style>
