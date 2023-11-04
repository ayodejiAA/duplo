import { Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/credit-score/:businessId')
  getCreditScore(@Param('businessId') businessId: string) {
    return this.orderService.calculateCreditScore(businessId);
  }

  @Get('/details/:businessId')
  orderDetails(@Param('businessId') businessId: string) {
    return this.orderService.retrieveOrderDetails(businessId);
  }

  @Post('/curate')
  curateOrders() {
    return this.orderService.curateOrder();
  }
}
