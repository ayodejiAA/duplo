import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderSnapshotSchema } from './order-snapshot.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderEventEnum } from './order.enum';
import { AccountService } from '../account/account.service';
import { BusinessService } from '../business/business.service';
import { Account } from '../account/entities/account.entity';
import { faker } from '@faker-js/faker';
import { InjectModel } from '@nestjs/mongoose';
import { Order as OrderSchema } from '../order/models/order.model';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private readonly eventEmitter: EventEmitter2,
    private readonly businessService: BusinessService,
    private readonly accountService: AccountService,
    @InjectModel(OrderSchema.name)
    private readonly orderModel: Model<OrderSchema>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const { orders, departmentHeadPkid, businessPkid } = createOrderDto;

    const totalAmountPaid = orders.reduce(
      (totalAmountPaid: number, orderItem: OrderSnapshotSchema) => {
        totalAmountPaid += orderItem.quantity * orderItem.itemPrice;
        return totalAmountPaid;
      },
      0,
    );

    const data = {
      departmentHeadPkid,
      businessPkid,
      totalAmountPaid,
      orderSnapshot: orders,
    };

    let order = this.ordersRepository.create(data);
    order = await this.ordersRepository.save(order);

    this.eventEmitter.emit(OrderEventEnum.COMPLETED, { ...order });

    return order;
  }

  async curateOrder() {
    const departmentheads = await this.accountService.accountsRepository.find({
      relations: {
        business: true,
      },
    });

    for (const departmenthead of departmentheads) {
      for (let i = 0; i < Math.ceil(Math.random() * 2); i++) {
        const orders = this.generateOrders(departmenthead);
        await this.createOrder(orders);
      }
    }

    return 'done';
  }

  private generateOrders(departmenthead: Account) {
    const orderPayload: Array<OrderSnapshotSchema> = [];
    for (let i = 0; i < 20; i++) {
      orderPayload.push({
        itemName: faker.commerce.product(),
        quantity: faker.number.int(100),
        itemPrice: faker.number.int({ min: 1000, max: 20000 }),
      });
    }

    const orders: CreateOrderDto = {
      orders: orderPayload,
      departmentHeadPkid: departmenthead.pkid,
      businessPkid: departmenthead.business.pkid,
    };

    return orders;
  }

  async calculateCreditScore(businessId: string) {
    try {
      const result = await this.orderModel.aggregate([
        {
          $match: {
            businessId,
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$amount' },
            numOfOrders: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            creditScore: {
              $divide: ['$totalAmount', { $multiply: ['$numOfOrders', 100] }],
            },
          },
        },
      ]);

      return result.length ? result[0] : {};
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }

  async retrieveOrderDetails(businessId: string) {
    try {
      const business = await this.businessService.businessRepository.findBy({
        id: businessId,
      });
      if (business.length < 1)
        throw new NotFoundException('Business not found');

      const { totalOrders, totalAmount } = await this.ordersRepository
        .createQueryBuilder('order')
        .select([
          'COUNT("order".id) as "totalOrders"',
          'SUM("order"."totalAmountPaid") as "totalAmount"',
        ])
        .where('"order"."businessPkid" = :id', {
          id: business[0].pkid,
        })
        .getRawOne();

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { totalOrdersToday, totalAmountToday } = await this.ordersRepository
        .createQueryBuilder('order')
        .select([
          'COUNT(order.id) as "totalOrdersToday"',
          'SUM(order.totalAmountPaid) as "totalAmountToday"',
        ])
        .where('"order"."businessPkid" = :id', {
          id: business[0].pkid,
        })
        .andWhere('order.createdAt >= :today', { today })
        .getRawOne();

      return {
        totalOrders: +totalOrders,
        totalAmount: totalAmount == null ? 0 : +totalAmount,
        totalOrdersToday: +totalOrdersToday,
        totalAmountToday: totalAmountToday == null ? 0 : +totalAmountToday,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException();
    }
  }
}
