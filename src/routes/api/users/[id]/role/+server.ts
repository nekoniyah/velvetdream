import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from './$types';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ params, request }) => {
	try {
		const { role } = await request.json();

		if (!['USER', 'MODERATOR', 'ADMIN'].includes(role)) {
			return json({ error: 'Invalid role' }, { status: 400 });
		}

		const user = await prisma.user.update({
			where: { id: params.id },
			data: { role }
		});

		return json(user);
	} catch (error) {
		return json({ error: 'Failed to update user role' }, { status: 500 });
	}
};
