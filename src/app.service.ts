// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { OrderService } from './modules/order/order.service';
// import { AccountService } from './modules/account/account.service';
// import { CreateOrderDto } from './modules/order/dto/create-order.dto';
// import { OrderSnapshotSchema } from './modules/order/order-snapshot.schema';
// import { faker } from '@faker-js/faker';
// import { Account } from './modules/account/entities/account.entity';

// @Injectable()
// export class AppService implements OnModuleInit {
//   constructor(
//     private readonly orderService: OrderService,
//     private readonly accountService: AccountService,
//   ) {}

//   async onModuleInit() {
//     const orderCount = await this.orderService.ordersRepository.count();

//     // if (orderCount > 0) return;

//     const departmentheads = await this.accountService.accountsRepository.find({
//       relations: {
//         business: true,
//       },
//     });

//     for (const departmenthead of departmentheads) {
//       for (let i = 0; i < Math.ceil(Math.random() * 2); i++) {
//         const orders = this.curateOrders(departmenthead);
//         const orderRecords = await this.orderService.createOrder(orders);
//         // console.log(orderRecords);
//       }
//     }

//     console.log('App started upon NestJS initialization');
//   }

//   private curateOrders(departmenthead: Account) {
//     const orderPayload: Array<OrderSnapshotSchema> = [];
//     for (let i = 0; i < 20; i++) {
//       orderPayload.push({
//         itemName: faker.commerce.product(),
//         quantity: faker.number.int(100),
//         itemPrice: faker.number.int({ min: 1000, max: 20000 }),
//       });
//     }

//     const orders: CreateOrderDto = {
//       orders: orderPayload,
//       departmentheadPkid: departmenthead.pkid,
//       businessPkid: departmenthead.business.pkid,
//     };

//     return orders;
//   }
// }
