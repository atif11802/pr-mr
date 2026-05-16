import { MaterialRequisitionLine } from './material-requisition-line.entity';

export class MaterialRequisition {
  constructor(
    public mrNo: string,
    public mrDate: Date,
    public requestByEmpId: number,
    public departmentId: number,
    public projectId: number | null,
    public warehouseId: number,
    public priority: string,
    public status: string,
    public remarks: string | null,
    public approvalStatus: string,
    public approvedBy: number | null,
    public approvedDate: Date | null,
    public companyId: number,
    public createdBy: number,
    public details: MaterialRequisitionLine[] = [],
    public mrId?: number,
  ) {}

  addLine(line: MaterialRequisitionLine) {
    this.details.push(line);
  }
}
