import { eq } from 'drizzle-orm';
import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import users from 'src/db/schema/users';
import { DB } from 'src/db/db.module';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
  create(createUserDto: CreateUserDto) {
    return this.db.insert(users).values(createUserDto);
  }

  findAll() {
    return this.db.select().from(users);
  }

  findOne(id: number) {
    return this.db.select().from(users).where(eq(users.id, id));
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.db.update(users).set(updateUserDto).where(eq(users.id, id));
  }

  remove(id: number) {
    return this.db.delete(users).where(eq(users.id, id));
  }
}
