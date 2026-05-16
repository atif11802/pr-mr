import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.config';
import { MrModule } from './modules/mr/mr.module';
import { PrModule } from './modules/pr/pr.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), MrModule, PrModule],
})
export class AppModule {}
