import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();
const config: Config = {
  schema: './src/db/schema/',
  driver: 'pg',
  out: './drizzle',
  dbCredentials: {
    connectionString: process.env.DB_URL,
  },
};

export default config;
