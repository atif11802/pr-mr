import { Injectable, Logger, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrCreatedDomainEvent } from '../../../purchase-request/domain/events/pr-created.domain-event';
import { MaterialRequisitionRepository } from '../../domain/repositories/mr.repository';

@Injectable()
export class PrCreatedEventHandler {
  private readonly logger = new Logger(PrCreatedEventHandler.name);

  constructor(
    @Inject('MaterialRequisitionRepository')
    private readonly repository: MaterialRequisitionRepository,
  ) {}

  @OnEvent(PrCreatedDomainEvent.name)
  public async handle(event: PrCreatedDomainEvent): Promise<void> {
    this.logger.log(`PR created event received for PR ${event.prId}, converting MR ${event.mrId}`);

    const mr = await this.repository.findById(event.mrId);
    if (!mr) {
      this.logger.error(`Material requisition ${event.mrId} not found while converting to PR`);
      return;
    }

    if (!mr.status.isApproved()) {
      this.logger.warn(`MR ${event.mrId} is not approved and cannot be converted to PR`);
      return;
    }

    mr.markConvertedToPr();
    await this.repository.save(mr);
  }
}
