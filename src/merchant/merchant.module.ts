import { Module } from '@nestjs/common';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Merchant } from '../DB/M_a.entity';
import { Transaction } from 'src/DB/transaction.entity';
import { AuthGuard } from '../authentication/auth.guard'


@Module({
  imports: [TypeOrmModule.forFeature([Merchant, Transaction])],
  controllers: [MerchantController],
  providers: [MerchantService, AuthGuard]
})
export class MerchantModule {}
