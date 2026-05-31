import { Inject, Injectable, Logger } from '@nestjs/common';
import { OutboxMessageOrmEntity, OutboxStatus } from './orm-entities/outbox-message.orm-entity';
import { OutboxRepository } from './repositories/outbox.repository';

@Injectable()
export class OutboxProcessor {
  private readonly logger = new Logger(OutboxProcessor.name);
  private readonly maxRetries = 5;

  constructor(
    @Inject('OutboxRepository')
    private readonly outboxRepository: OutboxRepository,
  ) {}

  public async processPending(batchSize = 20): Promise<void> {
    const pending = await this.outboxRepository.findPending(batchSize);

    for (const message of pending) {
      try {
        // RMQ disabled: log intended publish and mark message as sent to avoid blocking
        this.logger.log(`RMQ disabled: would publish event ${message.eventType} for ${message.id}`);
        await this.outboxRepository.markSent(message.id);
      } catch (error) {
        const messageText = error instanceof Error ? error.message : String(error);
        this.logger.error('Outbox publish failed', messageText, message);

        if (message.retryCount >= this.maxRetries - 1) {
          await this.outboxRepository.markDeadLetter(message.id, messageText);
          this.logger.warn(`Message moved to dead letter queue: ${message.id}`);
        } else {
          await this.outboxRepository.markFailed(message.id, messageText);
        }
      }
    }
  }
}
