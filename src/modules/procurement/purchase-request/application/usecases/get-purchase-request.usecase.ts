import { Injectable } from '@nestjs/common';
import { PurchaseRequestApplicationService } from '../services/purchase-request.application.service';
import { PurchaseRequestMapper } from '../mappers/pr.mapper';
import { PurchaseRequestPresenter } from '../presenters/pr.presenter';

@Injectable()
export class GetPurchaseRequestUseCase {
  constructor(private readonly service: PurchaseRequestApplicationService) {}

  public async execute(prId: string): Promise<PurchaseRequestPresenter> {
    const pr = await this.service.getById(prId);
    return PurchaseRequestMapper.toPresenter(pr);
  }
}
