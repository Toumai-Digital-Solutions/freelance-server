import { InferInsertModel } from 'drizzle-orm';
import jobs from 'src/db/schema/job';

export type CreateJobDto = InferInsertModel<typeof jobs>;
