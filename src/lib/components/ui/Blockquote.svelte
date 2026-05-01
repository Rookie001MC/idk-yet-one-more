<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLBlockquoteAttributes } from 'svelte/elements';

	interface Props extends HTMLBlockquoteAttributes {
		children?: Snippet;
		cite?: string;
	}

	let { children, cite, class: className = '', ...rest }: Props = $props();
</script>

<blockquote class="blockquote {className}" {cite} {...rest}>
	<p class="blockquote-text">
		{@render children?.()}
	</p>
	{#if cite}
		<footer class="blockquote-cite">
			<cite>{cite}</cite>
		</footer>
	{/if}
</blockquote>

<style lang="scss">
	.blockquote {
		border-left: 3px solid var(--color-accent);
		padding: 0.1em 0 0.1em var(--space-md);
		margin: var(--space-lg) 0;
		font-style: italic;
		font-size: 1.1em;
		color: var(--color-text);
		opacity: 0.9;
	}

	.blockquote-text {
		margin: 0;
		line-height: 1.7;
	}

	.blockquote-cite {
		margin-top: 0.5em;
		font-size: 0.875em;
		font-style: normal;
		opacity: 0.6;

		&::before {
			content: '— ';
		}
	}
</style>
