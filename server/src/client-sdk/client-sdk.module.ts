import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { ClientSdkService } from './client-sdk.service';
import { ClientSdkController } from './client-sdk.controller';

@Module({
  controllers: [ClientSdkController],
  providers: [ClientSdkService, PrismaService],
})
export class ClientSdkModule {}
