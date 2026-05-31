import { IsNotEmpty, IsString } from 'class-validator';

export class PrDetailDto {
  @IsString()
  @IsNotEmpty()
  itemCode!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  quantity!: number;

  @IsString()
  @IsNotEmpty()
  unitOfMeasure!: string;
}
