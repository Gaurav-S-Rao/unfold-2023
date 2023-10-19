import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { ApiKeysService } from './api-keys.service';
import { ApiKeysController } from './api-keys.controller';

@Module({
  controllers: [ApiKeysController],
  providers: [ApiKeysService, PrismaService],
})
export class ApiKeysModule {}
