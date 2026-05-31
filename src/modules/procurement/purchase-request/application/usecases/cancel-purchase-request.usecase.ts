import { Injectable } from '@nestjs/common';
import { PurchaseRequestApplicationService } from '../services/purchase-request.application.service';
import { PurchaseRequestMapper } from '../mappers/pr.mapper';
import { PurchaseRequestPresenter } from '../presenters/pr.presenter';

@Injectable()
export class CancelPurchaseRequestUseCase {
  constructor(private readonly service: PurchaseRequestApplicationService) {}

  public async execute(prId: string, reason: string): Promise<PurchaseRequestPresenter> {
    const pr = await this.service.cancel(prId, reason);
    return PurchaseRequestMapper.toPresenter(pr);
  }
}
