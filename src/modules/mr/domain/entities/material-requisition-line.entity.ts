export class MaterialRequisitionLine {
  constructor(
    public itemId: number,
    public uomId: number,
    public requiredQty: number,
    public approvedQty: number,
    public prCreatedQty: number,
    public remainingPrQty: number,
    public stockQty: number,
    public expectedDate: Date,
    public purpose: string,
    public lineStatus: string,
    public isClosed: boolean,
    public mrDetailId?: number,
  ) {}

  registerMappedQuantity(mappedQty: number) {
    this.prCreatedQty += mappedQty;
    this.remainingPrQty = Math.max(0, this.requiredQty - this.prCreatedQty);
    if (this.remainingPrQty <= 0) {
      this.isClosed = true;
      this.lineStatus = 'Closed';
    }
  }
}
