<script lang="ts">
	import { FadeIn, HoverCard, Button, Message } from '$lib/components/index';
	import { io, Socket } from 'socket.io-client';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let messages = writable<{ content: string; username: string; createdAt: string; id: string }[]>(
		[]
	);
	let message = $state('');
	let username = $state('');
	let generateId = () => {
		return Math.random().toString(36).substring(2, 15);
	};

	let socket = $state<Socket | null>(null);

	onMount(() => {
		let interval = setInterval(() => {
			if (socket) {
				clearInterval(interval);
			}
			username = localStorage.getItem('username') || generateId();
			if (!localStorage.getItem('username')) {
				localStorage.setItem('username', username);
			}

			socket = io('http://localhost:3001', {
				auth: {
					// svelte-ignore state_referenced_locally
					username
				},
				reconnection: true,
				reconnectionDelay: 1000,
				reconnectionDelayMax: 5000
			});

			socket.on('update_messages', (x) => {
				messages.set(x);
				console.log('update_messages', x);
			});

			socket.emit('get_messages');

			let submitBtn = document.querySelector('.submit-btn');
			submitBtn?.addEventListener('click', () => {
				socket!.emit('message', { content: message, username });
			});
		}, 1000);
	});
</script>

<div class="container">
	<div class="header">
		<FadeIn>
			<h1>Bienvenue sur VelvetDream</h1>
		</FadeIn>
	</div>

	<div class="about-preview">
		<FadeIn delay={200}>
			<div class="about-card">
				<h2>À propos de VelvetDream</h2>
				<p>
					VelvetDream est une maison créative inspirée par la culture japonaise et des univers
					fantastiques enchanteurs. Notre mission est d'offrir des expériences immersives à travers
					des projets variés : jeux de société, jeux vidéo, animés...
				</p>
				<p>
					Chez VelvetDream, nous croyons en la puissance du collectif et de la diversité. Notre
					esthétique mêle influences "fluffy" et "mignonnes" avec des designs élégants et
					captivants.
				</p>
				<div class="cta-container">
					<a href="/about">
						<Button variant="primary">En savoir plus</Button>
					</a>
				</div>
			</div>
		</FadeIn>
	</div>

	{#if socket}
		<div class="chat-container">
			<FadeIn delay={400}>
				<h2>Chat</h2>

				<div class="form">
					<input type="text" placeholder="Message" bind:value={message} />
					<button type="submit" class="submit-btn">Envoyer</button>
				</div>

				<div class="messages">
					{#each $messages as message}
						<Message {message} {socket} />
					{/each}
				</div>
			</FadeIn>
		</div>
	{/if}

	<div class="work-in-progress">
		<FadeIn delay={400}>
			<p>🚧 Site en cours de développement. Plus de contenu à venir bientôt! 🚧</p>
		</FadeIn>
	</div>
</div>

<style lang="scss">
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.header {
		text-align: center;
		margin-bottom: 3rem;

		h1 {
			font-size: 3rem;
			color: var(--secondary-gold);
			font-weight: 700;
		}
	}

	.about-preview {
		margin-bottom: 3rem;
	}

	.about-card {
		background-color: rgba(255, 255, 255, 0.7);
		border-radius: 0.5rem;
		padding: 2rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(212, 175, 55, 0.3);
		max-width: 800px;
		margin: 0 auto;

		h2 {
			font-size: 1.75rem;
			color: var(--secondary-gold);
			margin-bottom: 1rem;
		}

		p {
			font-size: 1.1rem;
			line-height: 1.6;
			margin-bottom: 1rem;
			color: var(--black);
		}
	}

	.cta-container {
		display: flex;
		justify-content: center;
		margin-top: 1.5rem;
	}

	.work-in-progress {
		text-align: center;
		padding: 1rem;
		background-color: rgba(212, 175, 55, 0.1);
		border-radius: 0.5rem;
		border: 1px dashed var(--secondary-gold);
		max-width: 600px;
		margin: 0 auto;

		p {
			font-style: italic;
			color: var(--secondary-gold);
			margin: 0;
		}
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		.header h1 {
			font-size: 2rem;
		}

		.about-card {
			padding: 1.5rem;

			h2 {
				font-size: 1.5rem;
			}

			p {
				font-size: 1rem;
			}
		}
	}
</style>
