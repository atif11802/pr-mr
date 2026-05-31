import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MrApprovedDomainEvent } from '../../domain/events/mr-approved.domain-event';
import { PurchaseRequestFacade } from '../../../purchase-request/application/facades/pr.facade';

@Injectable()
export class MrApprovedEventHandler {
  private readonly logger = new Logger(MrApprovedEventHandler.name);

  constructor(private readonly purchaseRequestFacade: PurchaseRequestFacade) {}

  @OnEvent(MrApprovedDomainEvent.name)
  public async handle(event: MrApprovedDomainEvent): Promise<void> {
    this.logger.log(`MR approved event received for ${event.mrId}, creating PR`);

    await this.purchaseRequestFacade.createFromApprovedMr({
      mrId: event.mrId,
      mrNumber: event.mrNumber,
      requestedBy: event.requestedBy,
      items: event.items,
    });
  }
}
