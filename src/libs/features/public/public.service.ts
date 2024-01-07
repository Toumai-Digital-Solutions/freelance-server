import { Inject, Injectable, Logger } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DB } from 'src/db/db.module';
import jobToSpecializations from 'src/db/schema/job_to_specializations';
import sectors from 'src/db/schema/sectors';
import specializations from 'src/db/schema/specialization';

@Injectable()
export class PublicService {
  constructor(@Inject(DB) private db: NodePgDatabase) {}

  async getSectors() {
    const data = await this.db
      .select({
        id: sectors.id,
        name: sectors.name,
        jobCount: sql<number>`count(${jobToSpecializations.job_id})::int`,
      })
      .from(sectors)
      .leftJoin(specializations, eq(sectors.id, specializations.sector_id))
      .leftJoin(
        jobToSpecializations,
        eq(specializations.id, jobToSpecializations.specializations_id),
      )
      .groupBy(() => [sectors.id]);
    Logger.log({ data });
    return data;
  }
}
