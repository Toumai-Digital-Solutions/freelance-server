import { sql } from 'drizzle-orm';
import {
  integer,
  serial,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

import sectors from './sectors';

const specializations = pgTable(
  'specializations',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    sectorId: integer('sector_id')
      .references(() => sectors.id)
      .notNull(),
    createdAt: timestamp('created_at')
      .notNull()
      .default(sql`now()`),
  },
  (table) => ({
    unique: unique().on(table.name, table.sectorId),
  }),
);
export default specializations;
