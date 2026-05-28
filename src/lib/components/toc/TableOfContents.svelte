<script lang="ts">
	import { onMount } from 'svelte';
	import { List, X } from '@lucide/svelte';
	import type { TocHeading } from '$lib/utils/toc';

	let {
		headings = undefined,
		contentSelector = 'article'
	}: {
		headings?: TocHeading[];
		contentSelector?: string;
	} = $props();

	let domHeadings = $state<TocHeading[]>([]);
	let activeId = $state<string>('');
	let mobileOpen = $state(false);

	const items = $derived(headings && headings.length > 0 ? headings : domHeadings);

	function close() {
		mobileOpen = false;
	}

	function handleAnchorClick(id: string) {
		activeId = id;
		mobileOpen = false;
	}

	onMount(() => {
		if (!headings || headings.length === 0) {
			const container = document.querySelector(contentSelector);
			if (container) {
				const els = container.querySelectorAll<HTMLElement>('h2[id], h3[id], h4[id]');
				domHeadings = Array.from(els).map((el) => ({
					id: el.id,
					text: el.textContent ?? '',
					level: parseInt(el.tagName[1], 10)
				}));
			}
		}

		function onScroll() {
			const headingEls = document.querySelectorAll<HTMLElement>('h2[id], h3[id], h4[id]');
			let current = '';
			for (const el of headingEls) {
				if (el.offsetTop <= window.scrollY + 100) {
					current = el.id;
				}
			}
			activeId = current;
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	});
</script>

{#if items.length > 1}
	<nav class="toc" aria-label="Table of contents">
		<!-- Desktop sidebar -->
		<div class="toc-inner">
			<p class="toc-title">Table of Contents</p>
			<ol class="toc-list">
				{#each items as heading (heading.id)}
					<li class="toc-item" data-level={heading.level}>
						<a
							href="#{heading.id}"
							class:active={activeId === heading.id}
							onclick={() => handleAnchorClick(heading.id)}
						>
							{heading.text}
						</a>
					</li>
				{/each}
			</ol>
		</div>

		<!-- Mobile FAB -->
		<button class="toc-fab" aria-label="Open table of contents" onclick={() => (mobileOpen = true)}>
			<List size={20} />
		</button>

		<!-- Mobile overlay / bottom sheet -->
		{#if mobileOpen}
			<div class="toc-overlay" role="dialog" aria-modal="true" aria-label="Table of contents">
				<button class="toc-backdrop" onclick={close} aria-label="Close table of contents"></button>
				<div class="toc-panel">
					<div class="toc-panel-header">
						<p class="toc-title">Table of Contents</p>
						<button onclick={close} aria-label="Close">
							<X size={18} />
						</button>
					</div>
					<ol class="toc-list">
						{#each items as heading (heading.id)}
							<li class="toc-item" data-level={heading.level}>
								<a
									href="#{heading.id}"
									class:active={activeId === heading.id}
									onclick={() => handleAnchorClick(heading.id)}
								>
									{heading.text}
								</a>
							</li>
						{/each}
					</ol>
				</div>
			</div>
		{/if}
	</nav>
{/if}

<style lang="scss">
	.toc {
		/* Desktop: sticky sidebar */
		@media (min-width: 1201px) {
			position: sticky;
			top: var(--space-xl);
			max-height: calc(100vh - var(--space-xl));
			overflow-y: auto;
		}
	}

	/* Desktop: show inline sidebar; hide on mobile */
	.toc-inner {
		display: none;

		@media (min-width: 1201px) {
			display: block;
		}
	}

	/* Mobile FAB: fixed bottom-right; hidden on desktop */
	.toc-fab {
		position: fixed;
		bottom: 1.5rem;
		right: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: var(--radius-full);
		background: var(--color-accent);
		color: var(--color-bg);
		border: none;
		cursor: pointer;
		z-index: 50;
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 0.85;
		}

		@media (min-width: 1201px) {
			display: none;
		}
	}

	.toc-title {
		font-size: var(--font-size-h3);
		margin: 0 0 var(--space-xs);
		font-weight: 400;
		font-family: var(--font-heading);
		color: var(--color-text);
	}

	.toc-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.toc-item {
		a {
			display: block;
			width: fit-content;
			font-size: var(--font-size-lg);
			color: var(--color-text);
			opacity: 0.85;
			text-decoration: none;
			border-left: 2px solid transparent;
			padding: 0.2em 0 0.2em 0.5rem;
			transition:
				color 0.2s ease,
				opacity 0.2s ease,
				border-left-color 0.2s ease;
			line-height: 1.4;

			&:hover {
				opacity: 1;
				color: var(--color-text);
			}

			&.active {
				color: var(--color-accent);
				opacity: 1;
				border-left-color: var(--color-accent);
			}
		}

		&[data-level='3'] a {
			padding-left: 1.25rem;
		}

		&[data-level='4'] a {
			padding-left: 2rem;
		}
	}

	/* Mobile overlay */
	.toc-overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;

		@media (min-width: 1201px) {
			display: none;
		}
	}

	.toc-backdrop {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.35);
		backdrop-filter: blur(2px);
		border: none;
		cursor: default;
		padding: 0;
	}

	.toc-panel {
		position: relative;
		z-index: 1;
		background: var(--color-bg-deep);
		border-top: 1px solid var(--color-border);
		border-radius: var(--radius-lg) var(--radius-lg) 0 0;
		padding: var(--space-md);
		max-height: 70vh;
		overflow-y: auto;
	}

	.toc-panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--space-xs);

		.toc-title {
			margin: 0;
		}

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			background: none;
			border: none;
			cursor: pointer;
			color: var(--color-text-muted);
			padding: 0.25rem;
			border-radius: var(--radius-sm);
			transition: color 0.2s ease;

			&:hover {
				color: var(--color-text);
			}
		}
	}
</style>
