import { Injectable } from '@nestjs/common';
import { CreateMaterialRequisitionDto } from '../dtos/create-material-requisition.dto';
import { ApproveMaterialRequisitionUseCase } from '../usecases/approve-material-requisition.usecase';
import { CreateMaterialRequisitionUseCase } from '../usecases/create-material-requisition.usecase';
import { SubmitMaterialRequisitionUseCase } from '../usecases/submit-material-requisition.usecase';
import { MaterialRequisitionPresenter } from '../presenters/mr.presenter';

@Injectable()
export class MaterialRequisitionFacade {
  constructor(
    private readonly createUseCase: CreateMaterialRequisitionUseCase,
    private readonly submitUseCase: SubmitMaterialRequisitionUseCase,
    private readonly approveUseCase: ApproveMaterialRequisitionUseCase,
  ) {}

  public async create(dto: CreateMaterialRequisitionDto): Promise<MaterialRequisitionPresenter> {
    return this.createUseCase.execute(dto);
  }

  public async submit(requisitionId: string): Promise<MaterialRequisitionPresenter> {
    return this.submitUseCase.execute(requisitionId);
  }

  public async approve(requisitionId: string, approvedBy: string): Promise<MaterialRequisitionPresenter> {
    return this.approveUseCase.execute(requisitionId, approvedBy);
  }
}
