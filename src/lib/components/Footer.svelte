<script lang="ts">
	import siteConfig from '$lib/config';
	import { resolve } from '$app/paths';

	const currentYear = new Date().getFullYear();
	const commitHash = import.meta.env.COMMIT_HASH;
	const shortCommitHash = commitHash ? commitHash.slice(0, 7) : '';
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
			<p>&copy; {currentYear}. nhqthang. Built with SvelteKit, hosted on Cloudflare.</p>
			{#if shortCommitHash}
				<a
					class="footer-commit"
					href={'https://github.com/Rookie001MC/idk-yet-one-more/commit/' + shortCommitHash}
					><code>{shortCommitHash}</code></a
				>
			{/if}
		</div>
	</div>
</footer>
