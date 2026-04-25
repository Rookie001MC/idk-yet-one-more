<script lang="ts">
	import { SiFacebook, SiInstagram, SiGithub, SiBluesky } from '@icons-pack/svelte-simple-icons';

	import { resolve } from '$app/paths';

	const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="footer-container">
		<div class="footer-grid">
			<!-- Left Column -->
			<div class="footer-left">
				<div class="site-title font-heading">Rookie's Blog</div>
				<div class="social-links">
					<a
						href="https://facebook.com/realrookie001"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Facebook"
					>
						<SiFacebook />
					</a>
					<a
						href="https://instagram.com/realrookie001"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
					>
						<SiInstagram />
					</a>
					<a
						href="https://github.com/rookie001mc"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
					>
						<SiGithub />
					</a>
					<a
						href="https://bsky.app/profile/itsrookienguyen.me"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Bluesky"
					>
						<SiBluesky />
					</a>
				</div>
			</div>

			<!-- Right Column -->
			<div class="footer-right">
				<div class="nav-column">
					<a href={resolve('/')} class="footer-link">Home</a>
					<a href={resolve('/blog')} class="footer-link">Blog</a>
					<a href={resolve('/contact')} class="footer-link">Contact</a>
				</div>
				<div class="nav-column">
					<a href={resolve('/privacy-policy')} class="footer-link">Privacy Policy</a>
				</div>
			</div>
		</div>

		<div class="footer-bottom">
			<p>&copy; {currentYear}. Rookie's Blog. Replicated from WordPress with SvelteKit.</p>
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
		padding: 0 var(--space-md);
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
