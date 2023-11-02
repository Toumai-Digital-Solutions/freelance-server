import { InferSelectModel, sql } from 'drizzle-orm';
import { serial, varchar, boolean } from 'drizzle-orm/pg-core';
import { pgTable, integer, timestamp } from 'drizzle-orm/pg-core';
import { userRole, userStatus } from './enum';
import languages from './languages';
import cities from './cities';
import countries from './countries';

const users = pgTable('users', {
  id: serial('id').primaryKey().notNull(),
  role: userRole('role').notNull(),
  email: varchar('email', { length: 60 }).notNull().unique(),
  username: varchar('username', { length: 24 }),
  password: varchar('password', { length: 256 }),
  phoneNumber: varchar('phone_number', { length: 20 }).unique(),

  status: userStatus('status').notNull().default('active'),
  language: varchar('language', { length: 10 }).references(
    () => languages.code,
  ),
  cityId: integer('city_id').references(() => cities.id),
  countryId: integer('country_id').references(() => countries.id),
  isEmailVerified: boolean('is_email_verified').notNull().default(false),
  isPhoneNumberVerified: boolean('is_phone_number_verified')
    .notNull()
    .default(false),
  registeredAt: timestamp('registered_at')
    .notNull()
    .default(sql`now()`),
  lastLoginAt: timestamp('last_login_at'),
});

export default users;

export type User = InferSelectModel<typeof users>;
