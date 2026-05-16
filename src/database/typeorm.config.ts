import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MrHeaderOrmEntity } from '../modules/mr/orm-entities/mr-header.orm-entity';
import { MrDetailOrmEntity } from '../modules/mr/orm-entities/mr-detail.orm-entity';
import { PrHeaderOrmEntity } from '../modules/pr/orm-entities/pr-header.orm-entity';
import { PrDetailOrmEntity } from '../modules/pr/orm-entities/pr-detail.orm-entity';
import { MrPrMappingOrmEntity } from '../modules/pr/orm-entities/mr-pr-mapping.orm-entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? '1234',
  database: process.env.DB_DATABASE ?? 'erp_procurement',
  entities: [MrHeaderOrmEntity, MrDetailOrmEntity, PrHeaderOrmEntity, PrDetailOrmEntity, MrPrMappingOrmEntity],
  synchronize: false,
  logging: false,
};
