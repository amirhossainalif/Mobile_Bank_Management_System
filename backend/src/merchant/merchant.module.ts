import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Merchant } from 'src/DB/Reg.entity';
import { Login } from 'src/DB/Login.entity';
import { MerchantController } from './merchant.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { Transaction } from 'src/DB/transaction.entity';
import { Message } from 'src/DB/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Merchant, Login, Transaction, Message]),
    //forwardRef(() => AuthModule)
    ],
    providers: [ MerchantService , JwtStrategy, JwtService],
    controllers: [ MerchantController],
    exports: [MerchantService]
})
export class MerchantModule {}
