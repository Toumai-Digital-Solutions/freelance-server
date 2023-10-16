import { pgEnum } from 'drizzle-orm/pg-core';

export const genre = pgEnum('genre', ['homme', 'femme']);

export const userRole = pgEnum('user_role', [
  'admin',
  'particulier',
  'entreprise',
]);

export type UserRole = 'admin' | 'particulier' | 'entreprise';

export const userStatus = pgEnum('user_status', [
  'active',
  'inactive',
  'pending',
  'blocked',
  'deleted',
]);
