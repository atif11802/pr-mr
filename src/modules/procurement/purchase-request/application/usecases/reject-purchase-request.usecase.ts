import { Injectable } from '@nestjs/common';
import { ApprovePurchaseRequestUseCase } from './approve-purchase-request.usecase';
import { PurchaseRequestApplicationService } from '../services/purchase-request.application.service';
import { PurchaseRequestMapper } from '../mappers/pr.mapper';
import { PurchaseRequestPresenter } from '../presenters/pr.presenter';

@Injectable()
export class RejectPurchaseRequestUseCase {
  constructor(private readonly service: PurchaseRequestApplicationService) {}

  public async execute(prId: string, reason: string): Promise<PurchaseRequestPresenter> {
    const pr = await this.service.reject(prId, reason);
    return PurchaseRequestMapper.toPresenter(pr);
  }
}
