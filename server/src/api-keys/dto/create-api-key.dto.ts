import { IsString } from 'class-validator';

export class CreateApiKeyDto {
  @IsString()
  name: string;

  @IsString()
  campaignTopics: string;
}
