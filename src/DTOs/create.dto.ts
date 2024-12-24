import { IsEmail, IsNotEmpty, IsNumber, isString, IsString, Matches } from 'class-validator';
import { Column } from 'typeorm';

export class CreateMerchantDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'Invalid email address format' })
  @IsNotEmpty({ message: 'Email address cannot be empty' })
  email: string;

  @IsString()
  @IsNotEmpty()
  // @Matches(/^([+880]{4}[1]{1}[0-9]{3}[-][0-9]{6})$/, {
  //   message: 'Invalid phone number format +880 1XXX-XXXXXX',
  // })
  phoneNumber: string;

  @Column()
  address: string;

  @IsNumber()
  balance: number;
}
