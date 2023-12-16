import { sql } from 'drizzle-orm';
import { integer, timestamp, unique } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import jobs from './job';
import tags from './tags';

const jobToTags = pgTable(
  'job_to_tags',
  {
    job_id: integer('job_id')
      .notNull()
      .references(() => jobs.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    tag_id: integer('tag_id')
      .notNull()
      .references(() => tags.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    created_at: timestamp('created_at')
      .notNull()
      .default(sql`now()`),
  },
  (table) => ({
    unique: unique().on(table.job_id, table.tag_id),
  }),
);
export default jobToTags;
