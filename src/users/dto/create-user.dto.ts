import { InferInsertModel } from 'drizzle-orm';
import users from 'src/db/schema/users';

export type CreateUserDto = InferInsertModel<typeof users>;
