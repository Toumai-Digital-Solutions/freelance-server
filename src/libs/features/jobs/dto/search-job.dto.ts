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

// "limit": 10,
// "offset": state.data.length,
// "orderBy": "created_at",
// "order": "desc",
// "sector_id": filter.sectorId,
// "q": filter.q

export class SearchJobDtov2 {
  @ApiPropertyOptional({ description: 'Query for search' })
  q?: string;
  @ApiPropertyOptional({ description: 'already loaded data' })
  offset?: number;
  @ApiPropertyOptional({ description: 'result number' })
  limit?: number;
  @ApiPropertyOptional({ description: 'OrderBy' })
  orderBy?: string;
  @ApiPropertyOptional({ description: 'Filter' })
  order?: 'asc' | 'desc';
  @ApiPropertyOptional({ description: 'Filter' })
  sectorId?: number;
}
