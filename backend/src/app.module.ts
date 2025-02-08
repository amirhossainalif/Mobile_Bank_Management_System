import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MerchantController } from './merchant/merchant.controller';
import { MerchantModule } from './merchant/merchant.module';
import { Merchant } from './DB/Reg.entity';
import { Login } from './DB/Login.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Merchant, Login]),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'alif',
    database: 'MBMS1',
    entities: [
      __dirname+'/**/*.entity{.ts,.js}'
    ],
    synchronize: true}),
    AuthModule, MerchantModule],
  controllers: [AppController, MerchantController],
  providers: [AppService, AuthService],
})
export class AppModule {}
