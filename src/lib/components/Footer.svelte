<script lang="ts">
	import siteConfig from '$lib/config';
	import { resolve } from '$app/paths';

	const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="footer-container">
		<div class="footer-grid">
			<!-- Left Column -->
			<div class="footer-left">
				<div class="site-title font-heading">{siteConfig.name}</div>
				<div class="social-links">
					{#each Object.values(siteConfig.social) as social (social.name)}
						{@const Icon = social.icon}
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve These are outbound links -->
						<a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
							<Icon></Icon>
						</a>
					{/each}
				</div>
			</div>

			<!-- Right Column -->
			<div class="footer-right">
				<div class="nav-column">
					{#each siteConfig.leftFooterMenu as menu (menu.label)}
						<a href={resolve(menu.path)} class="footer-link">{menu.label}</a>
					{/each}
				</div>
				<div class="nav-column">
					{#each siteConfig.rightFooterMenu as menu (menu.label)}
						<a href={resolve(menu.path)} class="footer-link">{menu.label}</a>
					{/each}
				</div>
			</div>
		</div>

		<div class="footer-bottom">
			<p>&copy; {currentYear}. Rookie's Blog. Built with SvelteKit.</p>
		</div>
	</div>
</footer>

<style lang="scss">
	.footer {
		background-color: var(--color-bg);
		border-top: 1px solid var(--color-border);
		padding: var(--space-xl) 0;
	}

	.footer-container {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-sm);
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-xl);
	}

	.footer-left {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.site-title {
		font-size: var(--font-size-h3);
		font-weight: 400;
	}

	.social-links {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		margin-top: var(--space-sm);

		a {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background-color: var(--color-bg-light);
			color: var(--color-text);
			transition:
				background-color 0.2s ease,
				color 0.2s ease;

			&:hover {
				background-color: var(--color-text);
				color: var(--color-bg);
			}
		}
	}

	.footer-right {
		display: flex;
		gap: var(--space-xl);
		justify-content: flex-end;
	}

	.nav-column {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.footer-link {
		color: var(--color-text-muted);
		text-decoration: none;
		transition: color 0.2s ease;
		font-size: var(--font-size-body);

		&:hover {
			color: var(--color-text);
		}
	}

	.footer-bottom {
		margin-top: var(--space-xl);
		padding-top: var(--space-md);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
	}

	@media (max-width: 768px) {
		.footer-grid {
			grid-template-columns: 1fr;
			gap: var(--space-lg);
		}

		.footer-right {
			justify-content: flex-start;
			gap: var(--space-md);
		}
	}
</style>
