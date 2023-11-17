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
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  entrepriseId: integer('entreprise_id').references(() => entreprises.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),

  jobTypeId: integer('job_type_id').references(() => jobTypes.id),
  salary: doublePrecision('salary'),
  currencyId: integer('currency_id').references(() => currencies.id),
  countryId: integer('country_id').references(() => countries.id),
  cityId: integer('city_id').references(() => cities.id),
  status: status('status').notNull().default('active'),
  isRemote: boolean('is_remote').default(false),
  isFeatured: boolean('is_featured').default(false),
  isUrgent: boolean('is_urgent').default(false),
  isApplicable: boolean('is_applicable').default(true),
  availableUntil: timestamp('available_until'),
  experience: experienceLevel('experience'),
  createdAt: timestamp('created_at')
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp('updated_at')
    .notNull()
    .default(sql`now()`),
  statusChangedAt: timestamp('status_changed_at'),
});

export default jobs;
