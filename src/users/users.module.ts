import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from './auth/auth.module';
import { DBModule } from 'src/db/db.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],

  imports: [AuthModule, DBModule],
})
export class UsersModule {}
