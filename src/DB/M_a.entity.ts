import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Merchant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;


  @Column({ default: 0 })
  balance: number;

  @Column({ nullable: true })
  token: string;

}
