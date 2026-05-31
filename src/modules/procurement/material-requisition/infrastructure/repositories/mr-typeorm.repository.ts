import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialRequisition } from '../../domain/aggregates/mr-header.aggregate';
import { MaterialRequisitionRepository } from '../../domain/repositories/mr.repository';
import { MrHeaderOrmEntity } from '../orm-entities/mr-header.orm-entity';
import { MaterialRequisitionTypeOrmMapper } from '../mappers/mr-typeorm.mapper';

@Injectable()
export class TypeOrmMaterialRequisitionRepository implements MaterialRequisitionRepository {
  constructor(
    @InjectRepository(MrHeaderOrmEntity)
    private readonly repository: Repository<MrHeaderOrmEntity>,
  ) {}

  async save(materialRequisition: MaterialRequisition): Promise<void> {
    const entity = MaterialRequisitionTypeOrmMapper.toOrm(materialRequisition);
    await this.repository.save(entity);
  }

  async findById(id: string): Promise<MaterialRequisition | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      return null;
    }

    return MaterialRequisitionTypeOrmMapper.toDomain(entity);
  }
}
