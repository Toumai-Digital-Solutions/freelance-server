import { sql } from 'drizzle-orm';
import { serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

const sectors = pgTable('sectors', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  icon: varchar('icon', { length: 255 }),
  created_at: timestamp('created_at')
    .notNull()
    .default(sql`now()`),
});
export default sectors;
