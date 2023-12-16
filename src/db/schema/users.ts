import { InferInsertModel, InferSelectModel, sql } from 'drizzle-orm';
import { serial, varchar, boolean } from 'drizzle-orm/pg-core';
import { pgTable, integer, timestamp } from 'drizzle-orm/pg-core';
import { genre, userRole, userStatus } from './enum';
import languages from './languages';
import cities from './cities';
import countries from './countries';

const users = pgTable('users', {
  id: serial('id').primaryKey().notNull(),
  role: userRole('role').notNull(),

  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 255 }).unique(),
  first_name: varchar('first_name', { length: 255 }),
  last_name: varchar('last_name', { length: 255 }),

  avatar: varchar('avatar', { length: 255 }),
  cover: varchar('cover', { length: 255 }),
  about: varchar('about', { length: 255 }),
  phone_number: varchar('phone_number', { length: 255 }),
  birthday: varchar('birthday', { length: 20 }),
  address: varchar('address', { length: 255 }),
  zip_code: varchar('zip_code', { length: 255 }),

  gender: genre('gender'),
  status: userStatus('status').notNull().default('active'),
  language: varchar('language', { length: 10 }).references(
    () => languages.code,
  ),
  is_email_verified: boolean('is_email_verified').notNull().default(false),
  is_phone_number_verified: boolean('is_phone_number_verified')
    .notNull()
    .default(false),
  password: varchar('password', { length: 256 }),
  facebook: varchar('facebook', { length: 255 }),
  twitter: varchar('twitter', { length: 255 }),
  linkedin: varchar('linkedin', { length: 255 }),
  website: varchar('website', { length: 255 }),
  city_id: integer('city_id').references(() => cities.id),
  country_id: integer('country_id').references(() => countries.id),

  registered_at: timestamp('registered_at')
    .notNull()
    .default(sql`now()`),
  last_login_at: timestamp('last_login_at').default(sql`now()`),
});

export default users;

export type User = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;
