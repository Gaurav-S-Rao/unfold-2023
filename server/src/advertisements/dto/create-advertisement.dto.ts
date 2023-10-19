import { IsString } from 'class-validator';
export class CreateAdvertisementDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  image: string;
  @IsString()
  link: string;
}
