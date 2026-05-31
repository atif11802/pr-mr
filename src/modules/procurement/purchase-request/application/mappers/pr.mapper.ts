import { PurchaseRequest } from '../../domain/aggregates/pr-header.aggregate';
import { PurchaseRequestPresenter } from '../presenters/pr.presenter';

export class PurchaseRequestMapper {
  public static toPresenter(pr: PurchaseRequest): PurchaseRequestPresenter {
    return new PurchaseRequestPresenter(
      pr.id.value,
      pr.mrId,
      pr.mrNumber,
      pr.requestedBy,
      pr.status.value,
      pr.items.map((item) => ({
        itemCode: item.itemCode,
        description: item.description,
        quantity: item.quantity,
        unitOfMeasure: item.unitOfMeasure,
      })),
      pr.createdAt,
      pr.approvedAt,
      pr.rejectedAt,
      pr.rejectionReason,
      pr.cancelledAt,
      pr.cancellationReason,
      pr.version,
    );
  }
}
