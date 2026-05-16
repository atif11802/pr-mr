import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { CreateMrLineDto } from './create-mr-line.dto';

export class CreateMrDto {
  @IsString()
  @IsNotEmpty()
  mrNo!: string;

  @IsDateString()
  mrDate!: string;

  @IsNumber()
  @Type(() => Number)
  requestByEmpId!: number;

  @IsNumber()
  @Type(() => Number)
  departmentId!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  projectId?: number;

  @IsNumber()
  @Type(() => Number)
  warehouseId!: number;

  @IsString()
  @IsNotEmpty()
  priority!: string;

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
  @Type(() => CreateMrLineDto)
  lines!: CreateMrLineDto[];
}
