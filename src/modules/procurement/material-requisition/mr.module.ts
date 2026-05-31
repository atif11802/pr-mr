import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseRequestModule } from '../purchase-request/pr.module';
import { ProcurementSharedModule } from '../shared/shared.module';
import { MrHeaderOrmEntity } from './infrastructure/orm-entities/mr-header.orm-entity';
import { MrDetailOrmEntity } from './infrastructure/orm-entities/mr-detail.orm-entity';
import { TypeOrmMaterialRequisitionRepository } from './infrastructure/repositories/mr-typeorm.repository';
import { MaterialRequisitionController } from './presentation/mr.controller';
import { MaterialRequisitionFacade } from './application/facades/mr.facade';
import { CreateMaterialRequisitionUseCase } from './application/usecases/create-material-requisition.usecase';
import { SubmitMaterialRequisitionUseCase } from './application/usecases/submit-material-requisition.usecase';
import { ApproveMaterialRequisitionUseCase } from './application/usecases/approve-material-requisition.usecase';
import { MaterialRequisitionApplicationService } from './application/services/material-requisition.application.service';
import { MrApprovedEventHandler } from './application/event-handlers/mr-approved.event-handler';
import { PrCreatedEventHandler } from './application/event-handlers/pr-created.event-handler';

@Module({
  imports: [TypeOrmModule.forFeature([MrHeaderOrmEntity, MrDetailOrmEntity]), ProcurementSharedModule, PurchaseRequestModule],
  controllers: [MaterialRequisitionController],
  providers: [
    MaterialRequisitionFacade,
    MaterialRequisitionApplicationService,
    CreateMaterialRequisitionUseCase,
    SubmitMaterialRequisitionUseCase,
    ApproveMaterialRequisitionUseCase,
    {
      provide: 'MaterialRequisitionRepository',
      useClass: TypeOrmMaterialRequisitionRepository,
    },
    MrApprovedEventHandler,
    PrCreatedEventHandler,
  ],
  exports: [MaterialRequisitionFacade],
})
export class MaterialRequisitionModule {}
