<script lang="ts" module>
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	export type ButtonVariant =
		| 'default'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'destructive'
		| 'link';
	export type ButtonSize =
		| 'default'
		| 'xs'
		| 'sm'
		| 'lg'
		| 'icon'
		| 'icon-xs'
		| 'icon-sm'
		| 'icon-lg';

	export type ButtonProps = (HTMLButtonAttributes & HTMLAnchorAttributes) & {
		variant?: ButtonVariant;
		size?: ButtonSize;
		label?: string;
		ref?: HTMLElement | null;
	};
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'default',
		size = 'default',
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		disabled,
		label,
		children,
		...restProps
	}: ButtonProps = $props();

	const buttonClasses = $derived(
		`btn btn--variant-${variant} btn--size-${size} ${className || ''}`.trim()
	);
</script>

{#if href}
	<a
		bind:this={ref as HTMLAnchorElement}
		data-slot="button"
		class={buttonClasses}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? 'link' : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
		{#if !children && label}
			{label}
		{/if}
	</a>
{:else}
	<button
		bind:this={ref as HTMLButtonElement}
		data-slot="button"
		class={buttonClasses}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
		{#if !children && label}
			{label}
		{/if}
	</button>
{/if}

<style lang="scss">
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
		transition: all 0.2s ease;
		outline: none;
		user-select: none;
		cursor: pointer;
		font-family: var(--font-heading, inherit);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-decoration: none;
		border: 1px solid transparent;

		&:disabled {
			pointer-events: none;
			opacity: 0.5;
		}

		/* Sizes */
		&--size-default {
			padding: 0.75rem 2rem;
			font-size: 1.25rem;
			border-radius: var(--radius-full);
		}

		&--size-sm {
			padding: 0.5rem 1rem;
			font-size: 0.875rem;
			border-radius: var(--radius-md);
		}

		&--size-lg {
			padding: 1rem 3rem;
			font-size: 1.5rem;
			border-radius: var(--radius-full);
		}

		/* Variants */
		&--variant-outline {
			border: 1px solid var(--color-text);
			color: var(--color-text);
			background-color: transparent;

			&:hover:not(:disabled) {
				background-color: var(--color-text);
				color: var(--color-bg);
			}
		}

		&--variant-default {
			background-color: var(--color-accent);
			color: var(--color-base);
			border-color: var(--color-accent);

			&:hover:not(:disabled) {
				filter: brightness(1.1);
			}
		}

		&--variant-secondary {
			background-color: var(--color-bg-light);
			color: var(--color-text);
			border-color: var(--color-bg-light);

			&:hover:not(:disabled) {
				background-color: var(--color-bg-deep);
			}
		}

		&--variant-ghost {
			background-color: transparent;
			color: var(--color-text);

			&:hover:not(:disabled) {
				background-color: rgba(255, 255, 255, 0.1);
			}
		}
	}
</style>
