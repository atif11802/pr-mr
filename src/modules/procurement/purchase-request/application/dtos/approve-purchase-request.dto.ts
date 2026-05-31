import { IsString } from 'class-validator';

export class ApprovePurchaseRequestDto {
  @IsString()
  approvedBy!: string;
}
