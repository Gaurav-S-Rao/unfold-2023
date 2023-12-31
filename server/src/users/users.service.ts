import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(body: CreateUserDto) {
    return this.prisma.user.create({
      data: body,
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const ads = await this.prisma.advertisement.findMany({
      where: {
        userId: id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    const userData = {
      ...user,
      advertisements: ads,
    };

    return userData;
  }

  findOneByAddress(platform: string, address: string) {
    return this.prisma.user.findFirst({
      where: {
        [`${platform}_address`]: address,
      },
    });
  }

  update(id: string, body: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: body,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
