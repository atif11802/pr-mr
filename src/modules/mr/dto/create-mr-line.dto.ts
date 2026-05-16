import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMrLineDto {
  @IsNumber()
  @Type(() => Number)
  itemId!: number;

  @IsNumber()
  @Type(() => Number)
  uomId!: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  requiredQty!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  approvedQty?: number = 0;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  prCreatedQty?: number = 0;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  remainingPrQty?: number = 0;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  stockQty?: number = 0;

  @IsDateString()
  expectedDate!: string;

  @IsString()
  @IsOptional()
  purpose?: string;

  @IsString()
  @IsOptional()
  lineStatus?: string = 'Open';

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isClosed?: boolean = false;
}
