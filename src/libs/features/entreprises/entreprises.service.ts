import { Inject, Injectable } from '@nestjs/common';
import { CreateEntrepriseDto } from './dto/create-entreprise.dto';
import { UpdateEntrepriseDto } from './dto/update-entreprise.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DB } from 'src/variables';
import entreprises from 'src/db/schema/entreprises';
import { eq } from 'drizzle-orm';

@Injectable()
export class EntreprisesService {
  constructor(@Inject(DB) private db: NodePgDatabase) {}
  create(createEntrepriseDto: CreateEntrepriseDto) {
    return this.db.insert(entreprises).values(createEntrepriseDto);
  }

  findAll() {
    return this.db.select().from(entreprises);
  }

  findOne(id: number) {
    return this.db
      .select()
      .from(entreprises)
      .where(eq(entreprises.id, id))
      .then((res) => res[0]);
  }

  update(id: number, updateEntrepriseDto: UpdateEntrepriseDto) {
    return this.db
      .update(entreprises)
      .set(updateEntrepriseDto)
      .where(eq(entreprises.id, id));
  }

  remove(id: number) {
    return this.db.delete(entreprises).where(eq(entreprises.id, id));
  }
}
