import { IsEnum, IsString } from 'class-validator';
import { UserRoles } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  company_name?: string;

  @IsString()
  company_category?: string;

  @IsString()
  company_type?: string;

  @IsString()
  website?: string;

  @IsString()
  sui_address: string;

  @IsString()
  evm_address?: string;

  @IsEnum(UserRoles)
  role?: UserRoles;
}
