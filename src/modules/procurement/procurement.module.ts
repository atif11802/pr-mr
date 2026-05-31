import { Module } from '@nestjs/common';
import { ProcurementSharedModule } from './shared/shared.module';
import { MaterialRequisitionModule } from './material-requisition/mr.module';
import { PurchaseRequestModule } from './purchase-request/pr.module';

@Module({
  imports: [ProcurementSharedModule, MaterialRequisitionModule, PurchaseRequestModule],
  exports: [MaterialRequisitionModule, PurchaseRequestModule],
})
export class ProcurementModule {}
