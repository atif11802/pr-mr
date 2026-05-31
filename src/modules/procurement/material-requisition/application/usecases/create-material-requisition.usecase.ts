import { Injectable } from '@nestjs/common';
import { CreateMaterialRequisitionDto } from '../dtos/create-material-requisition.dto';
import { MaterialRequisitionApplicationService } from '../services/material-requisition.application.service';
import { MaterialRequisitionPresenter } from '../presenters/mr.presenter';
import { MaterialRequisitionMapper } from '../mappers/mr.mapper';

@Injectable()
export class CreateMaterialRequisitionUseCase {
  constructor(private readonly service: MaterialRequisitionApplicationService) {}

  public async execute(dto: CreateMaterialRequisitionDto): Promise<MaterialRequisitionPresenter> {
    const mr = await this.service.createDraft(dto);
    return MaterialRequisitionMapper.toPresenter(mr);
  }
}
