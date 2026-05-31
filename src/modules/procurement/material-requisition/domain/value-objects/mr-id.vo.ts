import { randomUUID } from 'crypto';

export class MrId {
  private constructor(public readonly value: string) {
    if (!value) {
      throw new Error('Material Requisition ID cannot be empty');
    }
  }

  public static create(value?: string): MrId {
    return new MrId(value ?? randomUUID());
  }
}
