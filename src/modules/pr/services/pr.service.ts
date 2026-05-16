import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreatePrDto } from '../dto/create-pr.dto';
import { PurchaseRequestFactory } from '../domain/factories/purchase-request.factory';
import { PrHeaderOrmEntity } from '../orm-entities/pr-header.orm-entity';
import { PrDetailOrmEntity } from '../orm-entities/pr-detail.orm-entity';
import { MrPrMappingOrmEntity } from '../orm-entities/mr-pr-mapping.orm-entity';
import { MrDetailOrmEntity } from '../../mr/orm-entities/mr-detail.orm-entity';

@Injectable()
export class PrService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async createPr(createPrDto: CreatePrDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const prAggregate = PurchaseRequestFactory.createFromDto(createPrDto);

      const headerEntity = new PrHeaderOrmEntity();
      headerEntity.prNo = prAggregate.prNo;
      headerEntity.prDate = prAggregate.prDate;
      headerEntity.buyerId = prAggregate.buyerId;
      headerEntity.supplierId = prAggregate.supplierId;
      headerEntity.status = prAggregate.status;
      headerEntity.remarks = prAggregate.remarks;
      headerEntity.approvalStatus = prAggregate.approvalStatus;
      headerEntity.approvedBy = prAggregate.approvedBy;
      headerEntity.approvedDate = prAggregate.approvedDate;
      headerEntity.companyId = prAggregate.companyId;
      headerEntity.createdBy = prAggregate.createdBy;

      headerEntity.details = prAggregate.lines.map((line) => {
        const detailEntity = new PrDetailOrmEntity();
        detailEntity.itemId = line.itemId;
        detailEntity.uomId = line.uomId;
        detailEntity.requestQty = line.requestQty;
        detailEntity.rfqQty = line.rfqQty;
        detailEntity.poQty = line.poQty;
        detailEntity.remainingPoQty = line.remainingPoQty;
        detailEntity.estimatedPrice = line.estimatedPrice;
        detailEntity.lineStatus = line.lineStatus;
        detailEntity.header = headerEntity;
        return detailEntity;
      });

      const savedHeader = await queryRunner.manager.save(PrHeaderOrmEntity, headerEntity);
      const savedDetails = savedHeader.details ?? [];

      const mrDetailCache = new Map<number, { prCreatedQty: number; remainingPrQty: number }>();
      const mappings = [] as MrPrMappingOrmEntity[];

      for (let index = 0; index < prAggregate.mappings.length; index += 1) {
        const mappingDto = prAggregate.mappings[index];
        const mrDetail = await queryRunner.manager.findOne(MrDetailOrmEntity, {
          where: { mrDetailId: mappingDto.mrDetailId },
        });

        if (!mrDetail) {
          throw new Error(`MR detail not found for mapping MR detail id ${mappingDto.mrDetailId}`);
        }

        const currentState = mrDetailCache.get(mrDetail.mrDetailId) ?? {
          prCreatedQty: mrDetail.prCreatedQty,
          remainingPrQty: mrDetail.remainingPrQty,
        };

        if (mappingDto.mappedQty > currentState.remainingPrQty) {
          throw new Error('mapped_qty cannot exceed remaining_pr_qty');
        }

        currentState.prCreatedQty += mappingDto.mappedQty;
        currentState.remainingPrQty = Math.max(0, currentState.remainingPrQty - mappingDto.mappedQty);
        mrDetailCache.set(mrDetail.mrDetailId, currentState);

        const mappingEntity = new MrPrMappingOrmEntity();
        mappingEntity.mappedQty = mappingDto.mappedQty;
        mappingEntity.createdBy = prAggregate.createdBy;
        mappingEntity.mrDetail = mrDetail;

        const targetIndex = mappingDto.prLineIndex ?? index;
        const targetDetail =
          mappingDto.prDetailId !== null && mappingDto.prDetailId !== undefined
            ? savedDetails.find((detail) => detail.prDetailId === mappingDto.prDetailId)
            : savedDetails[targetIndex];

        if (!targetDetail) {
          throw new Error(`PR detail target not found for mapping index ${index}`);
        }

        mappingEntity.prDetail = targetDetail;
        mappings.push(mappingEntity);
      }

      const savedMappings = await queryRunner.manager.save(MrPrMappingOrmEntity, mappings);

      for (const mapping of savedMappings) {
        const cached = mrDetailCache.get(mapping.mrDetail.mrDetailId);
        if (!cached) {
          throw new Error(`MR detail cache missing for mapping id ${mapping.mappingId}`);
        }

        const mrDetail = await queryRunner.manager.findOne(MrDetailOrmEntity, {
          where: { mrDetailId: mapping.mrDetail.mrDetailId },
        });

        if (!mrDetail) {
          throw new Error(`MR detail not found for mapping id ${mapping.mappingId}`);
        }

        mrDetail.prCreatedQty = cached.prCreatedQty;
        mrDetail.remainingPrQty = cached.remainingPrQty;
        mrDetail.isClosed = cached.remainingPrQty <= 0;

        await queryRunner.manager.save(MrDetailOrmEntity, mrDetail);
      }

      await queryRunner.commitTransaction();

      return {
        prHeader: savedHeader,
        prLines: savedDetails,
        mappings: savedMappings,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    return this.dataSource.getRepository(PrHeaderOrmEntity).find({ relations: ['details'] });
  }

  async findById(id: number) {
    return this.dataSource.getRepository(PrHeaderOrmEntity).findOne({
      where: { prId: id },
      relations: ['details'],
    });
  }
}
