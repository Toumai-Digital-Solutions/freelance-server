import { pgEnum } from 'drizzle-orm/pg-core';

export const genre = pgEnum('genre', ['homme', 'femme']);

// export const contentTypes = pgEnum('content_types', [
//   'job',
//   'course',
//   'event',
//   'article',
//   'service',
// ]);

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

export const employeesNumber = pgEnum('employees_number', [
  '1-10',
  '10-50',
  '50-200',
  '200-500',
  '500-1000',
  '1000-5000',
  '5000-10000',
  '10000+',
]);

export const status = pgEnum('status', [
  'active',
  'inactive',
  'pending',
  'blocked',
  'deleted',
]);

export const jobLevel = pgEnum('job_level', [
  'entry_level',
  'mid_level',
  'top_level',
]);

export const experienceLevel = pgEnum('experience_level', [
  'no experience',
  'less than a year',
  '1-2 years',
  '3-5 years',
  '6-10 years',
  '10+ years',
]);
