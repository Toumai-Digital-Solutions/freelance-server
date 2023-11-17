import { Inject, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DB } from 'src/variables';
import jobs from 'src/db/schema/job';
import { desc, eq, getTableColumns, ilike, or } from 'drizzle-orm';
import { SearchJobDto } from './dto/search-job.dto';
import entreprises from 'src/db/schema/entreprises';
import users from 'src/db/schema/users';

@Injectable()
export class JobsService {
  constructor(@Inject(DB) private db: NodePgDatabase) {}
  create(createJobDto: CreateJobDto) {
    return this.db.insert(jobs).values(createJobDto);
  }

  findAll() {
    return this.db.select().from(jobs);
  }
  async findAllBySearch(params: SearchJobDto) {
    console.log('params', params);
    const { q, limit = 20, orderBy = 'id', order = 'asc' } = params;
    const orderBySql = order === 'desc' ? desc(jobs[orderBy]) : jobs[orderBy];

    const query = q ? or(ilike(jobs.title, `%${q}%`)) : undefined;
    const where = query;
    const data = await this.db
      .select({
        ...getTableColumns(jobs),
        entreprise: {
          id: entreprises.id,
          userId: entreprises.userId,
          name: entreprises.name,
          logo: entreprises.logo,
        },
        user: {
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          avatar: users.avatar,
        },
      })
      .from(jobs)
      .where(where)
      .leftJoin(entreprises, eq(jobs.entrepriseId, entreprises.id))
      .leftJoin(users, eq(jobs.userId, users.id))
      .orderBy(orderBySql)
      .limit(limit);

    return {
      data,
    };
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
