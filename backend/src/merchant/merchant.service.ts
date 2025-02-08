import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from 'src/DB/Login.entity';
import { Merchant } from 'src/DB/Reg.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Transaction } from 'src/DB/transaction.entity'
import { Message } from 'src/DB/message.entity';

@Injectable()
export class MerchantService {
    constructor(
        @InjectRepository(Merchant) private userRepository: Repository<Merchant>,
        @InjectRepository(Login) private loginRepo: Repository<Login>,
        @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
        @InjectRepository(Message) private messageRepository: Repository<Message>,
    ){}

    async register( email: string, password: string, name: string, phoneNumber: string, address: string, balance: number): Promise<void> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ email,name, phoneNumber, address, balance});
        const user1 = this.loginRepo.create({ email, password: hashedPassword});
        await  this.loginRepo.save(user1), this.userRepository.save(user);
        //await this.loginRepo.save(user1);
    }


    // async findByEmail(email: string): Promise<Merchant | null> {
    //     return await this.userRepository.findOne({ where: { email } });
    // }

    async getMerchantProfile(email: string) {
      return await this.userRepository.findOne({ where: { email } });
  }
    async getTransactions(userId: number) {
        return await this.transactionRepository.find({
            where: [{ senderId: userId }, { receiverId: userId }],
        });
    }
    async getMerchantlogin(email: string) {
      return await this.loginRepo.findOne({ where: { email } }), this.userRepository.findOne({ where: { email } });
      //const b = await this.userRepository.findOne({ where: { email } });
      //return [b,a];
  }

  
  

    async findByEmail(email: string) {
      return this.userRepository.findOne({ where: { email } });
    }
    
    
    async getMerchantById(id: number): Promise<Merchant> {
        return await this.userRepository.findOne({ where: { id } });
    }

    async transferMoney(senderId: number, receiverId: number, amount: number) {
        const sender = await this.userRepository.findOne({ where: { id: senderId } });
        const receiver = await this.userRepository.findOne({ where: { id: receiverId } });
    
        if (!sender || !receiver) {
          throw new NotFoundException('Sender or Receiver not found');
        }
    
        if (sender.balance < amount) {
          throw new UnauthorizedException('Insufficient balance');
        }
        
        sender.balance -= amount;
        receiver.balance += amount;

        await this.userRepository.save(receiver);
        await this.userRepository.save(sender);
    
        const transaction = this.transactionRepository.create({
          senderId: sender.id,
          receiverId: receiver.id,
          amount,
          date: new Date(),
        });
        await this.transactionRepository.save(transaction)
        return { message: 'Transfer successful', balance: sender.balance };
    }

    async getTransactionHistory(userId: number, startDate: Date, endDate: Date): Promise<Transaction[]> {
      const user = await this.userRepository.findOne({ where: { id: userId } });
    
      if (!user) {
        throw new NotFoundException('User not found');
      }

    const startOfDay = new Date(startDate);
    const endOfDay = new Date(endDate);
    endOfDay.setUTCHours(23, 59, 59, 999);
  
    return this.transactionRepository
      .createQueryBuilder('transaction')
      .where('(transaction.senderId = :userId OR transaction.receiverId = :userId)', { userId })
      .andWhere('transaction.date BETWEEN :startOfDay AND :endOfDay', { startOfDay, endOfDay })
      .orderBy('transaction.date', 'DESC')
      .limit(5)
      .getMany();
  }
    
    

      async updateMerchantInfo(
        id: number,
        name: string,
        phoneNumber: string,
        address: string,
        email: string,
        password?: string
    ) {
        const merchant = await this.userRepository.findOne({ where: { id } });
        if (!merchant) throw new NotFoundException('Merchant not found');

        const login = await this.loginRepo.findOne({ where: { email: merchant.email } });
        if (!login) throw new NotFoundException('Login data not found');

        merchant.name = name;
        merchant.phoneNumber = phoneNumber;
        merchant.address = address;
        await this.userRepository.save(merchant);

        login.email = email;
        if (password) {
            login.password = await bcrypt.hash(password, 10);
        }
        await this.loginRepo.save(login);

        return { message: 'Merchant info updated successfully' };
    }
}
