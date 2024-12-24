import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Headers, Req, Res } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { Merchant } from '../DB/M_a.entity';
import { CreateMerchantDTO } from '../DTOs/create.dto'
import { AuthGuard } from '../authentication/auth.guard'
import { Request, Response } from 'express';
import { MailService, OtpService } from 'src/otp/OTP.service';

@Controller('merchant')
export class MerchantController {
    constructor(
      private readonly merchantService: MerchantService,
      private readonly otpService: OtpService,
      private readonly mailService: MailService
    ) {}


  

  @Post("/add")
  create(@Body() Merchant: {name: string, email: string, phoneNumber: string, address: string, balance: number, password: string}) {
    return this.merchantService.create(Merchant.name, Merchant.email, Merchant.phoneNumber, Merchant.address, Merchant.balance,Merchant.password);
  }



  @Get("/getAll")
  findAll() {
    return this.merchantService.findAll();
  }

  @Get('/get/:id')
  findOne(@Param('id') id: number) {
    return this.merchantService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/update/:id')
  update(@Param('id') id: number, @Body() merchant: Partial<Merchant>) {
    return this.merchantService.update(id, merchant);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  remove(@Param('id') id: number) {
    return this.merchantService.remove(id);
  }



  @UseGuards(AuthGuard)
  @Post('/transaction/:id/deposit')
  deposit(@Param('id') id: number, @Body('amount') amount: number) {
    return this.merchantService.deposit(id, amount);
  }

  @UseGuards(AuthGuard)
  @Post('/transaction/:id/withdraw')
  withdraw(@Param('id') id: number, @Body('amount') amount: number) {
    return this.merchantService.withdraw(id, amount);
  }

  @UseGuards(AuthGuard)
  @Post('/transaction/:id/transfer')
  transfer(
    @Param('id') senderId: number,
    @Body('recipientId') recipientId: number,
    @Body('amount') amount: number,
  ) {
    return this.merchantService.transfer(senderId, recipientId, amount);
  }

  @UseGuards(AuthGuard)
  @Get('/:id/transactions')
  getTransactionHistory(@Param('id') id: number) {
    return this.merchantService.getTransactionHistory(id);
  }


  @Post('/login')
  async login(
    @Body() body: {id: number, password: string},
    @Req() req: Request,
    @Res() res: Response,

  ) 
  {
    const u = await this.merchantService.login(body.id,body.password);

    if (u)
    {
      req.session.u = u;
      return res.send('Login successful');
    }

    return res.status(401).send('Invalid');
  }

  @Post('/logout/:id')
  logout(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response
  ) 
  {
    //if(req.session.merchantService.loginRepo.id === id)
    //{
      //req.session.destroy((err) => {
        if(req.session.destroy()){
          
          this.merchantService.logout(id);
          res.clearCookie('connect.sid');
          return res.send('logout successful');
          //return res.status(500).send("error logout");
        }
        // res.clearCookie('connect.sid');
        // return res.send('logout successful');
      //});
   // }
    else{
      return res.status(400).send('no active session found');
    }
    //return this.merchantService.logout(id);
  }


  @Post('/forgot_password')
  async forgotPassword(@Body('email') email: string): Promise<string> {
    const otp = this.otpService.generateOtp();
    this.otpService.storeOtp(email, otp);

    // Send OTP via email
    await this.mailService.sendOtp(email, otp);

    return 'OTP sent to your email. It will expire in 10 minutes.';
  }

  @Post('/reset_password')
  async resetPassword(
    @Body('email') email: string,
    @Body('otp') otp: string,
    @Body('newPassword') newPassword: string,
  ): Promise<string> {
    // Verify OTP
    const isOtpValid = this.otpService.verifyOtp(email, otp);

    if (!isOtpValid) {
      return 'Invalid or expired OTP. Please try again.';
    }


    return 'Password reset successful.';
  }
}

