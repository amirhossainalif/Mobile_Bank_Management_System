import { IsEmail, IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from "@nestjs/common";

@Entity('login')
export class Login {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  //@IsEmail({}, { message: 'Invalid email address format' })
  //@IsNotEmpty({ message: 'Email address cannot be empty' })
  email: string;

  @Column()
  password: string;


  // async validatePassword(password: string): Promise<boolean> {
  //   if(!bcrypt.compare(password, this.password))
  //   {
  //       throw new UnauthorizedException('Wrong Password');
  //   }
  //   else{
  //       return bcrypt.compare(password, this.password);
  //   }
    
  // }


  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
}

}