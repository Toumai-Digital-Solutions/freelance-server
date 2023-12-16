import { sql } from 'drizzle-orm';
import { integer, timestamp, unique } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import jobs from './job';
import specializations from './specialization';

const jobToSpecializations = pgTable(
  'job_to_specializations',
  {
    job_id: integer('job_id')
      .notNull()
      .references(() => jobs.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    specializations_id: integer('specializations_id')
      .notNull()
      .references(() => specializations.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    created_at: timestamp('created_at')
      .notNull()
      .default(sql`now()`),
  },
  (table) => ({
    unique: unique().on(table.job_id, table.specializations_id),
  }),
);
export default jobToSpecializations;
