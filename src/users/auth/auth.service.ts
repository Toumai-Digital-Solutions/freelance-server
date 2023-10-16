import { Inject, Injectable, Logger } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';

import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DB } from 'src/db/db.module';
import users from 'src/db/schema/users';
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
  async loginWithEmailRole(login: { role: UserRole; email: string }) {
    Logger.debug({
      message: 'loginWithEmailRole',
      data: login,
    });
    return this.db
      .select()
      .from(users)
      .where(and(eq(users.email, login.email), eq(users.role, login.role)))
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
}
