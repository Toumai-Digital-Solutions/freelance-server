import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import currencies from './currencies';

const countries = pgTable('countries', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  code: varchar('code', { length: 10 }).notNull(),
  phone_code: varchar('phone_code', { length: 10 }).notNull(),
  currency_id: integer('currency_id')
    .references(() => currencies.id)
    .notNull(),
  created_at: timestamp('created_at')
    .notNull()
    .default(sql`now()`),
  updated_at: timestamp('updated_at')
    .notNull()
    .default(sql`now()`),
});

export default countries;
