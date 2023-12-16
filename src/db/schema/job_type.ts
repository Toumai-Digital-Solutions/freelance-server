import { sql } from 'drizzle-orm';
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

const jobTypes = pgTable('job_types', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  created_at: timestamp('created_at')
    .notNull()
    .default(sql`now()`),
});

export default jobTypes;
