import { CreateMaterialRequisitionDto } from '../dtos/create-material-requisition.dto';

export class CreateMaterialRequisitionCommand {
  constructor(public readonly payload: CreateMaterialRequisitionDto) {}
}
