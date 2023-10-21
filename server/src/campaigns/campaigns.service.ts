import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { convertToDate } from 'src/common/convert-to-datejs';
@Injectable()
export class CampaignsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, data: CreateCampaignDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { advertisement, ...campaign } = data;
    data.startDate = convertToDate(data.startDate as any);
    data.endDate = convertToDate(data.endDate as any);

    const { advertisementId, ...campaign } = data;

    const newCampaign = await this.prisma.campaign.create({
      data: {
        budget: campaign.budget,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        name: campaign.name,
        CampaignTopicsIds: {
          connect: {
            name: campaign.campaignTopics,
          },
        },
        User: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    const ad = await this.prisma.advertisement.update({
      where: {
        id: advertisementId,
      },
      data: {
        campaignId: newCampaign.id,
      },
    });

    newCampaign.advertisementId = ad.id;

    return newCampaign;
  }

  findAll() {
    return this.prisma.campaign.findMany();
  }

  findOne(id: string) {
    return this.prisma.campaign.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, data: UpdateCampaignDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { advertisement, ...campaignData } = data;
    return this.prisma.campaign.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.campaign.delete({
      where: { id },
    });
  }
}
