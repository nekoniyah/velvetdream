<script lang="ts">
	import { onMount } from 'svelte';
	import type { User } from '@prisma/client';
	import { io, Socket } from 'socket.io-client';

	let users: User[] = [];
	let error = '';
	let socket: Socket;

	onMount(async () => {
		try {
			const response = await fetch('/api/users');
			users = await response.json();

			socket = io({
				auth: {
					token: localStorage.getItem('token')
				},
				transports: ['websocket', 'polling'],
				reconnection: true,
				reconnectionAttempts: 5
			});

			socket.on('connect', () => {
				console.log('Socket.IO connected successfully');
				console.log('Socket ID:', socket.id);
			});

			socket.on('connect_error', (error) => {
				console.error('Socket.IO connection error:', error);
				error = 'Failed to connect to server';
			});

			socket.on('disconnect', (reason) => {
				console.log('Socket.IO disconnected:', reason);
			});

			socket.on('user_banned', (userId: string) => {
				users = users.map((user) => (user.id === userId ? { ...user, isBanned: true } : user));
			});
		} catch (err) {
			error = 'Failed to load users';
		}
	});

	async function toggleBan(user: User) {
		try {
			const response = await fetch(`/api/users/${user.id}/ban`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					isBanned: !user.isBanned
				})
			});

			if (response.ok) {
				users = users.map((u) => (u.id === user.id ? { ...u, isBanned: !u.isBanned } : u));
				if (!user.isBanned) {
					socket.emit('ban_user', user.id);
				}
			} else {
				error = 'Failed to update user status';
			}
		} catch (err) {
			error = 'Failed to update user status';
		}
	}

	async function updateRole(user: User, role: 'USER' | 'MODERATOR' | 'ADMIN') {
		try {
			const response = await fetch(`/api/users/${user.id}/role`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ role })
			});

			if (response.ok) {
				users = users.map((u) => (u.id === user.id ? { ...u, role } : u));
			} else {
				error = 'Failed to update user role';
			}
		} catch (err) {
			error = 'Failed to update user role';
		}
	}

	function handleRoleChange(event: Event, user: User) {
		const select = event.target as HTMLSelectElement;
		if (select) {
			updateRole(user, select.value as 'USER' | 'MODERATOR' | 'ADMIN');
		}
	}
</script>

<div class="admin-dashboard">
	<h2>User Management</h2>

	<div class="users">
		{#each users as user}
			<div class="user">
				<div class="user-info">
					<span class="username">{user.username}</span>
					<span class="role">{user.role}</span>
					<span class="status {user.isBanned ? 'banned' : ''}">
						{user.isBanned ? 'Banned' : 'Active'}
					</span>
				</div>

				<div class="actions">
					<button class="ban-button" on:click={() => toggleBan(user)}>
						{user.isBanned ? 'Unban' : 'Ban'}
					</button>

					<select value={user.role} on:change={(e) => handleRoleChange(e, user)}>
						<option value="USER">User</option>
						<option value="MODERATOR">Moderator</option>
						<option value="ADMIN">Admin</option>
					</select>
				</div>
			</div>
		{/each}
	</div>

	{#if error}
		<div class="error">{error}</div>
	{/if}
</div>

<style>
	.admin-dashboard {
		padding: 1rem;
	}

	.users {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.user {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.username {
		font-weight: bold;
	}

	.role {
		padding: 0.25rem 0.5rem;
		background-color: #e9ecef;
		border-radius: 4px;
		font-size: 0.8rem;
	}

	.status {
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.8rem;
	}

	.status.banned {
		background-color: #dc3545;
		color: white;
	}

	.actions {
		display: flex;
		gap: 0.5rem;
	}

	button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.ban-button {
		background-color: #dc3545;
		color: white;
	}

	.ban-button:hover {
		background-color: #c82333;
	}

	select {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.error {
		color: red;
		margin-top: 0.5rem;
	}
</style>
