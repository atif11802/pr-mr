import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OutboxMessageOrmEntity, OutboxStatus } from '../orm-entities/outbox-message.orm-entity';

export interface OutboxRepository {
  saveMessage(message: OutboxMessageOrmEntity): Promise<void>;
  findPending(batchSize: number): Promise<OutboxMessageOrmEntity[]>;
  markSent(id: string): Promise<void>;
  markFailed(id: string, error: string): Promise<void>;
  markDeadLetter(id: string, error: string): Promise<void>;
}

@Injectable()
export class TypeOrmOutboxRepository implements OutboxRepository {
  constructor(
    @InjectRepository(OutboxMessageOrmEntity)
    private readonly repository: Repository<OutboxMessageOrmEntity>,
  ) {}

  async saveMessage(message: OutboxMessageOrmEntity): Promise<void> {
    await this.repository.save(message);
  }

  async findPending(batchSize: number): Promise<OutboxMessageOrmEntity[]> {
    return this.repository.find({
      where: { status: OutboxStatus.PENDING },
      order: { createdAt: 'ASC' },
      take: batchSize,
    });
  }

  async markSent(id: string): Promise<void> {
    await this.repository.update(id, { status: OutboxStatus.SENT, retryCount: 0, lastError: undefined });
  }

  async markFailed(id: string, error: string): Promise<void> {
    await this.repository.increment({ id }, 'retryCount', 1);
    await this.repository.update(id, { status: OutboxStatus.FAILED, lastError: error });
  }

  async markDeadLetter(id: string, error: string): Promise<void> {
    await this.repository.update(id, { status: OutboxStatus.DEAD_LETTER, lastError: error });
  }
}
