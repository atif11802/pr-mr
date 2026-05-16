import { MrPrMapping } from './mr-pr-mapping.entity';
import { PurchaseRequestLine } from './purchase-request-line.entity';

export class PurchaseRequest {
  constructor(
    public prNo: string,
    public prDate: Date,
    public buyerId: number,
    public supplierId: number | null,
    public status: string,
    public remarks: string | null,
    public approvalStatus: string,
    public approvedBy: number | null,
    public approvedDate: Date | null,
    public companyId: number,
    public createdBy: number,
    public lines: PurchaseRequestLine[] = [],
    public mappings: MrPrMapping[] = [],
    public prId?: number,
  ) {}

  addLine(line: PurchaseRequestLine) {
    this.lines.push(line);
  }

  addMapping(mapping: MrPrMapping) {
    this.mappings.push(mapping);
  }
}
