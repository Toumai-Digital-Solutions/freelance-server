import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchEntrepriseDto {
  @ApiPropertyOptional({ description: 'Query for search' })
  q: string;
  @ApiPropertyOptional({ description: 'result number' })
  limit: number;
  @ApiPropertyOptional({ description: 'OrderBy' })
  orderBy: string;
  @ApiPropertyOptional({ description: 'Filter' })
  order: 'asc' | 'desc';
}
