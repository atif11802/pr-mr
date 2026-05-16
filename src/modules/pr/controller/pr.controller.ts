import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreatePrDto } from '../dto/create-pr.dto';
import { PrService } from '../services/pr.service';

@Controller('pr')
export class PrController {
  constructor(private readonly prService: PrService) {}

  /**
   * Sample request body:
   * {
   *   "prNo": "PR-001",
   *   "prDate": "2026-05-15T00:00:00.000Z",
   *   "buyerId": 1001,
   *   "supplierId": 2002,
   *   "status": "Submitted",
   *   "remarks": "Create PR for MR items",
   *   "approvalStatus": "Pending",
   *   "companyId": 1,
   *   "createdBy": 5001,
   *   "lines": [
   *     {
   *       "itemId": 101,
   *       "uomId": 1,
   *       "requestQty": 3,
   *       "rfqQty": 0,
   *       "poQty": 0,
   *       "remainingPoQty": 3,
   *       "estimatedPrice": 12.5,
   *       "lineStatus": "Open"
   *     },
   *     {
   *       "itemId": 201,
   *       "uomId": 2,
   *       "requestQty": 15,
   *       "rfqQty": 0,
   *       "poQty": 0,
   *       "remainingPoQty": 15,
   *       "estimatedPrice": 7.5,
   *       "lineStatus": "Open"
   *     }
   *   ],
   *   "mappings": [
   *     { "mrDetailId": 11, "prLineIndex": 0, "mappedQty": 2 },
   *     { "mrDetailId": 21, "prLineIndex": 1, "mappedQty": 5 }
   *   ]
   * }
   */
  @Post()
  async createPurchaseRequest(@Body() createPrDto: CreatePrDto) {
    return this.prService.createPr(createPrDto);
  }

  @Get()
  async getAllPr() {
    return this.prService.findAll();
  }

  @Get(':id')
  async getPrById(@Param('id', ParseIntPipe) id: number) {
    return this.prService.findById(id);
  }
}
