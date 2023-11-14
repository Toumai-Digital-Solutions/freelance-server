import { Inject, Injectable } from '@nestjs/common';
import { CreateEntrepriseDto } from './dto/create-entreprise.dto';
import { UpdateEntrepriseDto } from './dto/update-entreprise.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DB } from 'src/variables';
import entreprises from 'src/db/schema/entreprises';
import { desc, eq, ilike, or } from 'drizzle-orm';
import jobs from 'src/db/schema/job';
import { SearchEntrepriseDto } from './dto/search-entreprise.dto';

@Injectable()
export class EntreprisesService {
  constructor(@Inject(DB) private db: NodePgDatabase) {}
  create(createEntrepriseDto: CreateEntrepriseDto) {
    return this.db.insert(entreprises).values(createEntrepriseDto);
  }

  findAll() {
    return this.db.select().from(entreprises);
  }
  findAllBySearch(params: SearchEntrepriseDto) {
    console.log('params', params);
    const { q, limit = 20, orderBy = 'id', order = 'asc' } = params;
    const orderBySql =
      order === 'desc' ? desc(entreprises[orderBy]) : jobs[orderBy];

    const query = q ? or(ilike(jobs.title, `%${q}%`)) : undefined;
    const where = query;

    return this.db
      .select()
      .from(entreprises)
      .where(where)
      .orderBy(orderBySql)
      .limit(limit);
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
