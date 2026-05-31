export enum PrStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export class PrStatusVo {
  private constructor(public readonly value: PrStatus) {}

  public static create(status: PrStatus): PrStatusVo {
    return new PrStatusVo(status);
  }

  public isPending(): boolean {
    return this.value === PrStatus.PENDING;
  }

  public isFinal(): boolean {
    return this.value === PrStatus.APPROVED || this.value === PrStatus.REJECTED || this.value === PrStatus.CANCELLED;
  }
}
