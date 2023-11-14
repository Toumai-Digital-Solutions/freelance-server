import { InferSelectModel } from 'drizzle-orm';
import entreprises from 'src/db/schema/entreprises';

export type Entreprise = InferSelectModel<typeof entreprises>;
