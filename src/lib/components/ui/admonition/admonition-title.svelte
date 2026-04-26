<script lang="ts">
	import { getContext } from 'svelte';
	import { Info, Lightbulb, CircleAlert, TriangleAlert, OctagonAlert } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { AdmonitionVariant } from './admonition-root.svelte';

	interface Props extends HTMLAttributes<HTMLHeadingElement> {
		children?: Snippet;
	}

	let { children, class: className = '', ...rest }: Props = $props();

	const getVariant = getContext<() => AdmonitionVariant>('admonition-variant');
	const variant = $derived(getVariant());

	const icons = {
		note: Info,
		tip: Lightbulb,
		important: CircleAlert,
		warning: TriangleAlert,
		caution: OctagonAlert
	};

	const labels = {
		note: 'Note',
		tip: 'Tip',
		important: 'Important',
		warning: 'Warning',
		caution: 'Caution'
	};

	const Icon = $derived(icons[variant]);
	const label = $derived(labels[variant]);
</script>

<div class="admonition-header {className}" {...rest}>
	<Icon size={16} class="admonition-icon" />
	<span class="admonition-title">
		{#if children}
			{@render children()}
		{:else}
			{label}
		{/if}
	</span>
</div>

<style>
	.admonition-header {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		margin-bottom: var(--space-xs);
		color: var(--admonition-color);
		font-weight: 600;
		text-transform: uppercase;
		font-size: 1.1rem;
		letter-spacing: 0.05em;
	}

	.admonition-icon {
		flex-shrink: 0;
	}
</style>
