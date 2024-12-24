import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Merchant } from './M_a.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: 'deposit' | 'withdrawal' | 'transfer' ;

  @Column({ type: 'numeric' })
  amount: number;

  @ManyToOne(() => Merchant, (merchant) => merchant.id)
  merchant: Merchant;

  @Column({ nullable: true })
  recipientId?: number;

  @CreateDateColumn()
  createdAt: Date;
}
