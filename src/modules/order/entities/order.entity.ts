import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entity/base.entity';
import { Business } from 'src/modules/business/entities/business.entity';
import { Account } from 'src/modules/account/entities/account.entity';
import { OrderStatusEnum } from '../order.enum';
import { OrderSnapshotSchema } from '../order-snapshot.schema';

@Entity()
export class Order extends BaseEntity {
  @ManyToOne(() => Business, (business) => business.orders)
  business: Business;

  @Column()
  businessPkid: number;

  @ManyToOne(() => Account, (account) => account.orders)
  departmentHead: Account;

  @Column()
  departmentHeadPkid: number;

  @Column({ type: 'decimal' })
  totalAmountPaid: number;

  @Column('simple-json')
  orderSnapshot: OrderSnapshotSchema[];

  @Column({
    type: 'enum',
    enum: OrderStatusEnum,
    default: OrderStatusEnum.Completed,
  })
  status: OrderStatusEnum;
}
