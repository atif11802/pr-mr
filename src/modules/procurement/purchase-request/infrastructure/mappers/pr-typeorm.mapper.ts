import { PrDetailOrmEntity } from '../orm-entities/pr-detail.orm-entity';
import { PrHeaderOrmEntity } from '../orm-entities/pr-header.orm-entity';
import { PurchaseRequest } from '../../domain/aggregates/pr-header.aggregate';
import { PrDetail } from '../../domain/entities/pr-detail.entity';
import { PrId } from '../../domain/value-objects/pr-id.vo';
import { PrStatusVo, PrStatus } from '../../domain/value-objects/pr-status.vo';

export class PurchaseRequestTypeOrmMapper {
  public static toOrm(aggregate: PurchaseRequest): PrHeaderOrmEntity {
    const entity = new PrHeaderOrmEntity();
    entity.id = aggregate.id.value;
    entity.mrId = aggregate.mrId;
    entity.mrNumber = aggregate.mrNumber;
    entity.requestedBy = aggregate.requestedBy;
    entity.status = aggregate.status.value;
    entity.version = aggregate.version;
    entity.approvedAt = aggregate.approvedAt;
    entity.rejectedAt = aggregate.rejectedAt;
    entity.rejectionReason = aggregate.rejectionReason;
    entity.cancelledAt = aggregate.cancelledAt;
    entity.cancellationReason = aggregate.cancellationReason;
    entity.details = aggregate.items.map((item) => {
      const detailEntity = new PrDetailOrmEntity();
      detailEntity.itemCode = item.itemCode;
      detailEntity.description = item.description;
      detailEntity.quantity = item.quantity;
      detailEntity.unitOfMeasure = item.unitOfMeasure;
      detailEntity.purchaseRequest = entity;
      return detailEntity;
    });
    return entity;
  }

  public static toDomain(entity: PrHeaderOrmEntity): PurchaseRequest {
    const items = entity.details.map(
      (detail) => new PrDetail(detail.itemCode, detail.description, detail.quantity, detail.unitOfMeasure),
    );

    return PurchaseRequest.reconstitute(
      PrId.create(entity.id),
      entity.mrId,
      entity.mrNumber,
      entity.requestedBy,
      items,
      PrStatusVo.create(entity.status as PrStatus),
      entity.createdAt,
      entity.version,
      entity.approvedAt ?? undefined,
      entity.rejectedAt ?? undefined,
      entity.rejectionReason,
      entity.cancelledAt ?? undefined,
      entity.cancellationReason,
    );
  }
}
