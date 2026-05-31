import { DomainEvent } from './domain-event';

export class PrCreatedDomainEvent implements DomainEvent {
  public readonly occurredAt: Date;

  constructor(public readonly prId: string, public readonly mrId: string, public readonly mrNumber: string) {
    this.occurredAt = new Date();
  }

  eventName(): string {
    return PrCreatedDomainEvent.name;
  }
}
