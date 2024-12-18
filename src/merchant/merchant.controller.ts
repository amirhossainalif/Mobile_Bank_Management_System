import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Headers } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { Merchant } from '../DB/M_a.entity';
import { CreateMerchantDTO } from '../DTOs/create.dto'
import { AuthGuard } from '../authentication/auth.guard'


@Controller('merchant')
export class MerchantController {
    constructor(private readonly merchantService: MerchantService) {}

  // Create new merchant
  // @Post("/add")
  // async create(@Body() merchantData: Partial<Merchant>): Promise<Merchant> {
  //   return this.merchantService.createMerchant(merchantData);
  // }

  // @Post("/add")
  // createMerchant(@Body() data)
  // {
  //   return this.merchantService.createMerchant(data)
  // }

  // Get all merchants
  //@Get("/getAllMarchent")
  // async findAll(): Promise<Merchant[]> {
  //   return this.merchantService.getMerchants();
  // }
  // findAll(){
  //   return this.merchantService.getMerchants()
  // }

  // Get merchant by id
  // @Get('/getMerchent/:id')
  // async findOne(@Param('id') id: number): Promise<Merchant> {
  //   return this.merchantService.getMerchantById(id);
  // }

  // Update merchant status
 /* @Patch('/updateMarchent/:id/status')
  async updateStatus(@Param('id') id: number, @Body() statusData: { isActive: boolean }): Promise<Merchant> {
    return this.merchantService.updateMerchantStatus(id, statusData.isActive);
  }*/

    @Post("/add")
  create(@Body() Merchant: CreateMerchantDTO) {
    return this.merchantService.create(Merchant);
  }

  //   @Post("/add")
  // create(@Body() merchant: Partial<Merchant>) {
  //   return this.merchantService.create(merchant);
  // }

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

  // @Get('/transaction/:id')
  // getAccountDetails(@Param('id') id: number) {
  //   return this.merchantService.getAccountDetails(id);
  // }

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


  // Login Route: Generate a token
  @Post('/login')
  login(@Body('id') id: number) {
    return this.merchantService.login(id);
  }

  // Logout Endpoint
  @Post('/logout/:id')
  logout(@Param('id') id: number) {
    return this.merchantService.logout(id);
  }
}

