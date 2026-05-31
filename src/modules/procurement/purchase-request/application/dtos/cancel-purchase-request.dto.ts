import { IsString } from 'class-validator';

export class CancelPurchaseRequestDto {
  @IsString()
  reason!: string;
}
