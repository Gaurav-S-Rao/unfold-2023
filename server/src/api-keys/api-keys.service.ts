import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';

@Injectable()
export class ApiKeysService {
  constructor(private prisma: PrismaService) {}
  async create(user: User, data: CreateApiKeyDto) {
    // return this.prisma.apiKeys.create({
    //   data: {
    //     name: data.name,
    //     CampaignTopics: {
    //       connectOrCreate: {
    //         create: {
    //           name: data.campaignTopics,
    //         },
    //         where: {
    //           name: null,
    //         },
    //       },
    //     },
    //     User: {
    //       connect: {
    //         id: user.id,
    //       },
    //     },
    //   },
    // });

    let campaignTopic = await this.prisma.campaignTopics.findFirst({
      where: {
        name: data.campaignTopics,
      },
    });

    if (!campaignTopic) {
      campaignTopic = await this.prisma.campaignTopics.create({
        data: {
          name: data.campaignTopics,
        },
      });
    }

    const apiKey = await this.prisma.apiKeys.create({
      data: {
        name: data.name,
        User: {
          connect: {
            id: user.id,
          },
        },
        CampaignTopics: {
          connect: {
            id: campaignTopic.id,
          },
        },
      },
    });

    return apiKey;
  }

  findAll() {
    return this.prisma.apiKeys.findMany();
  }

  findOne(user: User) {
    return this.prisma.apiKeys.findUnique({
      where: {
        userId: user.id,
      },
    });
  }

  update(user: User, data: UpdateApiKeyDto) {
    return this.prisma.apiKeys.update({
      where: {
        userId: user.id,
      },
      data,
    });
  }

  remove(user: User) {
    return this.prisma.apiKeys.delete({ where: { userId: user.id } });
  }
}
