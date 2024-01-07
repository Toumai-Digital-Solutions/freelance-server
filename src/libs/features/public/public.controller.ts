import { Controller, Get } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('sectors')
  getSectors() {
    return this.publicService.getSectors();
  }
}
