import { Injectable } from '@nestjs/common';
import { MaterialRequisitionApplicationService } from '../services/material-requisition.application.service';
import { MaterialRequisitionPresenter } from '../presenters/mr.presenter';
import { MaterialRequisitionMapper } from '../mappers/mr.mapper';

@Injectable()
export class SubmitMaterialRequisitionUseCase {
  constructor(private readonly service: MaterialRequisitionApplicationService) {}

  public async execute(requisitionId: string): Promise<MaterialRequisitionPresenter> {
    const mr = await this.service.submit(requisitionId);
    return MaterialRequisitionMapper.toPresenter(mr);
  }
}
