export class PurchaseRequestPresenter {
  constructor(
    public readonly id: string,
    public readonly mrId: string,
    public readonly mrNumber: string,
    public readonly requestedBy: string,
    public readonly status: string,
    public readonly items: Array<{ itemCode: string; description: string; quantity: number; unitOfMeasure: string }>,
    public readonly createdAt: Date,
    public readonly approvedAt?: Date,
    public readonly rejectedAt?: Date,
    public readonly rejectionReason?: string,
    public readonly cancelledAt?: Date,
    public readonly cancellationReason?: string,
    public readonly version?: number,
  ) {}
}
