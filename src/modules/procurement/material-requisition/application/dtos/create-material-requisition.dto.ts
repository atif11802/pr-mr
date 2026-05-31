import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class MrItemDto {
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

export class CreateMaterialRequisitionDto {
  @IsString()
  @IsNotEmpty()
  department!: string;

  @IsString()
  @IsNotEmpty()
  requestedBy!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MrItemDto)
  items!: MrItemDto[];
}
