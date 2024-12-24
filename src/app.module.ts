import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MerchantModule } from './merchant/merchant.module';
import { MerchantController } from './merchant/merchant.controller';
import { MerchantService } from './merchant/merchant.service';
import { Merchant } from './DB/M_a.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/DB/transaction.entity';
import { AuthGuard } from 'src/authentication/auth.guard'
import { Login } from './DB/Login.entity';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { MailService, OtpService } from './otp/OTP.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Merchant, Transaction, Login]),
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
  providers: [AppService, MerchantService, AuthGuard, OtpService, MailService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieParser(),
        session({
          secret: '12345', 
          resave: false,
          saveUninitialized: false,
          cookie: {
            maxAge: 30000, // Cookie expiration time (1 min)
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
          },
        }),
      )
      .forRoutes('*');
  }

}
