import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateMrDto } from '../dto/create-mr.dto';
import { MrService } from '../services/mr.service';

@Controller('mr')
export class MrController {
  constructor(private readonly mrService: MrService) {}

  /**
   * Sample request body:
   * {
   *   "mrNo": "MR-001",
   *   "mrDate": "2026-05-10T00:00:00.000Z",
   *   "requestByEmpId": 3001,
   *   "departmentId": 10,
   *   "projectId": 100,
   *   "warehouseId": 5,
   *   "priority": "High",
   *   "status": "Submitted",
   *   "remarks": "Procurement request for office supplies",
   *   "approvalStatus": "Pending",
   *   "companyId": 1,
   *   "createdBy": 5001,
   *   "lines": [
   *     {
   *       "itemId": 101,
   *       "uomId": 1,
   *       "requiredQty": 5,
   *       "expectedDate": "2026-05-20",
   *       "purpose": "Pens for office",
   *       "lineStatus": "Open"
   *     },
   *     {
   *       "itemId": 201,
   *       "uomId": 2,
   *       "requiredQty": 10,
   *       "expectedDate": "2026-05-22",
   *       "purpose": "T-shirts for event",
   *       "lineStatus": "Open"
   *     }
   *   ]
   * }
   */
  @Post()
  async createMr(@Body() createMrDto: CreateMrDto) {
    return this.mrService.createMr(createMrDto);
  }

  @Get()
  async getAllMr() {
    return this.mrService.findAll();
  }

  @Get(':id')
  async getMrById(@Param('id', ParseIntPipe) id: number) {
    return this.mrService.findById(id);
  }
}
