import { Body, Controller, Param, Post } from '@nestjs/common';
import { MaterialRequisitionFacade } from '../application/facades/mr.facade';
import { ApproveMaterialRequisitionDto } from '../application/dtos/approve-material-requisition.dto';
import { CreateMaterialRequisitionDto } from '../application/dtos/create-material-requisition.dto';

@Controller('api/procurement/mr')
export class MaterialRequisitionController {
  constructor(private readonly facade: MaterialRequisitionFacade) {}

  @Post()
  public async create(@Body() dto: CreateMaterialRequisitionDto) {
    return this.facade.create(dto);
  }

  @Post(':id/submit')
  public async submit(@Param('id') id: string) {
    return this.facade.submit(id);
  }

  @Post(':id/approve')
  public async approve(@Param('id') id: string, @Body() dto: ApproveMaterialRequisitionDto) {
    return this.facade.approve(id, dto.approvedBy);
  }
}
