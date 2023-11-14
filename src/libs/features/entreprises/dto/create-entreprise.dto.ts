import { InferInsertModel } from 'drizzle-orm';
import entreprises from 'src/db/schema/entreprises';

export type CreateEntrepriseDto = InferInsertModel<typeof entreprises>;
