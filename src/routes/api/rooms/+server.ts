import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from './$types';

const prisma = new PrismaClient();

export const GET: RequestHandler = async () => {
	try {
		const rooms = await prisma.room.findMany({
			include: {
				members: true,
				messages: {
					include: {
						user: {
							select: {
								username: true,
								role: true
							}
						}
					},
					orderBy: {
						createdAt: 'asc'
					}
				}
			}
		});
		return json(rooms);
	} catch (error) {
		return json({ error: 'Failed to fetch rooms' }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { name, description } = await request.json();

		if (!name) {
			return json({ error: 'Room name is required' }, { status: 400 });
		}

		const room = await prisma.room.create({
			data: {
				name,
				description,
				creatorId: 'system' // You might want to use the actual user ID here
			},
			include: {
				members: true,
				messages: true
			}
		});

		return json(room);
	} catch (error) {
		return json({ error: 'Failed to create room' }, { status: 500 });
	}
};
