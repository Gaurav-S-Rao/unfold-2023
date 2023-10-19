import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';

import { ApiKeysService } from './api-keys.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';

@Controller('api-keys')
@ApiTags('Client Api Keys')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() body: CreateApiKeyDto, @CurrentUser() user: User) {
    return this.apiKeysService.create(body, user);
  }

  @Get()
  @ApiBearerAuth()
  findAll(@CurrentUser() user: User) {
    const { apiKeysId } = user;
    return this.apiKeysService.findOne(apiKeysId);
  }

  @Patch()
  @ApiBearerAuth()
  update(@CurrentUser() user: User, @Body() body: UpdateApiKeyDto) {
    const { apiKeysId } = user;
    return this.apiKeysService.update(apiKeysId, body);
  }

  @Delete()
  @ApiBearerAuth()
  remove(@CurrentUser() user: User) {
    const { apiKeysId } = user;
    return this.apiKeysService.remove(apiKeysId);
  }
}
