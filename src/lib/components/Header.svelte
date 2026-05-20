<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { resolve } from '$app/paths';
	let isMenuOpen = $state(false);
	import siteConfig from '$lib/config';
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	$effect(() => {
		if (typeof document !== 'undefined') {
			if (isMenuOpen) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = '';
			}
		}
	});
</script>

<header class="header">
	<div class="header-container">
		<a href={resolve('/')} class="site-title font-heading"> Rookie's Blog </a>

		<button
			class="menu-toggle"
			onclick={toggleMenu}
			aria-label="Toggle menu"
			aria-expanded={isMenuOpen}
		>
			<svg
				width="32"
				height="32"
				viewBox="0 0 32 32"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
			>
				{#if isMenuOpen}
					<path d="M8 8L24 24M8 24L24 8" stroke-linecap="round" />
				{:else}
					<path d="M4 10H28M4 22H28" stroke-linecap="round" />
				{/if}
			</svg>
		</button>
	</div>

	{#if isMenuOpen}
		<nav class="mobile-nav" transition:fade={{ duration: 300 }}>
			<div class="mobile-nav-content" in:fly={{ y: 20, duration: 400, delay: 100 }}>
				{#each siteConfig.mainMenu as item (item.path)}
					<a href={resolve(item.path)} class="nav-link" onclick={() => toggleMenu()}>{item.label}</a
					>
				{/each}
			</div>
		</nav>
	{/if}
</header>

<style lang="scss">
	.header {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 100;
	}

	.header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-md) var(--space-sm);
		max-width: 1200px;
		margin: 0 auto;
	}

	.site-title {
		font-size: var(--font-size-h3);
		font-weight: 400;
		color: var(--color-text);
		text-decoration: none;
	}

	.menu-toggle {
		background: none;
		border: none;
		color: var(--color-text);
		cursor: pointer;
		z-index: 101;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.mobile-nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-color: var(--color-bg);
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.mobile-nav-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		align-items: center;
	}

	.nav-link {
		font-family: var(--font-heading);
		font-size: var(--font-size-hero);
		text-decoration: none;
		color: var(--color-text);
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 0.7;
		}
	}
</style>
