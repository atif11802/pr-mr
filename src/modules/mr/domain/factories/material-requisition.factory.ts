import { CreateMrDto } from '../../dto/create-mr.dto';
import { MaterialRequisition } from '../entities/material-requisition.entity';
import { MaterialRequisitionLine } from '../entities/material-requisition-line.entity';

export class MaterialRequisitionFactory {
  static createFromDto(createMrDto: CreateMrDto): MaterialRequisition {
    const mr = new MaterialRequisition(
      createMrDto.mrNo,
      new Date(createMrDto.mrDate),
      createMrDto.requestByEmpId,
      createMrDto.departmentId,
      createMrDto.projectId ?? null,
      createMrDto.warehouseId,
      createMrDto.priority,
      createMrDto.status,
      createMrDto.remarks ?? null,
      createMrDto.approvalStatus,
      createMrDto.approvedBy ?? null,
      createMrDto.approvedDate ? new Date(createMrDto.approvedDate) : null,
      createMrDto.companyId,
      createMrDto.createdBy,
    );

    createMrDto.lines.forEach((lineDto) => {
      const line = new MaterialRequisitionLine(
        lineDto.itemId,
        lineDto.uomId,
        lineDto.requiredQty,
        lineDto.approvedQty ?? 0,
        lineDto.prCreatedQty ?? 0,
        lineDto.remainingPrQty ?? lineDto.requiredQty,
        lineDto.stockQty ?? 0,
        new Date(lineDto.expectedDate),
        lineDto.purpose ?? '',
        lineDto.lineStatus ?? 'Open',
        lineDto.isClosed ?? false,
      );
      mr.addLine(line);
    });

    return mr;
  }
}
