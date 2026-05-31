import { Injectable } from '@nestjs/common';
import { MaterialRequisitionApplicationService } from '../services/material-requisition.application.service';
import { MaterialRequisitionPresenter } from '../presenters/mr.presenter';
import { MaterialRequisitionMapper } from '../mappers/mr.mapper';

@Injectable()
export class ApproveMaterialRequisitionUseCase {
  constructor(private readonly service: MaterialRequisitionApplicationService) {}

  public async execute(requisitionId: string, approvedBy: string): Promise<MaterialRequisitionPresenter> {
    const mr = await this.service.approve(requisitionId, approvedBy);
    return MaterialRequisitionMapper.toPresenter(mr);
  }
}
