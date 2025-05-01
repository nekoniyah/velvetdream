import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST']
	}
});

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Socket.IO event handlers
io.on('connection', (socket) => {
	console.log('User connected:', socket.handshake.auth.username);

	let usernames = [];

	usernames.push(socket.handshake.auth.username);

	if (usernames.find((username) => username === socket.handshake.auth.username)) {
		socket.disconnect();
	}

	// Send message
	socket.on('message', async (data) => {
		await prisma.message.create({
			data: {
				content: data.content,
				username: socket.handshake.auth.username
			}
		});

		let messages = await prisma.message.findMany();
		io.emit('update_messages', messages);
	});

	socket.on('get_messages', async () => {
		let messages = await prisma.message.findMany();
		io.emit('update_messages', messages);
	});

	socket.on('delete_message', async (data) => {
		await prisma.message
			.delete({
				where: {
					id: data.id
				}
			})
			.then(async () => {
				let messages = await prisma.message.findMany();
				io.emit('update_messages', messages);
			})
			.catch((error) => {
				console.error('Failed to delete message:', error);
			});
	});

	socket.on('disconnect', () => {
		console.log('User disconnected:', socket.handshake.auth.username);
	});
});

// API routes
app.get('/discord', (req, res) => {
	res.redirect('https://discord.gg/RAKqUDkgaJ');
});

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		{
			name: 'socket-io',
			configureServer(server) {
				try {
					// Start Socket.IO server on port 3001
					httpServer.listen(3001, () => {
						console.log('Socket.IO server running on port 3001');
						console.log('CORS configured for origin:', 'http://localhost:3000');
					});

					// Add error handling
					httpServer.on('error', (error) => {
						console.error('Socket.IO server error:', error);
					});
				} catch (error) {
					console.error('Failed to start Socket.IO server:', error);
				}
			}
		}
	],
	server: {
		port: 3000,
		proxy: {
			'/socket.io': {
				target: 'http://localhost:3001',
				ws: true,
				changeOrigin: true
			}
		}
	},
	test: {
		workspace: [
			{
				extends: './vite.config.ts',
				plugins: [svelteTesting()],
				test: {
					name: 'client',
					environment: 'jsdom',
					clearMocks: true,
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
