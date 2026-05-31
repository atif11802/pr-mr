import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.config';
import { ProcurementModule } from './modules/procurement/procurement.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ProcurementModule],
})
export class AppModule {}
