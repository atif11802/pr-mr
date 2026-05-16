import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePrMappingDto {
  @IsNumber()
  @Type(() => Number)
  mrDetailId!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  prDetailId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  prLineIndex?: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  mappedQty!: number;
}
