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
	<meta property="og:url" content="https://www.velvetdream.com/" />
	<meta property="og:title" content="VelvetDream - Ne manquez pas la diversité !" />
	<meta
		property="og:description"
		content="VelvetDream®, studio et maison d'édition de jeux de société et vidéoludiques."
	/>
	<meta property="og:image" content="https://www.velvetdream.com/logo.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://www.velvetdream.com/" />
	<meta property="twitter:title" content="VelvetDream - Ne manquez pas la diversité !" />
	<meta
		property="twitter:description"
		content="VelvetDream®, studio et maison d'édition de jeux de société et vidéoludiques."
	/>
	<meta property="twitter:image" content="https://www.velvetdream.com/logo.png" />

	<!-- Additional Meta Tags -->
	<meta name="theme-color" content="#ffffff" />
	<meta name="robots" content="index, follow" />
	<meta name="language" content="English" />
	<meta name="revisit-after" content="7 days" />
	<meta name="generator" content="SvelteKit" />

	<!-- Favicon -->
	<link rel="icon" type="image/png" href="/favicon.png" />
</svelte:head>

<Navbar />

{@render children()}
