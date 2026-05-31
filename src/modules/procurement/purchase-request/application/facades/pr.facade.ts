import { Injectable } from '@nestjs/common';
import { ApprovePurchaseRequestUseCase } from '../usecases/approve-purchase-request.usecase';
import { CreatePurchaseRequestFromMrUseCase } from '../usecases/create-purchase-request-from-mr.usecase';
import { GetPurchaseRequestUseCase } from '../usecases/get-purchase-request.usecase';
import { RejectPurchaseRequestUseCase } from '../usecases/reject-purchase-request.usecase';
import { CancelPurchaseRequestUseCase } from '../usecases/cancel-purchase-request.usecase';
import { CreatePurchaseRequestFromMrDto } from '../dtos/create-purchase-request-from-mr.dto';
import { PurchaseRequestPresenter } from '../presenters/pr.presenter';

@Injectable()
export class PurchaseRequestFacade {
  constructor(
    private readonly createFromMrUseCase: CreatePurchaseRequestFromMrUseCase,
    private readonly approveUseCase: ApprovePurchaseRequestUseCase,
    private readonly rejectUseCase: RejectPurchaseRequestUseCase,
    private readonly cancelUseCase: CancelPurchaseRequestUseCase,
    private readonly getUseCase: GetPurchaseRequestUseCase,
  ) {}

  public async createFromApprovedMr(dto: CreatePurchaseRequestFromMrDto): Promise<PurchaseRequestPresenter> {
    return this.createFromMrUseCase.execute(dto);
  }

  public async approve(prId: string): Promise<PurchaseRequestPresenter> {
    return this.approveUseCase.execute(prId);
  }

  public async reject(prId: string, reason: string): Promise<PurchaseRequestPresenter> {
    return this.rejectUseCase.execute(prId, reason);
  }

  public async cancel(prId: string, reason: string): Promise<PurchaseRequestPresenter> {
    return this.cancelUseCase.execute(prId, reason);
  }

  public async getById(prId: string): Promise<PurchaseRequestPresenter> {
    return this.getUseCase.execute(prId);
  }
}
