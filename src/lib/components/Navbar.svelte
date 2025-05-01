<script lang="ts">
	import { onMount } from 'svelte';

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	// Close menu when clicking outside
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-toggle')) {
			isMenuOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<nav>
	<div class="logo">
		<a href="/">
			<img src="/logo.png" alt="VelvetDream Logo" />
		</a>
	</div>

	<button class="menu-toggle" on:click={toggleMenu} aria-label="Toggle menu">
		<i class={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
	</button>

	<div class="links" class:open={isMenuOpen}>
		<a href="/">Accueil</a>
		<a href="/about">À propos</a>
		<a href="/contact">Contact</a>
		<a href="/discord">Discord</a>
		<a href="/chat">Chat</a>
		<a href="https://linktr.ee/nekoniyah">Linktree</a>
	</div>
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80px;
		padding-inline: 2rem;
		background-color: var(--secondary-gold);
		position: relative;
		z-index: 100;
	}

	.logo {
		z-index: 101;
	}

	.logo img {
		height: 60px;
		width: auto;
	}

	.logo a {
		display: block;
	}

	.links {
		display: flex;
		gap: 2rem;
	}

	.links a {
		color: var(--primary);
		text-decoration: none;
		font-size: 1.2rem;
		font-weight: 600;
		transition: color 0.2s ease;
	}

	.links a:hover {
		color: var(--primary-dark);
	}

	.menu-toggle {
		display: none;
		background: none;
		border: none;
		color: var(--primary);
		font-size: 1.5rem;
		cursor: pointer;
		z-index: 101;
	}

	@media (max-width: 768px) {
		.menu-toggle {
			display: block;
		}

		.links {
			position: fixed;
			top: 0;
			right: -100%;
			width: 70%;
			height: 100vh;
			background-color: var(--secondary-gold);
			flex-direction: column;
			justify-content: center;
			align-items: center;
			transition: right 0.3s ease;
			z-index: 100;
		}

		.links.open {
			right: 0;
		}

		.links a {
			font-size: 1.5rem;
			margin: 1rem 0;
		}
	}

	@media (max-width: 480px) {
		nav {
			padding-inline: 1rem;
		}

		.logo img {
			height: 50px;
		}

		.links {
			width: 100%;
		}
	}
</style>
