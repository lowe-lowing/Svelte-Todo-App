import { db } from '$lib/server/db';
import { todoTable } from '$lib/server/schema';
import { asc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const todos = await db.select().from(todoTable).orderBy(asc(todoTable.id));
	return { todos };
}) satisfies PageServerLoad;

export const actions = {
	addtodo: async function ({ cookies, request }) {
		const data = await request.formData();
		const name = data.get('todoName') as string;

		const newTodo = await db.insert(todoTable).values({ name }).returning();

		return { success: true, newTodo };
	},
	toggleTodo: async function ({ cookies, request }) {
		const data = await request.formData();
		const completed = data.get('completed') === 'true';
		const todoId = data.get('todoId') as string;

		await db
			.update(todoTable)
			.set({ completed })
			.where(eq(todoTable.id, parseInt(todoId)));

		return { success: true };
	},
	deleteTodo: async function ({ cookies, request }) {
		const data = await request.formData();
		const todoId = data.get('todoId') as string;

		await db.delete(todoTable).where(eq(todoTable.id, parseInt(todoId)));

		return { success: true };
	}
};
