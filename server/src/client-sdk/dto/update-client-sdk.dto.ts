import { PartialType } from '@nestjs/swagger';
import { CreateClientSdkDto } from './create-client-sdk.dto';

export class UpdateClientSdkDto extends PartialType(CreateClientSdkDto) {}
