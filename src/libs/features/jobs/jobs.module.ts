import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { DBModule } from 'src/db/db.module';

@Module({
  controllers: [JobsController],
  providers: [JobsService],
  imports: [DBModule],
})
export class JobsModule {}
