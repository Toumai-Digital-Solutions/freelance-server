import { integer, serial, varchar } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import users from './users';
import { genre } from './enum';
import cities from './cities';
import countries from './countries';

const particuliers = pgTable('particuliers', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  avatar: varchar('avatar', { length: 100 }),
  cover: varchar('cover', { length: 100 }),
  about: varchar('about', { length: 255 }),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  genre: genre('genre'),
  birthday: varchar('birthday', { length: 20 }),
  address: varchar('address', { length: 255 }),
  zipCode: varchar('zip_code', { length: 10 }),
  cityId: integer('city_id').references(() => cities.id),
  countryId: integer('country_id').references(() => countries.id),
  phone: varchar('phone', { length: 100 }),
  email: varchar('email', { length: 100 }),
  facebook: varchar('facebook', { length: 255 }),
  twitter: varchar('twitter', { length: 255 }),
  linkedin: varchar('linkedin', { length: 255 }),
  website: varchar('website', { length: 255 }),
});
export default particuliers;
