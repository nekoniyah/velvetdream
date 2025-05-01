import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from './$types';

const prisma = new PrismaClient();

export const GET: RequestHandler = async () => {
	try {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				username: true,
				role: true,
				isBanned: true,
				createdAt: true
			}
		});
		return json(users);
	} catch (error) {
		return json({ error: 'Failed to fetch users' }, { status: 500 });
	}
};
