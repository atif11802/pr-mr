export class MaterialRequisitionPresenter {
  constructor(
    public readonly id: string,
    public readonly mrNumber: string,
    public readonly department: string,
    public readonly requestedBy: string,
    public readonly status: string,
    public readonly items: Array<{ itemCode: string; description: string; quantity: number; unitOfMeasure: string }>,
    public readonly createdAt: Date,
    public readonly submittedAt?: Date,
    public readonly approvedAt?: Date,
    public readonly rejectedAt?: Date,
    public readonly version?: number,
  ) {}
}
