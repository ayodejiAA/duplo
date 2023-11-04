import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entity/base.entity';
import { Account } from 'src/modules/account/entities/account.entity';
import { Order } from 'src/modules/order/entities/order.entity';

@Entity()
export class Business extends BaseEntity {
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 150 })
  companyName: string;

  @Column({ type: 'varchar', length: 150 })
  firstName: string;

  @Column({ type: 'varchar', length: 150 })
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @OneToMany(() => Account, (account) => account.business)
  departmentHeads: Account[];

  @OneToMany(() => Order, (order) => order.business)
  orders: Order[];
}
