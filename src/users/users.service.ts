import { eq } from 'drizzle-orm';
import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import users from 'src/db/schema/users';
import { DB } from 'src/db/db.module';
@Injectable()
export class UsersService {
  constructor(@Inject(DB) private db: NodePgDatabase) {}

  me(id: number) {
    return this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .then((res) => res[0]);
  }
}
