<script lang="ts">
	import { dev, browser } from '$app/environment';

	const stagingDomain = 'staging.itsrookienguyen.me';

	const isStaging = $derived(browser && window.location.hostname === stagingDomain);
	const isVisible = $derived(dev || isStaging);
	const mode = $derived(dev ? 'dev' : 'staging');

	const message = $derived(`THIS SITE IS IN ${mode === 'dev' ? 'DEVELOPMENT' : 'STAGING'} MODE`);
</script>

{#if isVisible}
	<div
		class="env-banner env-banner--{mode}"
		role="status"
		aria-label="{mode === 'dev' ? 'Development' : 'Staging'} mode active"
	>
		<span class="env-banner__dot" aria-hidden="true"></span>
		<span class="env-banner__label">{message}</span>
	</div>
{/if}

<style>
	.env-banner {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9999;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		user-select: none;
		pointer-events: none;
		animation: blink 2s infinite;
	}

	.env-banner--dev {
		background-color: #f59e0b;
		color: #1c1005;
	}

	.env-banner--staging {
		background-color: #ea580c;
		color: #fff;
	}

	.env-banner__dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		display: inline-block;
		flex-shrink: 0;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.env-banner--dev .env-banner__dot {
		background-color: #92400e;
	}

	.env-banner--staging .env-banner__dot {
		background-color: #fed7aa;
	}
</style>
