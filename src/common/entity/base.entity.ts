import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Generated,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  pkid: number;

  @Column()
  @Generated('uuid')
  id: string;

  @CreateDateColumn({})
  createdAt: Date;

  @UpdateDateColumn({})
  updatedAt: Date;
}
