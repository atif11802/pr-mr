import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateMrDto } from '../dto/create-mr.dto';
import { MaterialRequisitionFactory } from '../domain/factories/material-requisition.factory';
import { MrHeaderOrmEntity } from '../orm-entities/mr-header.orm-entity';
import { MrDetailOrmEntity } from '../orm-entities/mr-detail.orm-entity';

@Injectable()
export class MrService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async createMr(createMrDto: CreateMrDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const mrAggregate = MaterialRequisitionFactory.createFromDto(createMrDto);

      const headerEntity = new MrHeaderOrmEntity();
      headerEntity.mrNo = mrAggregate.mrNo;
      headerEntity.mrDate = mrAggregate.mrDate;
      headerEntity.requestByEmpId = mrAggregate.requestByEmpId;
      headerEntity.departmentId = mrAggregate.departmentId;
      headerEntity.projectId = mrAggregate.projectId;
      headerEntity.warehouseId = mrAggregate.warehouseId;
      headerEntity.priority = mrAggregate.priority;
      headerEntity.status = mrAggregate.status;
      headerEntity.remarks = mrAggregate.remarks;
      headerEntity.approvalStatus = mrAggregate.approvalStatus;
      headerEntity.approvedBy = mrAggregate.approvedBy;
      headerEntity.approvedDate = mrAggregate.approvedDate;
      headerEntity.companyId = mrAggregate.companyId;
      headerEntity.createdBy = mrAggregate.createdBy;
      headerEntity.details = mrAggregate.details.map((line) => {
        const detailEntity = new MrDetailOrmEntity();
        detailEntity.itemId = line.itemId;
        detailEntity.uomId = line.uomId;
        detailEntity.requiredQty = line.requiredQty;
        detailEntity.approvedQty = line.approvedQty;
        detailEntity.prCreatedQty = line.prCreatedQty;
        detailEntity.remainingPrQty = line.remainingPrQty;
        detailEntity.stockQty = line.stockQty;
        detailEntity.expectedDate = line.expectedDate;
        detailEntity.purpose = line.purpose;
        detailEntity.lineStatus = line.lineStatus;
        detailEntity.isClosed = line.isClosed;
        detailEntity.header = headerEntity;
        return detailEntity;
      });

      const savedHeader = await queryRunner.manager.save(MrHeaderOrmEntity, headerEntity);
      await queryRunner.commitTransaction();
      return savedHeader;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    return this.dataSource.getRepository(MrHeaderOrmEntity).find({ relations: ['details'] });
  }

  async findById(id: number) {
    return this.dataSource.getRepository(MrHeaderOrmEntity).findOne({
      where: { mrId: id },
      relations: ['details'],
    });
  }
}
