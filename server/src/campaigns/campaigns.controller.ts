import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import type { User } from '@prisma/client';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';

import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Public } from 'src/common/decorators/public-api.decorator';

@Controller('campaigns')
@ApiTags('Campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Creates A new Campaign',
    schema: {
      title: 'Campaign',
      type: 'object',
      example: {
        id: '652f07fab735ba00abfeb564',
        name: 'my test campaign',
        views: 0,
        clicks: 0,
        startDate: '2023-10-18T00:00:00.000Z',
        endDate: '2023-10-19T00:00:00.000Z',
        createdAt: '2023-10-17T22:17:30.148Z',
        updatedAt: '2023-10-17T22:17:30.148Z',
        advertisementId: null,
        userId: '652eff1fe5343f37fc13af73',
        campaignTopicsIds: [],
      },
    },
  })
  create(@CurrentUser() user: User, @Body() body: CreateCampaignDto) {
    return this.campaignsService.create(user, body);
  }

  @Get()
  @Public()
  findAll() {
    return this.campaignsService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() body: UpdateCampaignDto) {
    return this.campaignsService.update(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.campaignsService.remove(id);
  }
}
