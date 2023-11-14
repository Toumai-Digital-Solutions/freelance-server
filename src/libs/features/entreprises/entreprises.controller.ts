import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EntreprisesService } from './entreprises.service';
import { CreateEntrepriseDto } from './dto/create-entreprise.dto';
import { UpdateEntrepriseDto } from './dto/update-entreprise.dto';
import { SearchEntrepriseDto } from './dto/search-entreprise.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('entreprises')
export class EntreprisesController {
  constructor(private readonly entreprisesService: EntreprisesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createEntrepriseDto: CreateEntrepriseDto) {
    return this.entreprisesService.create(createEntrepriseDto);
  }

  @Get()
  findAll() {
    return this.entreprisesService.findAll();
  }
  @Get('search')
  findAllBySearch(@Query() query: SearchEntrepriseDto) {
    return this.entreprisesService.findAllBySearch(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entreprisesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateEntrepriseDto: UpdateEntrepriseDto,
  ) {
    return this.entreprisesService.update(+id, updateEntrepriseDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.entreprisesService.remove(+id);
  }
}
