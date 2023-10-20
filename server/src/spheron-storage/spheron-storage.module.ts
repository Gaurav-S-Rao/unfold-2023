import { Module } from '@nestjs/common';
import { SpheronStorageService } from './spheron-storage.service';
import { SpheronStorageController } from './spheron-storage.controller';

@Module({
  controllers: [SpheronStorageController],
  providers: [SpheronStorageService],
})
export class SpheronStorageModule {}
