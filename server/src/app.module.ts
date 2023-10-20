import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { AdvertisementsModule } from './advertisements/advertisements.module';
import { ApiKeysModule } from './api-keys/api-keys.module';
import { ClientSdkModule } from './client-sdk/client-sdk.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    CampaignsModule,
    AdvertisementsModule,
    ApiKeysModule,
    ClientSdkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
