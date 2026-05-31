import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OutboxMessageOrmEntity, OutboxStatus } from '../../../shared/infrastructure/orm-entities/outbox-message.orm-entity';
import { OutboxRepository } from '../../../shared/infrastructure/repositories/outbox.repository';
import { CreatePurchaseRequestFromMrDto } from '../dtos/create-purchase-request-from-mr.dto';
import { PurchaseRequestCreatedIntegrationEvent } from '../integration-events/purchase-request-created.integration-event';
import { PurchaseRequestApprovedIntegrationEvent } from '../integration-events/purchase-request-approved.integration-event';
import { PurchaseRequest } from '../../domain/aggregates/pr-header.aggregate';
import { PrDetail } from '../../domain/entities/pr-detail.entity';
import { PurchaseRequestRepository } from '../../domain/repositories/pr.repository';

@Injectable()
export class PurchaseRequestApplicationService {
  constructor(
    @Inject('PurchaseRequestRepository')
    private readonly repository: PurchaseRequestRepository,
    @Inject('OutboxRepository')
    private readonly outboxRepository: OutboxRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async createFromApprovedMr(dto: CreatePurchaseRequestFromMrDto): Promise<PurchaseRequest> {
    const items = dto.items.map((item) => new PrDetail(item.itemCode, item.description, item.quantity, item.unitOfMeasure));
    const pr = PurchaseRequest.createFromApprovedMr(dto.mrId, dto.mrNumber, dto.requestedBy, items);
    await this.repository.save(pr);
    await this.enqueueIntegrationEvent(
      new PurchaseRequestCreatedIntegrationEvent({
        prId: pr.id.value,
        mrId: dto.mrId,
        mrNumber: dto.mrNumber,
        requestedBy: dto.requestedBy,
      }),
    );
    await this.publishDomainEvents(pr);
    return pr;
  }

  public async approve(prId: string): Promise<PurchaseRequest> {
    const pr = await this.loadOrFail(prId);
    pr.approve();
    await this.repository.save(pr);
    await this.enqueueIntegrationEvent(
      new PurchaseRequestApprovedIntegrationEvent({
        prId: pr.id.value,
        mrId: pr.mrId,
        mrNumber: pr.mrNumber,
      }),
    );
    await this.publishDomainEvents(pr);
    return pr;
  }

  public async reject(prId: string, reason: string): Promise<PurchaseRequest> {
    const pr = await this.loadOrFail(prId);
    pr.reject(reason);
    await this.repository.save(pr);
    await this.publishDomainEvents(pr);
    return pr;
  }

  public async cancel(prId: string, reason: string): Promise<PurchaseRequest> {
    const pr = await this.loadOrFail(prId);
    pr.cancel(reason);
    await this.repository.save(pr);
    await this.publishDomainEvents(pr);
    return pr;
  }

  public async getById(prId: string): Promise<PurchaseRequest> {
    return this.loadOrFail(prId);
  }

  private async loadOrFail(prId: string): Promise<PurchaseRequest> {
    const pr = await this.repository.findById(prId);
    if (!pr) {
      throw new Error(`Purchase request ${prId} not found`);
    }
    return pr;
  }

  private async publishDomainEvents(pr: PurchaseRequest): Promise<void> {
    const events = pr.pullDomainEvents();
    for (const event of events) {
      await this.eventEmitter.emitAsync(event.eventName(), event);
    }
  }

  private async enqueueIntegrationEvent(event: PurchaseRequestCreatedIntegrationEvent | PurchaseRequestApprovedIntegrationEvent): Promise<void> {
    const message = new OutboxMessageOrmEntity();
    message.aggregateId = event.payload.prId;
    message.eventType = event.eventName();
    message.payload = JSON.stringify({
      eventId: event.eventId,
      occurredAt: event.occurredAt.toISOString(),
      correlationId: event.correlationId.value,
      payload: event.payload,
    });
    message.status = OutboxStatus.PENDING;
    message.correlationId = event.correlationId.value;
    await this.outboxRepository.saveMessage(message);
  }
}
