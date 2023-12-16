import {
  boolean,
  doublePrecision,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { experienceLevel, status } from './enum';
import users from './users';
import countries from './countries';
import cities from './cities';
import entreprises from './entreprises';
import jobTypes from './job_type';
import currencies from './currencies';

const jobs = pgTable('jobs', {
  id: serial('id').primaryKey().notNull(),
  user_id: integer('user_id')
    .references(() => users.id)
    .notNull(),
  entreprise_id: integer('entreprise_id').references(() => entreprises.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),

  job_type_id: integer('job_type_id').references(() => jobTypes.id),
  salary: doublePrecision('salary'),
  currency_id: integer('currency_id').references(() => currencies.id),
  country_id: integer('country_id').references(() => countries.id),
  city_id: integer('city_id').references(() => cities.id),
  status: status('status').notNull().default('active'),
  is_remote: boolean('is_remote').default(false),
  is_featured: boolean('is_featured').default(false),
  is_urgent: boolean('is_urgent').default(false),
  is_applicable: boolean('is_applicable').default(true),
  available_until: timestamp('available_until'),
  experience: experienceLevel('experience'),
  created_at: timestamp('created_at')
    .notNull()
    .default(sql`now()`),
  updated_at: timestamp('updated_at')
    .notNull()
    .default(sql`now()`),
  status_changed_at: timestamp('status_changed_at'),
});

export default jobs;
