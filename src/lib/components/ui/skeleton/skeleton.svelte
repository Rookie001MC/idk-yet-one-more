<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className = '', ...restProps }: HTMLAttributes<HTMLDivElement> = $props();

	const skeletonClasses = $derived(['skeleton', className].filter(Boolean).join(' '));
</script>

<div data-slot="skeleton" {...restProps} class={skeletonClasses} aria-hidden="true"></div>

<style lang="scss">
	.skeleton {
		position: relative;
		display: block;
		overflow: hidden;
		background:
			linear-gradient(135deg, rgba(0, 164, 203, 0.18), transparent 38%),
			color-mix(in srgb, var(--color-bg-light) 82%, var(--color-contrast) 18%);
		border-radius: var(--radius-md);
	}

	.skeleton::after {
		content: '';
		position: absolute;
		inset: 0;
		transform: translateX(-100%);
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.16), transparent);
		animation: skeleton-shimmer 1.45s ease-in-out infinite;
	}

	@keyframes skeleton-shimmer {
		to {
			transform: translateX(100%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.skeleton::after {
			animation: none;
			transform: none;
			opacity: 0.18;
		}
	}
</style>
