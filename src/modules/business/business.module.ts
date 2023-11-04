import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { BusinessController } from './business.controller';

@Module({
  exports: [BusinessService],
  providers: [BusinessService],
  imports: [TypeOrmModule.forFeature([Business])],
  controllers: [BusinessController],
})
export class BusinessModule {}
