import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcurementSharedModule } from '../shared/shared.module';
import { PrHeaderOrmEntity } from './infrastructure/orm-entities/pr-header.orm-entity';
import { PrDetailOrmEntity } from './infrastructure/orm-entities/pr-detail.orm-entity';
import { TypeOrmPurchaseRequestRepository } from './infrastructure/repositories/pr-typeorm.repository';
import { PurchaseRequestController } from './presentation/pr.controller';
import { PurchaseRequestFacade } from './application/facades/pr.facade';
import { PurchaseRequestApplicationService } from './application/services/purchase-request.application.service';
import { CreatePurchaseRequestFromMrUseCase } from './application/usecases/create-purchase-request-from-mr.usecase';
import { ApprovePurchaseRequestUseCase } from './application/usecases/approve-purchase-request.usecase';
import { RejectPurchaseRequestUseCase } from './application/usecases/reject-purchase-request.usecase';
import { CancelPurchaseRequestUseCase } from './application/usecases/cancel-purchase-request.usecase';
import { GetPurchaseRequestUseCase } from './application/usecases/get-purchase-request.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([PrHeaderOrmEntity, PrDetailOrmEntity]), ProcurementSharedModule],
  controllers: [PurchaseRequestController],
  providers: [
    PurchaseRequestFacade,
    PurchaseRequestApplicationService,
    CreatePurchaseRequestFromMrUseCase,
    ApprovePurchaseRequestUseCase,
    RejectPurchaseRequestUseCase,
    CancelPurchaseRequestUseCase,
    GetPurchaseRequestUseCase,
    {
      provide: 'PurchaseRequestRepository',
      useClass: TypeOrmPurchaseRequestRepository,
    },
  ],
  exports: [PurchaseRequestFacade],
})
export class PurchaseRequestModule {}
