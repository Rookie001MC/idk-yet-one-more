<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children?: Snippet;
	}

	let { children, class: className = '', ...rest }: Props = $props();
</script>

<div class="admonition-content {className}" {...rest}>
	{@render children?.()}
</div>

<style>
	.admonition-content {
		line-height: 1.6;
	}
	
	.admonition-content :global(p:last-child) {
		margin-bottom: 0;
	}
</style>
