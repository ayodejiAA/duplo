import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { dbSchemaOptions } from 'src/config/database/mongoose/mongoose.config';
import { OrderStatusEnum } from '../order.enum';

@Schema(dbSchemaOptions)
export class Order extends Document {
  @Prop({ required: true })
  businessId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: String, enum: Object.values(OrderStatusEnum) })
  status: OrderStatusEnum;

  @Prop({ required: true })
  date: Date;
}

export const OrderModel = SchemaFactory.createForClass(Order);
