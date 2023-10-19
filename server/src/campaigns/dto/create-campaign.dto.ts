import { Advertisement } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAdvertisementDto } from 'src/advertisements/dto/create-advertisement.dto';
import { IsDateStringFormat } from 'src/common/decorators/date-format-decorator';
export class CreateCampaignDto {
  @IsString()
  name: string;

  // convert to date instance
  @IsDateStringFormat()
  startDate: Date;

  @IsDateStringFormat()
  endDate: Date;

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => CreateAdvertisementDto)
  // advertisement?: CreateAdvertisementDto;
}
