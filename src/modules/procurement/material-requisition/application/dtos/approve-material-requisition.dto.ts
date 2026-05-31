import { IsString } from 'class-validator';

export class ApproveMaterialRequisitionDto {
  @IsString()
  requisitionId!: string;

  @IsString()
  approvedBy!: string;
}
