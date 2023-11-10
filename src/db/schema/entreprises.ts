import { integer, serial, varchar } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import users from './users';
import entrepriseTypes from './entreprise_types';
import cities from './cities';
import countries from './countries';
import { employeesNumber } from './enum';
import sectors from './sectors';

const entreprises = pgTable('entreprises', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  name: varchar('name', { length: 255 }),
  shortName: varchar('short_name', { length: 255 }),
  logo: varchar('logo', { length: 255 }),
  cover: varchar('cover', { length: 255 }),
  about: varchar('about', { length: 255 }),
  type: integer('type').references(() => entrepriseTypes.id),
  address: varchar('address', { length: 255 }),
  zipCode: varchar('zip_code', { length: 255 }),
  cityId: integer('city_id').references(() => cities.id),
  countryId: integer('country_id').references(() => countries.id),
  phoneNumber: varchar('phone_number', { length: 100 }),
  email: varchar('email', { length: 100 }),
  facebook: varchar('facebook', { length: 255 }),
  twitter: varchar('twitter', { length: 255 }),
  linkedin: varchar('linkedin', { length: 255 }),
  website: varchar('website', { length: 255 }),
  employeesNumber: employeesNumber('employees_number'),
  sectorId: integer('sector_id').references(() => sectors.id),
});
export default entreprises;
