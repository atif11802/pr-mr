import { IntegrationEvent } from '../../../shared/domain/integration-event';

export class PurchaseRequestApprovedIntegrationEvent extends IntegrationEvent<{ prId: string; mrId: string; mrNumber: string }> {
  constructor(payload: { prId: string; mrId: string; mrNumber: string }) {
    super(payload);
  }

  public eventName(): string {
    return 'purchase_request.approved';
  }
}
