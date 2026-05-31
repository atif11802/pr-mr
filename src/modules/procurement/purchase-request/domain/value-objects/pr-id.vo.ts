import { randomUUID } from 'crypto';

export class PrId {
  private constructor(public readonly value: string) {
    if (!value) {
      throw new Error('Purchase Request ID cannot be empty');
    }
  }

  public static create(value?: string): PrId {
    return new PrId(value ?? randomUUID());
  }
}
