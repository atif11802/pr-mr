import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MrHeaderOrmEntity } from '../modules/procurement/material-requisition/infrastructure/orm-entities/mr-header.orm-entity';
import { MrDetailOrmEntity } from '../modules/procurement/material-requisition/infrastructure/orm-entities/mr-detail.orm-entity';
import { PrHeaderOrmEntity } from '../modules/procurement/purchase-request/infrastructure/orm-entities/pr-header.orm-entity';
import { PrDetailOrmEntity } from '../modules/procurement/purchase-request/infrastructure/orm-entities/pr-detail.orm-entity';
import { OutboxMessageOrmEntity } from '../modules/procurement/shared/infrastructure/orm-entities/outbox-message.orm-entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'root',
  database: process.env.DB_DATABASE ?? 'erp_procurement',
  entities: [MrHeaderOrmEntity, MrDetailOrmEntity, PrHeaderOrmEntity, PrDetailOrmEntity, OutboxMessageOrmEntity],
  synchronize: true,
  logging: false,
};
