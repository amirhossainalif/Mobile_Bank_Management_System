import { Body, Controller, Get, HttpException, HttpStatus, InternalServerErrorException, Param, Post, Put, Query, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request, Response } from 'express';

@Controller('merchant')
export class MerchantController {
    constructor(private merchantService: MerchantService) {}

    @Post('register')
  async register(@Body('email') email: string, @Body('password') password: string, @Body('name') name: string, @Body('phoneNumber') phoneNumber: string, @Body('address') address: string, @Body('balance') balance: number) /*(@Body() body: { email: string; password: string; name: string, phoneNumber: string, address: string, balance: number })*/ 
  {
    // await this.merchantService.register(email, password, name, phoneNumber, address, balance );
    // return { message: 'User registered successfully' };
  
    try {
      await this.merchantService.register(email, password, name, phoneNumber, address, balance);
      return { message: 'User registered successfully' };
    } catch (error) {
      console.error("Error registering user:", error);
      throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Req() req) {
        const userEmail = req.user.email;
        return await this.merchantService.getMerchantProfile(userEmail);
    }

    @UseGuards(JwtAuthGuard)
    @Get('lo')
    async getlo(@Req() req) {
        const userEmail = req.user.email;
        return  await this.merchantService.getMerchantlogin(userEmail), this.merchantService.getMerchantProfile(userEmail);
        //const b = await this.merchantService.getMerchantProfile(userEmail);
        //return [b,a];
    }

    

    @UseGuards(JwtAuthGuard)
  @Get('transactions')
  async getTransactions(@Req() req) {
      const userId = req.user.id; 
      return await this.merchantService.getTransactions(userId);
  }



  @UseGuards(JwtAuthGuard)
@Get('balance')
async getBalance(@Req() req: any) {
  const userEmail = req.user.email;
  const a= await this.merchantService.getMerchantProfile(userEmail);
  //const userId = req.user.userId;
  const userId = a.id;
  const user = await this.merchantService.getMerchantById(userId);
  return { balance: user.balance };
}



  @UseGuards(JwtAuthGuard) 
  @Post('transfer')
  async transferMoney(
    @Req() req: any,
    @Body('receiverId') receiverId: number,
    @Body('amount') amount: number,
  ) {
    const userEmail = req.user.email;
    const a= await this.merchantService.getMerchantProfile(userEmail);
    const senderId = a.id;
    const transaction = await this.merchantService.transferMoney(senderId, receiverId, amount);
    return { message: 'Transfer successful', transaction };
  }


@UseGuards(JwtAuthGuard) 
@Get('history')
async getTransactionHistory(
  @Req() req: any,
  @Query('merchantId') merchantId: string,
  @Query('startDate') startDate: string,
  @Query('endDate') endDate: string,
) {
  const userId = merchantId ? parseInt(merchantId) : req.user.userId; 
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { message: 'Invalid date format' };
  }

  const transactions = await this.merchantService.getTransactionHistory(userId, start, end);
  return { transactions };
}


  


  @UseGuards(JwtAuthGuard)
    @Put('update')
    async updateMerchant(@Req() req, @Body() body) {
        const { name, phoneNumber, address, email, password } = body;
        const userEmail = req.user.email;
        const a= await this.merchantService.getMerchantProfile(userEmail);
        const merchantId = a.id;

        return this.merchantService.updateMerchantInfo(merchantId, name, phoneNumber, address, email, password);
    }
}
