import { Module } from '@nestjs/common';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Merchant } from '../DB/M_a.entity';
import { Transaction } from 'src/DB/transaction.entity';
import { AuthGuard } from '../authentication/auth.guard';
import { Login } from 'src/DB/Login.entity';
import { MailService, OtpService } from 'src/otp/OTP.service';


@Module({
  imports: [TypeOrmModule.forFeature([Merchant, Transaction, Login])],
  controllers: [MerchantController],
  providers: [MerchantService, AuthGuard, OtpService, MailService]
})
export class MerchantModule {}
