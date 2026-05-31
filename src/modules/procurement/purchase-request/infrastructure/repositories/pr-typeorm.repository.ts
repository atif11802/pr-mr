import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseRequest } from '../../domain/aggregates/pr-header.aggregate';
import { PurchaseRequestRepository } from '../../domain/repositories/pr.repository';
import { PrHeaderOrmEntity } from '../orm-entities/pr-header.orm-entity';
import { PurchaseRequestTypeOrmMapper } from '../mappers/pr-typeorm.mapper';

@Injectable()
export class TypeOrmPurchaseRequestRepository implements PurchaseRequestRepository {
  constructor(
    @InjectRepository(PrHeaderOrmEntity)
    private readonly repository: Repository<PrHeaderOrmEntity>,
  ) {}

  async save(purchaseRequest: PurchaseRequest): Promise<void> {
    const entity = PurchaseRequestTypeOrmMapper.toOrm(purchaseRequest);
    await this.repository.save(entity);
  }

  async findById(id: string): Promise<PurchaseRequest | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      return null;
    }
    return PurchaseRequestTypeOrmMapper.toDomain(entity);
  }
}
