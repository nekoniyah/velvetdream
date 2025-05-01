import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from './$types';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ params, request }) => {
	try {
		const { isBanned } = await request.json();

		const user = await prisma.user.update({
			where: { id: params.id },
			data: { isBanned }
		});

		return json(user);
	} catch (error) {
		return json({ error: 'Failed to update user ban status' }, { status: 500 });
	}
};
