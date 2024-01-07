import { sql } from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/pg-core';

import sectors from './sectors';

const specializations = pgTable(
  'specializations',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    sector_id: integer('sector_id')
      .references(() => sectors.id)
      .notNull(),
    created_at: timestamp('created_at')
      .notNull()
      .default(sql`now()`),
  },
  (table) => ({
    unique: unique().on(table.name, table.sector_id),
  }),
);
export default specializations;
