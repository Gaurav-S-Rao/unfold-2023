import { Advertisement } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsOptional,
  IsNumber,
  IsString,
  ValidateNested,
  IsISO8601,
} from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  name: string;

  // convert to date instance
  // @IsDateStringFormat()
  @IsISO8601()
  startDate: Date;
  
  // @IsDateStringFormat()
  @IsISO8601()
  endDate: Date;

  @IsNumber()
  budget: number;

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => CreateAdvertisementDto)
  // advertisement?: CreateAdvertisementDto;
}
