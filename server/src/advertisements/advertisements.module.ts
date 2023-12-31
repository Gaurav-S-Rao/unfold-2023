import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsController } from './advertisements.controller';

@Module({
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService, PrismaService],
})
export class AdvertisementsModule {}
