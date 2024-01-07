import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { EntreprisesModule } from './libs/features/entreprises/entreprises.module';
import { JobsModule } from './libs/features/jobs/jobs.module';
import { PublicModule } from './libs/features/public/public.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    UploadModule,
    DBModule,
    EntreprisesModule,
    JobsModule,
    PublicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
