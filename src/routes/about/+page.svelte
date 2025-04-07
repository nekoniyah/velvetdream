<script>
	import { FadeIn } from '$lib/components';
	import { onMount } from 'svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>À propos | VelvetDream</title>
	<meta
		name="description"
		content="Découvrez VelvetDream, une maison créative inspirée par la culture japonaise et des univers fantastiques enchanteurs."
	/>
</svelte:head>

<div class="about-container">
	<div class="about-content">
		<FadeIn>
			<h1>À propos de VelvetDream</h1>
		</FadeIn>

		<FadeIn delay={200}>
			<div class="intro">
				<p>
					VelvetDream est une maison créative née d'une passion pour l'imaginaire et une esthétique
					qui fusionne la douceur, la diversité et l'élégance. Inspirée à la fois par la culture
					japonaise, notamment les animés, et des univers fantastiques enchanteurs, VelvetDream
					cherche à captiver les cœurs et à éveiller la curiosité.
				</p>
			</div>
		</FadeIn>

		<FadeIn delay={400}>
			<div class="mission">
				<h2>Notre Mission</h2>
				<p>
					Notre mission est d'offrir des expériences immersives et collaboratives à travers des
					projets variés : jeux de société, jeux vidéo, animés... Chaque création s'inscrit dans
					l'univers de Raoronia, un monde riche et vibrant qui incarne nos valeurs : inclusivité,
					créativité et authenticité.
				</p>
			</div>
		</FadeIn>

		<FadeIn delay={600}>
			<div class="values">
				<h2>Nos Valeurs</h2>
				<p>
					Chez VelvetDream, nous croyons en la puissance du collectif et de la diversité. Notre
					esthétique mêle influences "fluffy" et "mignonnes" avec des designs élégants et
					captivants, inspirant un large public tout en honorant nos racines dans la communauté
					LGBT+ et le Furry Fandom. C'est cet équilibre qui permet à VelvetDream de toucher tout le
					monde tout en restant fidèle à son essence.
				</p>
			</div>
		</FadeIn>

		<FadeIn delay={800}>
			<div class="invitation">
				<h2>Rejoignez-nous</h2>
				<p>
					Nous sommes avant tout un lieu où l'imagination n'a pas de limites, où chaque voix peut se
					faire entendre et où l'art raconte des histoires uniques. Rejoignez-nous dans cette
					aventure pour construire, ensemble, des mondes où rêves et créativité s'entrelacent.
				</p>
			</div>
		</FadeIn>

		<FadeIn delay={1000}>
			<div class="work-in-progress">
				<p>🚧 Cette page est en cours de développement. Plus de contenu à venir bientôt! 🚧</p>
			</div>
		</FadeIn>
	</div>
</div>

<style>
	.about-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		color: var(--black);
	}

	.about-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--secondary-gold);
		margin-bottom: 1rem;
		text-align: center;
	}

	h2 {
		font-size: 1.75rem;
		font-weight: 600;
		color: var(--secondary-gold);
		margin-bottom: 1rem;
	}

	.intro,
	.mission,
	.values,
	.invitation {
		background-color: rgba(255, 255, 255, 0.7);
		border-radius: 0.5rem;
		padding: 1.5rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(212, 175, 55, 0.3);
	}

	p {
		font-size: 1.1rem;
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	.work-in-progress {
		text-align: center;
		padding: 1rem;
		background-color: rgba(212, 175, 55, 0.1);
		border-radius: 0.5rem;
		border: 1px dashed var(--secondary-gold);
		margin-top: 1rem;
	}

	.work-in-progress p {
		font-style: italic;
		color: var(--secondary-gold);
		margin: 0;
	}

	@media (max-width: 768px) {
		.about-container {
			padding: 1rem;
		}

		h1 {
			font-size: 2rem;
		}

		h2 {
			font-size: 1.5rem;
		}

		p {
			font-size: 1rem;
		}
	}
</style>
