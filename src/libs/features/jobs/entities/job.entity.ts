import { InferSelectModel } from 'drizzle-orm';
import jobs from 'src/db/schema/job';

export type Job = InferSelectModel<typeof jobs>;
