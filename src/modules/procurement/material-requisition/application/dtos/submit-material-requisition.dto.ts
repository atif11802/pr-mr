import { IsString } from 'class-validator';

export class SubmitMaterialRequisitionDto {
  @IsString()
  requisitionId!: string;
}
