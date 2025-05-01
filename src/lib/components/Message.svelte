<script lang="ts">
	import type { Socket } from 'socket.io-client';
	import { onMount } from 'svelte';

	export let message: {
		content: string;
		username: string;
		createdAt: string;
		id: string;
	};

	export let socket: Socket;

	onMount(() => {
		let username = localStorage.getItem('username');
		const cross = document.querySelector(`#${message.id}`)!;
		cross.addEventListener('click', () => {
			if (username === message.username) {
				socket.emit('delete_message', message);
			} else {
				alert("Vous n'avez pas les droits pour supprimer ce message");
			}
		});
	});
</script>

<div class="message">
	<div class="left">
		<div class="avatar">
			<img src="/avatar.png" alt="avatar" />
		</div>
		<div class="main">
			<p>{message.content}</p>
			<p>{message.username}</p>
		</div>
	</div>
	<div class="date">
		<p>{message.createdAt}</p>
		<div class="cross" id={message.id}>
			Delete <i class="fa-solid fa-xmark"></i>
		</div>
	</div>
</div>

<style lang="scss">
	.message {
		background-color: #f0f0f0;
		padding: 10px;
		border-radius: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.left {
		display: flex;
		gap: 5px;
		align-items: center;

		.avatar img {
			width: 30px;
			height: 30px;
			border-radius: 50%;
		}
	}

	.main {
		display: flex;
		flex-direction: column;
		gap: 5px;

		p {
			margin: 0;
		}

		p:first-child {
			font-weight: bold;
		}

		p:last-child {
			font-size: 0.8rem;
			color: #666;
		}
	}

	.cross {
		cursor: pointer;
	}

	.date {
		font-size: 0.8rem;
		color: #666;
	}
</style>
