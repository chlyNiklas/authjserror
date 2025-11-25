import { relations, sql } from 'drizzle-orm';
import { integer, pgTable, primaryKey, real, text, uuid } from 'drizzle-orm/pg-core';
import { users } from './user';

export const aktis = pgTable('akti', {
	id: uuid()
		.default(sql`gen_random_uuid()`)
		.primaryKey(),
	title: text().notNull(),
	summary: text().notNull(),
	body: text().notNull(),
	author: text('user_id')
		.notNull()
		.references(() => users.id),
	version: integer('version').notNull().default(1)
});

export const ratings = pgTable('rating', {
	id: uuid()
		.default(sql`gen_random_uuid()`)
		.primaryKey(),
	aktiId: uuid()
		.notNull()
		.references(() => aktis.id, { onDelete: 'cascade' }),
	userId: text()
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	rating: real().notNull(),
	comment: text(),
	aktiVersion: integer('akti_version').notNull()
});

export const aktisRelations = relations(aktis, ({ one }) => ({
	author: one(users, {
		fields: [aktis.author],
		references: [users.id]
	})
}));

export const ratingsRelations = relations(ratings, ({ one }) => ({
	akti: one(aktis, {
		fields: [ratings.aktiId],
		references: [aktis.id]
	}),
	user: one(users, {
		fields: [ratings.userId],
		references: [users.id]
	})
}));
