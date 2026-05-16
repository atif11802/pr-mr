import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreatePrLineDto } from './create-pr-line.dto';
import { CreatePrMappingDto } from './create-pr-mapping.dto';

export class CreatePrDto {
  @IsString()
  @IsNotEmpty()
  prNo!: string;

  @IsDateString()
  prDate!: string;

  @IsNumber()
  @Type(() => Number)
  buyerId!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  supplierId?: number;

  @IsString()
  @IsNotEmpty()
  status!: string;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsString()
  @IsNotEmpty()
  approvalStatus!: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  approvedBy?: number;

  @IsOptional()
  @IsDateString()
  approvedDate?: string;

  @IsNumber()
  @Type(() => Number)
  companyId!: number;

  @IsNumber()
  @Type(() => Number)
  createdBy!: number;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreatePrLineDto)
  lines!: CreatePrLineDto[];

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreatePrMappingDto)
  mappings!: CreatePrMappingDto[];
}
