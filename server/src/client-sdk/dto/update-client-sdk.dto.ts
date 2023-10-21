import { PartialType } from '@nestjs/swagger';
import { CreateClientSdkDto } from './create-client-sdk.dto';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateClientSdkDto extends PartialType(CreateClientSdkDto) {
  @IsString()
  advertisementId: string;

  @IsBoolean()
  clicked: boolean;

  @IsBoolean()
  viewed: boolean;
}
