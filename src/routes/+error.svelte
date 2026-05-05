<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	// Get the error code and message from the page store
	const errorCode = $derived(page.status ?? 500);
	const errorMessage = $derived(page.error?.message ?? 'Internal Server Error');

	// List of messages that tell the user what to do depending on the error code
	const errorSubtitle: Record<number, string> = {
		404: 'The page you are looking for does not exist.',
		500: 'Something went wrong on our end.',
		503: 'The service is unavailable. Please try again later.'
	};

	// Reset the page on button click
	const reset = () => {
		// Try to reload the page
		location.reload();
	};
</script>

<div class="error-page">
	<div class="error-content">
		<h1 class="error-code">{errorCode}</h1>
		<h2 class="error-title">Oops!</h2>
		<p class="error-message">{errorSubtitle[errorCode] ?? 'Something went wrong.'}</p>

		{#if import.meta.env.DEV}
			<div class="error-stack-trace-wrapper">
				<code class="error-code-development">{errorMessage}</code>
			</div>
		{/if}

		<div class="error-actions">
			<a href={resolve('/')} class="btn btn-primary">Go Home</a>
			<button class="btn btn-secondary" onclick={reset}>Try Again</button>
		</div>
	</div>
</div>

<style lang="scss">
	.error-page {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 70vh;
		padding: var(--space-xl) var(--space-sm);
		text-align: center;
	}

	.error-content {
		max-width: 600px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.error-code {
		font-size: 8rem;
		font-weight: 700;
		line-height: 1;
		margin: 0;
		letter-spacing: -0.05em;
	}

	.error-title {
		font-size: var(--font-size-h2);
		font-weight: 600;
		margin: 0;
	}

	.error-message {
		font-size: var(--font-size-lg);
		color: var(--color-text);
		margin: 0;
	}

	.error-code-development {
		font-size: var(--font-size-body);
		color: var(--color-text-muted);
		margin: var(--space-sm) 0 var(--space-lg);
	}

	.error-actions {
		display: flex;
		gap: var(--space-sm);
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-xs);
		padding: 0.75em 1.5em;
		font-size: var(--font-size-body);
		font-weight: 500;
		text-decoration: none;
		border-radius: var(--radius-md);
		transition:
			background-color 0.2s ease,
			color 0.2s ease,
			border-color 0.2s ease;
		cursor: pointer;
	}

	.btn-primary {
		background-color: var(--color-accent);
		color: var(--color-text-on-accent);
		border: 2px solid var(--color-accent);

		&:hover {
			background-color: var(--color-accent-hover);
			border-color: var(--color-accent-hover);
			text-decoration: none;
		}
	}

	.btn-secondary {
		background-color: transparent;
		color: var(--color-text);
		border: 2px solid var(--color-border);

		&:hover {
			border-color: var(--color-text-muted);
			text-decoration: none;
		}
	}

	@media (max-width: 768px) {
		.error-code {
			font-size: 5rem;
		}

		.error-title {
			font-size: var(--font-size-h3);
		}

		.error-message {
			font-size: var(--font-size-md);
		}
	}
</style>
