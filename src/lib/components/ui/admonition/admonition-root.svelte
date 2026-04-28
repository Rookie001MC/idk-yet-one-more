<script lang="ts" module>
	export type AdmonitionVariant = 'note' | 'tip' | 'important' | 'warning' | 'caution';
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		variant?: AdmonitionVariant;
		children?: Snippet;
	}

	let { variant = 'note', children, class: className = '', ...rest }: Props = $props();

	setContext('admonition-variant', () => variant);

	const colors = {
		note: '#3b82f6',
		tip: '#22c55e',
		important: '#a855f7',
		warning: '#f59e0b',
		caution: '#ef4444'
	};

	const color = $derived(colors[variant]);
</script>

<div class="admonition admonition-{variant} {className}" style:--admonition-color={color} {...rest}>
	{@render children?.()}
</div>

<style>
	.admonition {
		margin: var(--space-md) 0;
		padding: var(--space-md);
		border-radius: var(--radius-md);
		border-left: 4px solid var(--admonition-color);
		background-color: var(--color-bg-light);
		color: var(--color-text);
	}

	/* Variants - backgrounds */
	.admonition-note {
		background-color: rgba(59, 130, 246, 0.1);
	}
	.admonition-tip {
		background-color: rgba(34, 197, 94, 0.1);
	}
	.admonition-important {
		background-color: rgba(168, 85, 247, 0.1);
	}
	.admonition-warning {
		background-color: rgba(245, 158, 11, 0.1);
	}
	.admonition-caution {
		background-color: rgba(239, 68, 68, 0.1);
	}
</style>
