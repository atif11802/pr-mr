import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrController } from './controller/pr.controller';
import { PrService } from './services/pr.service';
import { PrHeaderOrmEntity } from './orm-entities/pr-header.orm-entity';
import { PrDetailOrmEntity } from './orm-entities/pr-detail.orm-entity';
import { MrPrMappingOrmEntity } from './orm-entities/mr-pr-mapping.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrHeaderOrmEntity, PrDetailOrmEntity, MrPrMappingOrmEntity])],
  controllers: [PrController],
  providers: [PrService],
})
export class PrModule {}
