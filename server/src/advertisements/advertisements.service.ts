import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { User } from '@prisma/client';

@Injectable()
export class AdvertisementsService {
  constructor(private readonly prisma: PrismaService) {}

  create(user: User, data: CreateAdvertisementDto) {
    return this.prisma.advertisement.create({
      data: {
        ...data,
        userId: user.id,
      },
    });
  }

  findAll() {
    return this.prisma.advertisement.findMany();
  }

  findOne(id: string) {
    return this.prisma.advertisement.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateAdvertisementDto) {
    return this.prisma.advertisement.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.advertisement.delete({ where: { id } });
  }
}
