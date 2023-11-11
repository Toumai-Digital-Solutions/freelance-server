import { Inject, Injectable } from '@nestjs/common';
import { and, eq, or } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';

import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DB } from 'src/db/db.module';
import users, { UserInsert } from 'src/db/schema/users';
import { UserRole } from 'src/db/schema/enum';

@Injectable()
export class AuthService {
  constructor(@Inject(DB) private db: NodePgDatabase) {}

  //Validate user from JWT
  async validateUser(payload: { id: number }) {
    return this.db
      .select()
      .from(users)
      .where(and(eq(users.id, payload.id), eq(users.status, 'active')))
      .then((users) => users[0]);
  }
  async loginWithEmailOrUsername(cred: string) {
    return this.db
      .select()
      .from(users)
      .where(or(eq(users.email, cred), eq(users.username, cred)))
      .then((users) => users[0]);
  }

  async registerWithEmailPassord(user: {
    email: string;
    password: string;
    role: UserRole;
  }) {
    const hast = await bcrypt.hash(user.password, 10);
    return this.db
      .insert(users)
      .values({
        ...user,
        password: hast,
      })
      .returning()
      .then((users) => users[0]);
  }

  async completProfile({ id, data }: { id: number; data: UserInsert }) {
    return this.db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning()
      .then((users) => users[0]);
  }
}
