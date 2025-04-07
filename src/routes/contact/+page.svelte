<script lang="ts">
	import { FadeIn } from '$lib/components';
	import { onMount } from 'svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	// Social media links
	const socialLinks = [
		{
			name: 'Facebook',
			icon: 'fab fa-facebook',
			url: 'https://www.facebook.com/profile.php?id=61572959908797',
			color: '#1877F2'
		},
		{
			name: 'LinkedIn',
			icon: 'fab fa-linkedin',
			url: 'https://www.linkedin.com/company/104913969',
			color: '#0A66C2'
		},
		{
			name: 'Instagram',
			icon: 'fab fa-instagram',
			url: 'https://instagram.com/velvetdream.off',
			color: '#E4405F'
		}
	];
</script>

<svelte:head>
	<title>Contact | VelvetDream</title>
	<meta name="description" content="Contactez VelvetDream pour toute question ou collaboration." />
</svelte:head>

<div class="contact-container">
	<div class="contact-content">
		<FadeIn>
			<h1>Contactez-nous</h1>
		</FadeIn>

		<FadeIn delay={200}>
			<div class="contact-card">
				<p class="intro-text">
					Nous serions ravis d'entendre parler de vous ! N'hésitez pas à nous contacter pour toute
					question, collaboration ou simplement pour partager votre enthousiasme pour nos projets.
				</p>

				<div class="contact-methods">
					<div class="email-section">
						<h2>Email</h2>
						<a href="mailto:contact@velvetdream.eu" class="email-link">
							<i class="fas fa-envelope"></i>
							contact@velvetdream.eu
						</a>
					</div>

					<div class="social-section">
						<h2>Réseaux sociaux</h2>
						<div class="social-links">
							{#each socialLinks as social}
								<a
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									class="social-link"
									style="--social-color: {social.color}"
								>
									<i class={social.icon}></i>
									<span>{social.name}</span>
								</a>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</FadeIn>

		<FadeIn delay={400}>
			<div class="work-in-progress">
				<p>
					🚧 Cette page est en cours de développement. Plus de fonctionnalités à venir bientôt! 🚧
				</p>
			</div>
		</FadeIn>
	</div>
</div>

<style>
	.contact-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		color: var(--black);
	}

	.contact-content {
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
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--secondary-gold);
		margin-bottom: 1rem;
	}

	.contact-card {
		background-color: rgba(255, 255, 255, 0.7);
		border-radius: 0.5rem;
		padding: 2rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(212, 175, 55, 0.3);
	}

	.intro-text {
		font-size: 1.1rem;
		line-height: 1.6;
		margin-bottom: 2rem;
		text-align: center;
	}

	.contact-methods {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.email-section,
	.social-section {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.email-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.2rem;
		color: var(--secondary-gold);
		text-decoration: none;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		transition: all 0.2s ease;
		background-color: rgba(212, 175, 55, 0.1);
		border: 1px solid rgba(212, 175, 55, 0.3);
	}

	.email-link:hover {
		background-color: rgba(212, 175, 55, 0.2);
		transform: translateY(-2px);
	}

	.social-links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}

	.social-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		border-radius: 0.25rem;
		text-decoration: none;
		color: white;
		background-color: var(--social-color);
		transition: all 0.2s ease;
	}

	.social-link:hover {
		transform: translateY(-3px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
		.contact-container {
			padding: 1rem;
		}

		h1 {
			font-size: 2rem;
		}

		h2 {
			font-size: 1.25rem;
		}

		.contact-card {
			padding: 1.5rem;
		}

		.intro-text {
			font-size: 1rem;
		}

		.email-link {
			font-size: 1rem;
		}

		.social-link {
			padding: 0.5rem 1rem;
		}
	}
</style>
