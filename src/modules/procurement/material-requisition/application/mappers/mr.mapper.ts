import { MaterialRequisition } from '../../domain/aggregates/mr-header.aggregate';
import { MaterialRequisitionPresenter } from '../presenters/mr.presenter';

export class MaterialRequisitionMapper {
  public static toPresenter(aggregate: MaterialRequisition): MaterialRequisitionPresenter {
    return new MaterialRequisitionPresenter(
      aggregate.id.value,
      aggregate.mrNumber,
      aggregate.department.value,
      aggregate.requestedBy,
      aggregate.status.value,
      aggregate.items.map((item) => ({
        itemCode: item.itemCode,
        description: item.description,
        quantity: item.quantity,
        unitOfMeasure: item.unitOfMeasure,
      })),
      aggregate.createdAt,
      aggregate.submittedAt,
      aggregate.approvedAt,
      aggregate.rejectedAt,
      aggregate.version,
    );
  }
}
