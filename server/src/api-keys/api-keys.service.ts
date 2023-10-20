import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';

@Injectable()
export class ApiKeysService {
  constructor(private prisma: PrismaService) {}
  create(user: User, data: CreateApiKeyDto) {
    return this.prisma.apiKeys.create({
      data: {
        name: data.name,
        campaignTopics: data.category,
        User: {
          connect: user,
        },
      },
    });
  }

  findAll() {
    return this.prisma.apiKeys.findMany({
      where: {
        campaignTopics: {},
      },
    });
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
