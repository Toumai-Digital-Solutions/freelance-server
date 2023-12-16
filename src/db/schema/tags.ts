import { sql } from 'drizzle-orm';
import { serial, varchar, timestamp } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  created_at: timestamp('created_at')
    .notNull()
    .default(sql`now()`),
});

export default tags;
