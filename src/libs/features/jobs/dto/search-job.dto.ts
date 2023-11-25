import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchJobDto {
  @ApiPropertyOptional({ description: 'Query for search' })
  q: string;
  @ApiPropertyOptional({ description: 'last id' })
  offset?: number;
  @ApiPropertyOptional({ description: 'result number' })
  limit: number;
  @ApiPropertyOptional({ description: 'OrderBy' })
  orderBy: string;
  @ApiPropertyOptional({ description: 'Filter' })
  order: 'asc' | 'desc';
}
