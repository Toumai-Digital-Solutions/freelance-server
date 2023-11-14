import { Inject, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DB } from 'src/variables';
import jobs from 'src/db/schema/job';
import { desc, eq, ilike, or } from 'drizzle-orm';
import { SearchJobDto } from './dto/search-job.dto';

@Injectable()
export class JobsService {
  constructor(@Inject(DB) private db: NodePgDatabase) {}
  create(createJobDto: CreateJobDto) {
    return this.db.insert(jobs).values(createJobDto);
  }

  findAll() {
    return this.db.select().from(jobs);
  }
  findAllBySearch(params: SearchJobDto) {
    console.log('params', params);
    const { q, limit = 20, orderBy = 'id', order = 'asc' } = params;
    const orderBySql = order === 'desc' ? desc(jobs[orderBy]) : jobs[orderBy];

    const query = q ? or(ilike(jobs.title, `%${q}%`)) : undefined;
    const where = query;

    return this.db
      .select()
      .from(jobs)
      .where(where)
      .orderBy(orderBySql)
      .limit(limit);
  }

  findOne(id: number) {
    return this.db
      .select()
      .from(jobs)
      .where(eq(jobs.id, id))
      .then((res) => res[0]);
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return this.db.update(jobs).set(updateJobDto).where(eq(jobs.id, id));
  }

  remove(id: number) {
    return this.db.delete(jobs).where(eq(jobs.id, id));
  }
}
