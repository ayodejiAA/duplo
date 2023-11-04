import { Module } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';

@Module({
  exports: [AccountService],
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountService],
})
export class AccountModule {}
