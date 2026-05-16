import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MrController } from './controller/mr.controller';
import { MrService } from './services/mr.service';
import { MrHeaderOrmEntity } from './orm-entities/mr-header.orm-entity';
import { MrDetailOrmEntity } from './orm-entities/mr-detail.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([MrHeaderOrmEntity, MrDetailOrmEntity])],
  controllers: [MrController],
  providers: [MrService],
  exports: [MrService],
})
export class MrModule {}
