import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PurchaseRequestFacade } from '../application/facades/pr.facade';
import { ApprovePurchaseRequestDto } from '../application/dtos/approve-purchase-request.dto';
import { RejectPurchaseRequestDto } from '../application/dtos/reject-purchase-request.dto';
import { CancelPurchaseRequestDto } from '../application/dtos/cancel-purchase-request.dto';
import { CreatePurchaseRequestFromMrDto } from '../application/dtos/create-purchase-request-from-mr.dto';

@Controller('api/procurement/pr')
export class PurchaseRequestController {
  constructor(private readonly facade: PurchaseRequestFacade) {}

  @Get(':id')
  public async getById(@Param('id') id: string) {
    return this.facade.getById(id);
  }

  @Post()
  public async create(@Body() dto: CreatePurchaseRequestFromMrDto) {
    return this.facade.createFromApprovedMr(dto);
  }

  @Post(':id/approve')
  public async approve(@Param('id') id: string, @Body() dto: ApprovePurchaseRequestDto) {
    return this.facade.approve(id);
  }

  @Post(':id/reject')
  public async reject(@Param('id') id: string, @Body() dto: RejectPurchaseRequestDto) {
    return this.facade.reject(id, dto.reason);
  }

  @Post(':id/cancel')
  public async cancel(@Param('id') id: string, @Body() dto: CancelPurchaseRequestDto) {
    return this.facade.cancel(id, dto.reason);
  }
}
