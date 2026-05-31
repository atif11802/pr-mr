import { PrDetailDto } from './pr-detail.dto';

export class CreatePurchaseRequestFromMrDto {
  mrId!: string;
  mrNumber!: string;
  requestedBy!: string;
  items!: PrDetailDto[];
}
