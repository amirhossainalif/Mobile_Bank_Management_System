import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MerchantModule } from './merchant/merchant.module';
import { MerchantController } from './merchant/merchant.controller';
import { MerchantService } from './merchant/merchant.service';
import { Merchant } from './DB/M_a.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/DB/transaction.entity';
import { AuthGuard } from 'src/authentication/auth.guard'

@Module({
  imports: [
    TypeOrmModule.forFeature([Merchant, Transaction]),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'alif',
    database: 'mBank',
    entities: [
      __dirname + '/**/*.entity{.ts,.js}'
    ],
    synchronize: true
  }),
    MerchantModule
  ],
  controllers: [AppController, MerchantController],
  providers: [AppService, MerchantService, AuthGuard],
})
export class AppModule {}
