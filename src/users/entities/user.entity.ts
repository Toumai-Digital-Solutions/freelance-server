import { InferSelectModel } from 'drizzle-orm';
import users from 'src/db/schema/users';

export type User = InferSelectModel<typeof users>;
