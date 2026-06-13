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
