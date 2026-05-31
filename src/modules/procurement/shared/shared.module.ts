import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OutboxMessageOrmEntity } from './infrastructure/orm-entities/outbox-message.orm-entity';
import { RabbitMqPublisher, RMQ_OPTIONS } from './infrastructure/rmq/rabbitmq-publisher';
import { TypeOrmOutboxRepository } from './infrastructure/repositories/outbox.repository';
import { OutboxProcessor } from './infrastructure/outbox.processor';

// RMQ options and provider are commented out to disable RabbitMQ integration temporarily.
/*
const rmqOptionsProvider = {
  provide: RMQ_OPTIONS,
  useValue: {
    urls: [process.env.RMQ_URL ?? 'amqp://localhost:5672'],
    queue: process.env.RMQ_QUEUE ?? 'procurement-outbox',
    queueOptions: { durable: true },
  },
};
*/

@Module({
  imports: [TypeOrmModule.forFeature([OutboxMessageOrmEntity]), EventEmitterModule.forRoot()],
  providers: [
    // RMQ disabled: do not provide rmqOptionsProvider or RabbitMqPublisher
    {
      provide: 'OutboxRepository',
      useClass: TypeOrmOutboxRepository,
    },
    OutboxProcessor,
  ],
  exports: ['OutboxRepository', OutboxProcessor, EventEmitterModule],
})
export class ProcurementSharedModule {}
