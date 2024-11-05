import { boolean, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const todoTable = pgTable('todos', {
	id: serial('id').primaryKey(),
	name: varchar('name'),
	completed: boolean('completed').notNull().default(false)
});

export const insertTodoSchema = createInsertSchema(todoTable);
export const selectTodoSchema = createSelectSchema(todoTable);
export const todoIdSchema = selectTodoSchema.pick({ id: true });
export const updateTodoSchema = selectTodoSchema;

export type Todo = z.infer<typeof selectTodoSchema>;
export type NewTodo = z.infer<typeof insertTodoSchema>;
export type TodoId = z.infer<typeof todoIdSchema>['id'];
