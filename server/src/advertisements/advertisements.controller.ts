import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AdvertisementsService } from './advertisements.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { Public } from 'src/common/decorators/public-api.decorator';

@Controller('advertisements')
@ApiTags('Advertisements')
export class AdvertisementsController {
  constructor(private readonly advertisementsService: AdvertisementsService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() body: CreateAdvertisementDto) {
    return this.advertisementsService.create(body);
  }

  @Get()
  @Public()
  findAll() {
    return this.advertisementsService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.advertisementsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() body: UpdateAdvertisementDto) {
    return this.advertisementsService.update(id, body);
  }
  
  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.advertisementsService.remove(id);
  }
}
