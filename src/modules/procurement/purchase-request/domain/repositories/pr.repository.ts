import { PurchaseRequest } from '../aggregates/pr-header.aggregate';

export interface PurchaseRequestRepository {
  save(purchaseRequest: PurchaseRequest): Promise<void>;
  findById(id: string): Promise<PurchaseRequest | null>;
}
