import { MrDetailOrmEntity } from '../orm-entities/mr-detail.orm-entity';
import { MrHeaderOrmEntity } from '../orm-entities/mr-header.orm-entity';
import { MaterialRequisition } from '../../domain/aggregates/mr-header.aggregate';
import { MrDetail } from '../../domain/entities/mr-detail.entity';
import { Department } from '../../domain/value-objects/department.vo';
import { MrId } from '../../domain/value-objects/mr-id.vo';
import { MrStatusVo, MrStatus } from '../../domain/value-objects/mr-status.vo';

export class MaterialRequisitionTypeOrmMapper {
  public static toOrm(aggregate: MaterialRequisition): MrHeaderOrmEntity {
    const entity = new MrHeaderOrmEntity();
    entity.id = aggregate.id.value;
    entity.mrNumber = aggregate.mrNumber;
    entity.department = aggregate.department.value;
    entity.requestedBy = aggregate.requestedBy;
    entity.status = aggregate.status.value;
    entity.version = aggregate.version;
    entity.submittedAt = aggregate.submittedAt;
    entity.approvedAt = aggregate.approvedAt;
    entity.rejectedAt = aggregate.rejectedAt;
    entity.details = aggregate.items.map((item) => {
      const detailEntity = new MrDetailOrmEntity();
      detailEntity.itemCode = item.itemCode;
      detailEntity.description = item.description;
      detailEntity.quantity = item.quantity;
      detailEntity.unitOfMeasure = item.unitOfMeasure;
      detailEntity.requisition = entity;
      return detailEntity;
    });
    return entity;
  }

  public static toDomain(entity: MrHeaderOrmEntity): MaterialRequisition {
    const items = entity.details.map(
      (detail) => new MrDetail(detail.itemCode, detail.description, detail.quantity, detail.unitOfMeasure),
    );

    return MaterialRequisition.reconstitute(
      MrId.create(entity.id),
      entity.mrNumber,
      Department.create(entity.department),
      entity.requestedBy,
      items,
      MrStatusVo.create(entity.status as MrStatus),
      entity.createdAt,
      entity.version,
      entity.submittedAt ?? undefined,
      entity.approvedAt ?? undefined,
      entity.rejectedAt ?? undefined,
    );
  }
}
