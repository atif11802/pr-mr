import { CreatePrDto } from '../../dto/create-pr.dto';
import { CreatePrLineDto } from '../../dto/create-pr-line.dto';
import { CreatePrMappingDto } from '../../dto/create-pr-mapping.dto';
import { MrPrMapping } from '../entities/mr-pr-mapping.entity';
import { PurchaseRequest } from '../entities/purchase-request.entity';
import { PurchaseRequestLine } from '../entities/purchase-request-line.entity';

export class PurchaseRequestFactory {
  static createFromDto(createPrDto: CreatePrDto): PurchaseRequest {
    const purchaseRequest = new PurchaseRequest(
      createPrDto.prNo,
      new Date(createPrDto.prDate),
      createPrDto.buyerId,
      createPrDto.supplierId ?? null,
      createPrDto.status,
      createPrDto.remarks ?? null,
      createPrDto.approvalStatus,
      createPrDto.approvedBy ?? null,
      createPrDto.approvedDate ? new Date(createPrDto.approvedDate) : null,
      createPrDto.companyId,
      createPrDto.createdBy,
    );

    createPrDto.lines.forEach((lineDto: CreatePrLineDto) => {
      const line = new PurchaseRequestLine(
        lineDto.itemId,
        lineDto.uomId,
        lineDto.requestQty,
        lineDto.rfqQty ?? 0,
        lineDto.poQty ?? 0,
        lineDto.remainingPoQty ?? Math.max(0, lineDto.requestQty - (lineDto.poQty ?? 0)),
        lineDto.estimatedPrice ?? 0,
        lineDto.lineStatus ?? 'Open',
      );
      line.updateRemainingPoQty();
      purchaseRequest.addLine(line);
    });

    createPrDto.mappings.forEach((mappingDto: CreatePrMappingDto) => {
      purchaseRequest.addMapping(
        new MrPrMapping(mappingDto.mrDetailId, mappingDto.prDetailId ?? null, mappingDto.mappedQty, mappingDto.prLineIndex),
      );
    });

    return purchaseRequest;
  }
}
