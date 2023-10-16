import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

const languages = pgTable('languages', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  code: varchar('code', { length: 10 }).notNull().unique(),
});

export default languages;
