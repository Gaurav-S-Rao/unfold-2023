import { PartialType } from '@nestjs/swagger';
import { CreateSpheronStorageDto } from './create-spheron-storage.dto';

export class UpdateSpheronStorageDto extends PartialType(CreateSpheronStorageDto) {}
