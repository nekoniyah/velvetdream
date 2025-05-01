import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from './$types';

const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ params }) => {
	try {
		const messages = await prisma.message.findMany({
			where: {
				roomId: params.id,
				isDeleted: false
			},
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
		});

		return json(messages);
	} catch (error) {
		return json({ error: 'Failed to fetch messages' }, { status: 500 });
	}
};
