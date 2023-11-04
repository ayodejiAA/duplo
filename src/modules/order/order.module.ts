import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { HttpModule } from '@nestjs/axios';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModel, Order as OrderSchema } from './models/order.model';
import { OrderEventHandler } from './handlers/order-event.handler';
import envConfig from 'src/config/env';
import { AccountModule } from '../account/account.module';
import { BusinessModule } from '../business/business.module';

@Module({
  imports: [
    BusinessModule,
    AccountModule,
    MongooseModule.forFeature([{ name: OrderSchema.name, schema: OrderModel }]),
    HttpModule.register({ maxRedirects: 1 }),
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderEventHandler,
    {
      provide: 'ENVCONFIG',
      useValue: envConfig,
    },
  ],
})
export class OrderModule {}
