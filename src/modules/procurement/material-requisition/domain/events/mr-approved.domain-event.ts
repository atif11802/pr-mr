import { DomainEvent } from './domain-event';

export interface MrApprovedLineItem {
  itemCode: string;
  description: string;
  quantity: number;
  unitOfMeasure: string;
}

export class MrApprovedDomainEvent implements DomainEvent {
  public readonly occurredAt: Date;

  constructor(
    public readonly mrId: string,
    public readonly mrNumber: string,
    public readonly approvedBy: string,
    public readonly requestedBy: string,
    public readonly approvedAt: Date,
    public readonly items: MrApprovedLineItem[],
  ) {
    this.occurredAt = new Date();
  }

  eventName(): string {
    return MrApprovedDomainEvent.name;
  }
}
