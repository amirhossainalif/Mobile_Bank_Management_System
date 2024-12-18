import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from '../DB/M_a.entity';
import { CreateMerchantDTO } from '../DTOs/create.dto'
import { Transaction } from '../DB/transaction.entity'
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MerchantService {
    constructor(
        @InjectRepository(Merchant)
        private merchentRepo: Repository<Merchant>,

        @InjectRepository(Transaction)
        private transactionRepo: Repository<Transaction>,
    ){}




    create(Merchant: CreateMerchantDTO): Promise<Merchant> {
      const merchant = this.merchentRepo.create(Merchant);
      return this.merchentRepo.save(merchant);
    }

  
    findAll() {
      return this.merchentRepo.find();
    }
  
    findOne(id: number) {
      return this.merchentRepo.findOne({ where: { id } });
    }
  
    update(id: number, updatedMerchant: Partial<Merchant>) {
      return this.merchentRepo.update(id, updatedMerchant);
    }
  
    remove(id: number) {
      return this.merchentRepo.delete(id);
    }


  async getAccountDetails(id: number) {
    const merchant = await this.merchentRepo.findOne({ where: { id } });
    if (!merchant) throw new NotFoundException('Merchant not found');
    return merchant;
  }


  async deposit(id: number, amount: number) {
    const merchant = await this.getAccountDetails(id);
    merchant.balance += amount;
    await this.merchentRepo.save(merchant);

    const transaction = this.transactionRepo.create({
      type: 'deposit',
      amount,
      merchant,
    });
    return this.transactionRepo.save(transaction);
  }


  async withdraw(id: number, amount: number) {
    const merchant = await this.getAccountDetails(id);
    if (merchant.balance < amount) throw new Error('Insufficient balance');

    merchant.balance -= amount;
    await this.merchentRepo.save(merchant);

    const transaction = this.transactionRepo.create({
      type: 'withdrawal',
      amount,
      merchant,
    });
    return this.transactionRepo.save(transaction);
  }


  async transfer(senderId: number, recipientId: number, amount: number) {
    const sender = await this.getAccountDetails(senderId);
    const recipient = await this.getAccountDetails(recipientId);

    if (sender.balance < amount) throw new Error('Insufficient balance');

    sender.balance -= amount;
    recipient.balance += amount;

    await this.merchentRepo.save([sender, recipient]);

    const transaction = this.transactionRepo.create({
      type: 'transfer',
      amount,
      merchant: sender,
      recipientId: recipientId,
    });
    return this.transactionRepo.save(transaction);
  }


  async getTransactionHistory(merchantId: number) {
    return this.transactionRepo.find({ where: { merchant: { id: merchantId } } });
  }

  async login(merchantId: number) {
    const merchant = await this.merchentRepo.findOne({ where: { id: merchantId } });
    if (!merchant) 
      throw new UnauthorizedException('Invalid credentials');
    merchant.token = uuidv4(); 
    await this.merchentRepo.save(merchant);
    return { message: 'Login successful', token: merchant.token, merchant };
  }

  async logout( id: number) {
    const merchant = await this.merchentRepo.findOne({ where: { id } });

    if (!merchant) {
      throw new UnauthorizedException('Invalid token or already logged out');
    }

    merchant.token = null; 
    const m = await this.merchentRepo.save(merchant);

    return { message: 'Logout successful', m };
  }

    
  // }


}
