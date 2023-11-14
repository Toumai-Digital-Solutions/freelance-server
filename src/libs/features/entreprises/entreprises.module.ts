import { Module } from '@nestjs/common';
import { EntreprisesService } from './entreprises.service';
import { EntreprisesController } from './entreprises.controller';
import { DBModule } from 'src/db/db.module';

@Module({
  controllers: [EntreprisesController],
  providers: [EntreprisesService],
  imports: [DBModule],
})
export class EntreprisesModule {}
