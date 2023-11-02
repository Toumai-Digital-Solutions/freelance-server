import { integer, serial, varchar } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import users from './users';
import entrepriseTypes from './entreprise_types';
import cities from './cities';
import countries from './countries';
import { employeesNumber } from './enum';
import industries from './industries';

const entreprises = pgTable('entreprises', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  name: varchar('name', { length: 255 }),
  shortName: varchar('name', { length: 100 }),
  logo: varchar('avatar', { length: 100 }),
  cover: varchar('cover', { length: 100 }),
  about: varchar('about', { length: 255 }),
  type: integer('type').references(() => entrepriseTypes.id),
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
  employeesNumber: employeesNumber('employees_number'),
  industryId: integer('industry_id').references(() => industries.id),
});
export default entreprises;
