export class PurchaseRequestLine {
  constructor(
    public itemId: number,
    public uomId: number,
    public requestQty: number,
    public rfqQty: number,
    public poQty: number,
    public remainingPoQty: number,
    public estimatedPrice: number,
    public lineStatus: string,
    public prDetailId?: number,
  ) {}

  updateRemainingPoQty() {
    this.remainingPoQty = Math.max(0, this.requestQty - this.poQty);
    if (this.remainingPoQty <= 0) {
      this.lineStatus = 'Closed';
    }
  }
}
