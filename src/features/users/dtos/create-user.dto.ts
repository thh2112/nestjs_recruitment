import { BaseCredentialDto } from '@/features/auth/dtos';
import { IsDateString, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateUserDto extends BaseCredentialDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  age: number;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsDateString()
  createdAt: Date;

  @IsOptional()
  @IsDateString()
  updatedAt: Date;
}
