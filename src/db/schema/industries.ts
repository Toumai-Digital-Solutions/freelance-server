import { sql } from 'drizzle-orm';
import { serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

const industries = pgTable('entreprise_types', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  icon: varchar('icon', { length: 255 }),
  createdAt: timestamp('created_at')
    .notNull()
    .default(sql`now()`),
});
export default industries;
