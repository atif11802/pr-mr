import { randomUUID } from 'crypto';

export class CorrelationId {
  private constructor(public readonly value: string) {
    if (!value) {
      throw new Error('CorrelationId cannot be empty');
    }
  }

  public static create(value?: string): CorrelationId {
    return new CorrelationId(value ?? randomUUID());
  }
}
