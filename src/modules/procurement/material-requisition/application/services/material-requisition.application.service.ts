import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateMaterialRequisitionDto, MrItemDto } from '../dtos/create-material-requisition.dto';
import { MaterialRequisitionRepository } from '../../domain/repositories/mr.repository';
import { MaterialRequisition } from '../../domain/aggregates/mr-header.aggregate';
import { Department } from '../../domain/value-objects/department.vo';
import { MrDetail } from '../../domain/entities/mr-detail.entity';

@Injectable()
export class MaterialRequisitionApplicationService {
  constructor(
    @Inject('MaterialRequisitionRepository')
    private readonly repository: MaterialRequisitionRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async createDraft(dto: CreateMaterialRequisitionDto): Promise<MaterialRequisition> {
    const items = dto.items.map((item) => this.toDetail(item));
    const mrNumber = this.generateMrNumber();
    const mr = MaterialRequisition.createDraft(mrNumber, Department.create(dto.department), dto.requestedBy, items);
    await this.repository.save(mr);
    return mr;
  }

  public async submit(requisitionId: string): Promise<MaterialRequisition> {
    const mr = await this.loadOrFail(requisitionId);
    mr.submit();
    await this.repository.save(mr);
    await this.publishDomainEvents(mr);
    return mr;
  }

  public async approve(requisitionId: string, approvedBy: string): Promise<MaterialRequisition> {
    const mr = await this.loadOrFail(requisitionId);
    mr.approve(approvedBy);
    await this.repository.save(mr);
    await this.publishDomainEvents(mr);
    return mr;
  }

  private async loadOrFail(id: string): Promise<MaterialRequisition> {
    const mr = await this.repository.findById(id);
    if (!mr) {
      throw new Error(`Material requisition ${id} not found`);
    }
    return mr;
  }

  private async publishDomainEvents(mr: MaterialRequisition): Promise<void> {
    const events = mr.pullDomainEvents();
    for (const event of events) {
      await this.eventEmitter.emitAsync(event.eventName(), event);
    }
  }

  private toDetail(item: MrItemDto): MrDetail {
    return new MrDetail(item.itemCode, item.description, item.quantity, item.unitOfMeasure);
  }

  private generateMrNumber(): string {
    return `MR-${Date.now()}`;
  }
}
