import { PrCreatedDomainEvent } from '../events/pr-created.domain-event';
import { DomainEvent } from '../events/domain-event';
import { PrId } from '../value-objects/pr-id.vo';
import { PrStatusVo, PrStatus } from '../value-objects/pr-status.vo';
import { PrDetail } from '../entities/pr-detail.entity';
import { PrBusinessException } from '../exceptions/pr-business.exception';

export class PurchaseRequest {
  private readonly domainEvents: DomainEvent[] = [];

  private constructor(
    public readonly id: PrId,
    public readonly mrId: string,
    public readonly mrNumber: string,
    public readonly requestedBy: string,
    public readonly items: PrDetail[],
    public status: PrStatusVo,
    public readonly createdAt: Date,
    public version: number,
    public approvedAt?: Date,
    public rejectedAt?: Date,
    public rejectionReason?: string,
    public cancelledAt?: Date,
    public cancellationReason?: string,
  ) {}

  public static createFromApprovedMr(
    mrId: string,
    mrNumber: string,
    requestedBy: string,
    items: PrDetail[],
  ): PurchaseRequest {
    if (items.length === 0) {
      throw new PrBusinessException('Purchase request must contain at least one line item');
    }

    const pr = new PurchaseRequest(
      PrId.create(),
      mrId,
      mrNumber,
      requestedBy,
      items,
      PrStatusVo.create(PrStatus.PENDING),
      new Date(),
      0,
    );
    pr.raiseEvent(new PrCreatedDomainEvent(pr.id.value, mrId, mrNumber));
    return pr;
  }

  public approve(): void {
    if (!this.status.isPending()) {
      throw new PrBusinessException('Only pending PR can be approved');
    }

    this.status = PrStatusVo.create(PrStatus.APPROVED);
    this.approvedAt = new Date();
  }

  public reject(reason: string): void {
    if (!this.status.isPending()) {
      throw new PrBusinessException('Only pending PR can be rejected');
    }

    this.status = PrStatusVo.create(PrStatus.REJECTED);
    this.rejectedAt = new Date();
    this.rejectionReason = reason;
  }

  public cancel(reason: string): void {
    if (!this.status.isPending()) {
      throw new PrBusinessException('Only pending PR can be cancelled');
    }

    this.status = PrStatusVo.create(PrStatus.CANCELLED);
    this.cancelledAt = new Date();
    this.cancellationReason = reason;
  }

  private raiseEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  public pullDomainEvents(): DomainEvent[] {
    const events = [...this.domainEvents];
    this.domainEvents.splice(0, this.domainEvents.length);
    return events;
  }

  public static reconstitute(
    id: PrId,
    mrId: string,
    mrNumber: string,
    requestedBy: string,
    items: PrDetail[],
    status: PrStatusVo,
    createdAt: Date,
    version: number,
    approvedAt?: Date,
    rejectedAt?: Date,
    rejectionReason?: string,
    cancelledAt?: Date,
    cancellationReason?: string,
  ): PurchaseRequest {
    return new PurchaseRequest(
      id,
      mrId,
      mrNumber,
      requestedBy,
      items,
      status,
      createdAt,
      version,
      approvedAt,
      rejectedAt,
      rejectionReason,
      cancelledAt,
      cancellationReason,
    );
  }
}
