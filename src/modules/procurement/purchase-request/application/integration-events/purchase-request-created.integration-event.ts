import { IntegrationEvent } from '../../../shared/domain/integration-event';

export class PurchaseRequestCreatedIntegrationEvent extends IntegrationEvent<{ prId: string; mrId: string; mrNumber: string; requestedBy: string }> {
  constructor(payload: { prId: string; mrId: string; mrNumber: string; requestedBy: string }) {
    super(payload);
  }

  public eventName(): string {
    return 'purchase_request.created';
  }
}
