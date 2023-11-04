import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BusinessModule } from './modules/business/business.module';
import { OrderModule } from './modules/order/order.module';
import { AccountModule } from './modules/account/account.module';
import envConfig from './config/env';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import typeOrmConfig from 'typeorm.config';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(envConfig.MONGODB_CONNECTION_STRING),
    TypeOrmModule.forRoot(typeOrmConfig),
    BusinessModule,
    AccountModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
