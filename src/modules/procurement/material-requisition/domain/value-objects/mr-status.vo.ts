export enum MrStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CONVERTED_TO_PR = 'CONVERTED_TO_PR',
}

export class MrStatusVo {
  private constructor(public readonly value: MrStatus) {}

  public static create(status: MrStatus): MrStatusVo {
    return new MrStatusVo(status);
  }

  public isDraft(): boolean {
    return this.value === MrStatus.DRAFT;
  }

  public isSubmitted(): boolean {
    return this.value === MrStatus.SUBMITTED;
  }

  public isApproved(): boolean {
    return this.value === MrStatus.APPROVED || this.value === MrStatus.CONVERTED_TO_PR;
  }

  public isRejected(): boolean {
    return this.value === MrStatus.REJECTED;
  }
}
