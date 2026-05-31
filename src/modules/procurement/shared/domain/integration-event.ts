import { CorrelationId } from './correlation-id.vo';

export abstract class IntegrationEvent<T = unknown> {
  public readonly eventId: string;
  public readonly occurredAt: Date;
  public readonly correlationId: CorrelationId;

  protected constructor(public readonly payload: T, correlationId?: CorrelationId) {
    this.eventId = CorrelationId.create().value;
    this.occurredAt = new Date();
    this.correlationId = correlationId ?? CorrelationId.create();
  }

  public abstract eventName(): string;
}
