import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderEventEnum } from '../order.enum';
import { Order } from '../entities/order.entity';
import EnvConfig from 'src/config/env';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { Order as OrderSchema } from '../models/order.model';
import { InjectModel } from '@nestjs/mongoose';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { BusinessService } from 'src/modules/business/business.service';

@Injectable()
export class OrderEventHandler {
  private readonly logger = new Logger(OrderEventHandler.name);

  constructor(
    @Inject('ENVCONFIG') private readonly envConfig: typeof EnvConfig,
    private readonly httpService: HttpService,
    @InjectModel(OrderSchema.name)
    private readonly orderModel: Model<OrderSchema>,
    private readonly businessService: BusinessService,
  ) {}

  @OnEvent(OrderEventEnum.COMPLETED)
  async orderCompleted(order: Order) {
    try {
      const business = await this.businessService.businessRepository.find({
        select: { id: true },
        where: {
          pkid: order.businessPkid,
        },
      });

      const data = {
        businessId: business[0].id,
        amount: order.totalAmountPaid,
        status: order.status,
        date: order.createdAt,
      };

      const createOrder = new this.orderModel(data);
      await createOrder.save();

      this.logger.log(
        `Order ${order.id} successfully logged to mongoDB for credit score assessment`,
      );

      this.logTax(order);
    } catch (error) {
      this.logger.error(error);
    }
  }

  private async logTax(order: Order) {
    try {
      const payload = {
        order_id: order.id,
        platform_code: this.envConfig.DUPLO_PLATFORM_CODE,
        order_amount: order.totalAmountPaid,
      };

      await firstValueFrom(
        this.httpService.post(this.envConfig.TAX_API_URL, payload).pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
      );

      this.logger.log(
        `Order ${order.id} successfully logged  to the tax authourity`,
      );
    } catch (error) {
      this.logger.error(error.message + ` for order ${order.id}`);
    }
  }
}
