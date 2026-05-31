import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { IntegrationEvent } from '../../domain/integration-event';

export const RMQ_OPTIONS = 'RMQ_OPTIONS';

export interface RabbitMqOptions {
  urls: string[];
  queue: string;
  queueOptions: {
    durable: boolean;
  };
}

@Injectable()
export class RabbitMqPublisher implements OnModuleInit, OnModuleDestroy {
  private client!: ClientProxy;

  constructor(
    @Inject(RMQ_OPTIONS)
    private readonly options: RabbitMqOptions,
  ) {}

  onModuleInit(): void {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: this.options.urls,
        queue: this.options.queue,
        queueOptions: this.options.queueOptions,
      },
    });
  }

  onModuleDestroy(): void {
    this.client.close();
  }

  public async publish<T>(event: IntegrationEvent<T>): Promise<void> {
    const pattern = event.eventName();
    await this.client.emit(pattern, {
      eventId: event.eventId,
      occurredAt: event.occurredAt.toISOString(),
      correlationId: event.correlationId.value,
      payload: event.payload,
    }).toPromise();
  }
}
