import { OrderSnapshotSchema } from '../order-snapshot.schema';

export class CreateOrderDto {
  orders: OrderSnapshotSchema[];
  departmentHeadPkid: number;
  businessPkid: number;
}
