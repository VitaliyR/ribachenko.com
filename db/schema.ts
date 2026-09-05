import { boolean, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const wishlistItems = pgTable('wishlist_items', {
  id: serial().primaryKey(),
  category: text().notNull(),
  categoryPosition: integer('category_position').notNull().default(0),
  icon: text().notNull(),
  title: text().notNull(),
  url: text().notNull(),
  hidden: boolean().notNull().default(false),
  status: text(),
  position: integer().notNull().default(0)
});
