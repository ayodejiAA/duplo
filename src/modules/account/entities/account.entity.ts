import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entity/base.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { Business } from 'src/modules/business/entities/business.entity';

@Entity()
export class Account extends BaseEntity {
  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  department: string;

  @Column()
  title: string;

  @OneToMany(() => Order, (order) => order.business)
  orders: Order[];

  @ManyToOne(() => Business, (business) => business.departmentHeads)
  business: Business;
}
