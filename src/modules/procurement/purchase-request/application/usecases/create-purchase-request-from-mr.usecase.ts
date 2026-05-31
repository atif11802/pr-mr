import { Injectable } from '@nestjs/common';
import { CreatePurchaseRequestFromMrDto } from '../dtos/create-purchase-request-from-mr.dto';
import { PurchaseRequestApplicationService } from '../services/purchase-request.application.service';
import { PurchaseRequestMapper } from '../mappers/pr.mapper';
import { PurchaseRequestPresenter } from '../presenters/pr.presenter';

@Injectable()
export class CreatePurchaseRequestFromMrUseCase {
  constructor(private readonly service: PurchaseRequestApplicationService) {}

  public async execute(dto: CreatePurchaseRequestFromMrDto): Promise<PurchaseRequestPresenter> {
    const pr = await this.service.createFromApprovedMr(dto);
    return PurchaseRequestMapper.toPresenter(pr);
  }
}
