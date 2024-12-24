import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from '../DB/M_a.entity';
import { CreateMerchantDTO } from '../DTOs/create.dto'
import { Transaction } from '../DB/transaction.entity'
import { v4 as uuidv4 } from 'uuid';
import { Login } from '../DB/Login.entity'
import { LoginMerchantDTO } from '../DTOs/login.dto'
import { promises } from 'dns';

@Injectable()
export class MerchantService {
    constructor(
        @InjectRepository(Merchant)
        private merchentRepo: Repository<Merchant>,

        @InjectRepository(Transaction)
        private transactionRepo: Repository<Transaction>,

        @InjectRepository(Login)
        private loginRepo: Repository<Login>
    ){}

    async create(name: string, email: string, phoneNumber: string, address: string, balance: number, password: string): Promise<Merchant> {
      //const merchant = this.merchentRepo.create(Merchant);
      //const login = this.loginRepo.create(Login)
      const merchant = new Merchant();
      merchant.name = name;
      merchant.email = email;
      merchant.phoneNumber = phoneNumber;
      merchant.address = address;
      merchant.balance = balance;
      
      const saveuser = await this.merchentRepo.save(merchant);

      const login = new Login();
      login.password = password;

      await this.loginRepo.save(login);

      return saveuser;
    }


    findAll() {
      return this.loginRepo.find();
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

  async login(id: number, password: string) {
    const login = await this.loginRepo.findOne({ where: { id: id, password: password } });
    if (!login) {
      throw new UnauthorizedException('Invalid user');
    }
    login.token = uuidv4(); 
    const t = await this.loginRepo.save(login);
    return  { message: 'Login successfull', t};
  }

  async logout( id: number) {
    const merchant = await this.loginRepo.findOne({ where: { id } });

    if (!merchant) {
      throw new UnauthorizedException('Invalid token or already logged out');
    }

    merchant.token = null; 
    const m = await this.loginRepo.save(merchant);

    return { message: 'Logout successful', m };
  }




}
