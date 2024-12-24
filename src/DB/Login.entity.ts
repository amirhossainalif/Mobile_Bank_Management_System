import { IsEmail, IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('login')
export class Login {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail({}, { message: 'Invalid email address format' })
  @IsNotEmpty({ message: 'Email address cannot be empty' })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token: string;

}