import { InferSelectModel, sql } from 'drizzle-orm';
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
  username: varchar('username', { length: 255 }).notNull().unique(),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),

  avatar: varchar('avatar', { length: 255 }),
  cover: varchar('cover', { length: 255 }),
  about: varchar('about', { length: 255 }),
  phoneNumber: varchar('phone_number', { length: 255 }),
  birthday: varchar('birthday', { length: 20 }),
  address: varchar('address', { length: 255 }),
  zipCode: varchar('zip_code', { length: 255 }),

  gender: genre('gender'),
  status: userStatus('status').notNull().default('active'),
  language: varchar('language', { length: 10 }).references(
    () => languages.code,
  ),
  isEmailVerified: boolean('is_email_verified').notNull().default(false),
  isPhoneNumberVerified: boolean('is_phone_number_verified')
    .notNull()
    .default(false),
  password: varchar('password', { length: 256 }),
  facebook: varchar('facebook', { length: 255 }),
  twitter: varchar('twitter', { length: 255 }),
  linkedin: varchar('linkedin', { length: 255 }),
  website: varchar('website', { length: 255 }),
  cityId: integer('city_id').references(() => cities.id),
  countryId: integer('country_id').references(() => countries.id),

  registeredAt: timestamp('registered_at')
    .notNull()
    .default(sql`now()`),
  lastLoginAt: timestamp('last_login_at').default(sql`now()`),
});

export default users;

export type User = InferSelectModel<typeof users>;
