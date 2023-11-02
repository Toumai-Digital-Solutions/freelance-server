import { sql } from 'drizzle-orm';
import { integer, timestamp, unique } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import jobs from './job';
import specializations from './specialization';

const jobToSpecializations = pgTable(
  'job_to_specializations',
  {
    jobId: integer('job_id')
      .notNull()
      .references(() => jobs.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    specializationsId: integer('specializations_id')
      .notNull()
      .references(() => specializations.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    createdAt: timestamp('created_at')
      .notNull()
      .default(sql`now()`),
  },
  (table) => ({
    unique: unique().on(table.jobId, table.specializationsId),
  }),
);
export default jobToSpecializations;
