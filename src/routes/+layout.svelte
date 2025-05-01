<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.scss';

	let { children } = $props();
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>VelvetDream - Your Dream Website</title>
	<meta name="title" content="VelvetDream - Your Dream Website" />
	<meta
		name="description"
		content="Welcome to VelvetDream, your premier destination for web development and design services."
	/>
	<meta name="keywords" content="web development, design, portfolio, services" />
	<meta name="author" content="VelvetDream" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://velvetdream.com/" />
	<meta property="og:title" content="VelvetDream - Your Dream Website" />
	<meta
		property="og:description"
		content="Welcome to VelvetDream, your premier destination for web development and design services."
	/>
	<meta property="og:image" content="https://velvetdream.com/og-image.jpg" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://velvetdream.com/" />
	<meta property="twitter:title" content="VelvetDream - Your Dream Website" />
	<meta
		property="twitter:description"
		content="Welcome to VelvetDream, your premier destination for web development and design services."
	/>
	<meta property="twitter:image" content="https://velvetdream.com/og-image.jpg" />

	<!-- Additional Meta Tags -->
	<meta name="theme-color" content="#ffffff" />
	<meta name="robots" content="index, follow" />
	<meta name="language" content="English" />
	<meta name="revisit-after" content="7 days" />
	<meta name="generator" content="SvelteKit" />

	<!-- Favicon -->
	<link rel="icon" type="image/png" href="/favicon.png" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</svelte:head>

<Navbar />

{@render children()}
