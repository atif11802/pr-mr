import { IsString } from 'class-validator';

export class RejectPurchaseRequestDto {
  @IsString()
  reason!: string;
}
