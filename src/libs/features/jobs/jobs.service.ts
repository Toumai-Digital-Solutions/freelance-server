import { Inject, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DB } from 'src/variables';
import jobs from 'src/db/schema/job';
import { and, desc, eq, getTableColumns, ilike, or } from 'drizzle-orm';
import { SearchJobDto } from './dto/search-job.dto';
import entreprises from 'src/db/schema/entreprises';
import users from 'src/db/schema/users';
import cities from 'src/db/schema/cities';
import countries from 'src/db/schema/countries';
import jobTypes from 'src/db/schema/job_type';
import currencies from 'src/db/schema/currencies';
import { objArray } from 'src/utils/dbUtils';
import specializations from 'src/db/schema/specialization';
import jobToSpecializations from 'src/db/schema/job_to_specializations';

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
    const { q, limit = 20, orderBy = 'id', order = 'asc', offset } = params;
    const orderBySql = order === 'desc' ? desc(jobs[orderBy]) : jobs[orderBy];

    const query = q ? or(ilike(jobs.title, `%${q}%`)) : undefined;

    const where = and(query);
    const data = await this.db
      .select({
        ...getTableColumns(jobs),
        entreprise: {
          id: entreprises.id,
          user_id: entreprises.user_id,
          name: entreprises.name,
          logo: entreprises.logo,
        },
        user: {
          id: users.id,
          email: users.email,
          first_name: users.first_name,
          last_name: users.last_name,
          avatar: users.avatar,
        },
      })
      .from(jobs)
      .where(where)
      .leftJoin(entreprises, eq(jobs.entreprise_id, entreprises.id))
      .leftJoin(users, eq(jobs.user_id, users.id))
      .orderBy(orderBySql)
      .offset(offset)
      .limit(limit);

    return {
      data,
    };
  }

  findOne(id: number) {
    return this.db
      .select({
        ...getTableColumns(jobs),
        entreprise: {
          id: entreprises.id,
          user_id: entreprises.user_id,
          name: entreprises.name,
          logo: entreprises.logo,
        },
        user: {
          id: users.id,
          email: users.email,
          first_name: users.first_name,
          last_name: users.last_name,
          avatar: users.avatar,
        },
        city: cities,
        country: countries,
        job_type: jobTypes,
        currency: currencies,
        specializations: objArray({
          table: specializations,
          id: specializations.id,
        }),
      })
      .from(jobs)
      .leftJoin(entreprises, eq(jobs.entreprise_id, entreprises.id))
      .leftJoin(users, eq(jobs.user_id, users.id))
      .leftJoin(cities, eq(jobs.city_id, cities.id))
      .leftJoin(countries, eq(jobs.country_id, countries.id))
      .leftJoin(jobTypes, eq(jobs.job_type_id, jobTypes.id))
      .leftJoin(currencies, eq(jobs.currency_id, currencies.id))
      .leftJoin(jobToSpecializations, eq(jobs.id, jobToSpecializations.job_id))
      .leftJoin(
        specializations,
        eq(jobToSpecializations.specializations_id, specializations.id),
      )
      .where(eq(jobs.id, id))
      .groupBy(() => [
        jobs.id,
        entreprises.id,
        users.id,
        cities.id,
        countries.id,
        jobTypes.id,
        currencies.id,
        specializations.id,
      ])
      .then((res) => res[0]);
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return this.db.update(jobs).set(updateJobDto).where(eq(jobs.id, id));
  }

  remove(id: number) {
    return this.db.delete(jobs).where(eq(jobs.id, id));
  }
}
