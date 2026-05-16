import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePrLineDto {
  @IsNumber()
  @Type(() => Number)
  itemId!: number;

  @IsNumber()
  @Type(() => Number)
  uomId!: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  requestQty!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  rfqQty?: number = 0;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  poQty?: number = 0;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  remainingPoQty?: number = 0;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  estimatedPrice?: number = 0;

  @IsOptional()
  @IsString()
  lineStatus?: string = 'Open';
}
