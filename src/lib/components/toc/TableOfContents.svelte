<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut, cubicIn } from 'svelte/easing';
	import { List, X } from '@lucide/svelte';
	import type { TocHeading } from '$lib/utils/toc';
	import { Card } from '$lib/components/ui/card';

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

	function handleAnchorClick(id: string, e: MouseEvent) {
		e.preventDefault();
		activeId = id;
		mobileOpen = false;
		history.pushState(null, '', `#${id}`);
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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
			<Card>
				<p class="toc-title">Table of Contents</p>
				<ol class="toc-list">
					{#each items as heading (heading.id)}
						<li class="toc-item" data-level={heading.level}>
							<a
								href="#{heading.id}"
								class:active={activeId === heading.id}
								onclick={(e) => handleAnchorClick(heading.id, e)}
							>
								{heading.text}
							</a>
						</li>
					{/each}
				</ol>
			</Card>
		</div>

		<!-- Mobile FAB -->
		<button class="toc-fab" aria-label="Open table of contents" onclick={() => (mobileOpen = true)}>
			<List size={20} />
		</button>

		<!-- Mobile overlay / bottom sheet -->
		{#if mobileOpen}
			<div class="toc-overlay" role="dialog" aria-modal="true" aria-label="Table of contents">
				<button
					class="toc-backdrop"
					onclick={close}
					aria-label="Close table of contents"
					in:fade={{ duration: 250 }}
					out:fade={{ duration: 200 }}
				></button>
				<div
					class="toc-panel"
					in:fly={{ y: 400, duration: 350, easing: cubicOut }}
					out:fly={{ y: 400, duration: 250, easing: cubicIn }}
				>
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
									onclick={(e) => handleAnchorClick(heading.id, e)}
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
