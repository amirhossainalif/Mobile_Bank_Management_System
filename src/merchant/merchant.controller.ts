import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Headers } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { Merchant } from '../DB/M_a.entity';
import { CreateMerchantDTO } from '../DTOs/create.dto'
import { AuthGuard } from '../authentication/auth.guard'


@Controller('merchant')
export class MerchantController {
    constructor(private readonly merchantService: MerchantService) {}


    @Post("/add")
  create(@Body() Merchant: CreateMerchantDTO) {
    return this.merchantService.create(Merchant);
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
  login(@Body('id') id: number) {
    return this.merchantService.login(id);
  }

  @Post('/logout/:id')
  logout(@Param('id') id: number) {
    return this.merchantService.logout(id);
  }
}

