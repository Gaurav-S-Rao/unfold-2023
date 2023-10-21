import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { UpdateClientSdkDto } from './dto/update-client-sdk.dto';

@Injectable()
export class ClientSdkService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    const apiKey = await this.prisma.apiKeys.findUnique({
      where: {
        id,
      },
    });

    const campaigns = await this.prisma.campaign.findMany({
      where: {
        campaignTopicsIds: apiKey.campaignTopics,
      },
    });

    // picks a random campaign
    const campaign = campaigns[Math.floor(Math.random() * campaigns.length)];

    const advertisement = this.prisma.advertisement.findUnique({
      where: {
        id: campaign.advertisementId,
      },
    });

    return {
      advertisement,
      campaign,
    };
  }

  async update(id: string, data: UpdateClientSdkDto) {
    const { advertisementId, clicked, viewed } = data;

    const apiKey = await this.prisma.apiKeys.findUnique({
      where: {
        id,
      },
    });

    if (!apiKey) {
      throw new HttpException('Invalid API Key', HttpStatus.UNAUTHORIZED);
    }

    const campaign = await this.prisma.campaign.findUnique({
      where: {
        id: advertisementId,
      },
    });

    if (!campaign) {
      throw new HttpException('Invalid Campaign', HttpStatus.BAD_REQUEST);
    }

    if (clicked) {
      await this.prisma.campaignTopics.update({
        where: {
          id: campaign.campaignTopicsIds,
        },
        data: {
          totalClick: {
            increment: 1,
          },
        },
      });
      await this.prisma.campaign.update({
        where: {
          id: advertisementId,
        },
        data: {
          clicks: {
            increment: 1,
          },
        },
      });
    }

    if (viewed) {
      await this.prisma.campaignTopics.update({
        where: {
          id: campaign.campaignTopicsIds,
        },
        data: {
          totalClick: {
            increment: 1,
          },
        },
      });
      await this.prisma.campaign.update({
        where: {
          id: advertisementId,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      });
    }
  }
}
