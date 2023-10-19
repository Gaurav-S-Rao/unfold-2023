import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';

@Injectable()
export class ApiKeysService {
  constructor(private prisma: PrismaService) {}
  create(data: CreateApiKeyDto, user: User) {
    return this.prisma.apiKeys.create({
      data: {
        ...data,
        User: {
          connect: user,
        },
      },
    });
  }

  findAll() {
    return this.prisma.apiKeys.findMany();
  }

  findOne(id: string) {
    return this.prisma.apiKeys.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateApiKeyDto) {
    return this.prisma.apiKeys.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.apiKeys.delete({ where: { id } });
  }
}
