import { MrApprovedDomainEvent } from '../events/mr-approved.domain-event';
import { DomainEvent } from '../events/domain-event';
import { Department } from '../value-objects/department.vo';
import { MrId } from '../value-objects/mr-id.vo';
import { MrStatusVo, MrStatus } from '../value-objects/mr-status.vo';
import { MrDetail } from '../entities/mr-detail.entity';
import { MrBusinessException } from '../exceptions/mr-business.exception';

export class MaterialRequisition {
  private readonly domainEvents: DomainEvent[] = [];

  private constructor(
    public readonly id: MrId,
    public readonly department: Department,
    public readonly requestedBy: string,
    public readonly items: MrDetail[],
    public status: MrStatusVo,
    public readonly createdAt: Date,
    public version: number,
    public mrNumber: string,
    public submittedAt?: Date,
    public approvedAt?: Date,
    public rejectedAt?: Date,
  ) {}

  public static createDraft(
    mrNumber: string,
    department: Department,
    requestedBy: string,
    items: MrDetail[],
  ): MaterialRequisition {
    return new MaterialRequisition(
      MrId.create(),
      department,
      requestedBy,
      items,
      MrStatusVo.create(MrStatus.DRAFT),
      new Date(),
      0,
      mrNumber,
    );
  }

  public static reconstitute(
    id: MrId,
    mrNumber: string,
    department: Department,
    requestedBy: string,
    items: MrDetail[],
    status: MrStatusVo,
    createdAt: Date,
    version: number,
    submittedAt?: Date,
    approvedAt?: Date,
    rejectedAt?: Date,
  ): MaterialRequisition {
    return new MaterialRequisition(
      id,
      department,
      requestedBy,
      items,
      status,
      createdAt,
      version,
      mrNumber,
      submittedAt,
      approvedAt,
      rejectedAt,
    );
  }

  public submit(): void {
    if (!this.status.isDraft()) {
      throw new MrBusinessException('Only a draft MR can be submitted');
    }

    if (this.items.length === 0) {
      throw new MrBusinessException('An MR without items cannot be submitted');
    }

    this.status = MrStatusVo.create(MrStatus.SUBMITTED);
    this.submittedAt = new Date();
  }

  public approve(approver: string): void {
    if (!this.status.isSubmitted()) {
      throw new MrBusinessException('Only submitted MR can be approved');
    }

    this.status = MrStatusVo.create(MrStatus.APPROVED);
    this.approvedAt = new Date();
    this.raiseEvent(
      new MrApprovedDomainEvent(
        this.id.value,
        this.mrNumber,
        approver,
        this.requestedBy,
        this.approvedAt,
        this.items.map((detail) => ({
          itemCode: detail.itemCode,
          description: detail.description,
          quantity: detail.quantity,
          unitOfMeasure: detail.unitOfMeasure,
        })),
      ),
    );
  }

  public reject(): void {
    if (!this.status.isSubmitted()) {
      throw new MrBusinessException('Only submitted MR can be rejected');
    }

    this.status = MrStatusVo.create(MrStatus.REJECTED);
    this.rejectedAt = new Date();
  }

  public markConvertedToPr(): void {
    if (!this.status.isApproved()) {
      throw new MrBusinessException('Only approved MR can be converted to a PR');
    }

    this.status = MrStatusVo.create(MrStatus.CONVERTED_TO_PR);
  }

  public addItem(detail: MrDetail): void {
    if (!this.status.isDraft()) {
      throw new MrBusinessException('Items can only be added to draft requisitions');
    }

    this.items.push(detail);
  }

  private raiseEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  public pullDomainEvents(): DomainEvent[] {
    const events = [...this.domainEvents];
    this.domainEvents.splice(0, this.domainEvents.length);
    return events;
  }
}
