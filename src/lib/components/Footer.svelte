<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="footer-container">
		<div class="footer-grid">
			<!-- Left Column -->
			<div class="footer-left">
				<div class="site-title font-heading"> Rookie's Blog </div>
				<div class="social-links">
					<a
						href="https://facebook.com/realrookie001"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Facebook"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
							></path></svg
						>
					</a>
					<a
						href="https://instagram.com/realrookie001"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path
								d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
							></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg
						>
					</a>
					<a
						href="https://github.com/rookie001mc"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><path
								d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
							></path></svg
						>
					</a>
					<a
						href="https://bsky.app/profile/itsrookienguyen.me"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Bluesky"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><path
								d="M12 12c-2.4 0-4-2-4-4s1.6-4 4-4 4 2 4 4-1.6 4-4 4zm0 2c-4.4 0-8 3.6-8 8v1h16v-1c0-4.4-3.6-8-8-8z"
							></path></svg
						>
					</a>
				</div>
			</div>

			<!-- Right Column -->
			<div class="footer-right">
				<div class="nav-column">
					<a href="/" class="footer-link">Home</a>
					<a href="/blog" class="footer-link">Blog</a>
					<a href="/contact" class="footer-link">Contact</a>
				</div>
				<div class="nav-column">
					<a href="/privacy-policy" class="footer-link">Privacy Policy</a>
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
