import { Injectable } from '@nestjs/common';
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
  }

  update(id: string, data: UpdateClientSdkDto) {
    return `${id}: ${data}`;
  }
}
