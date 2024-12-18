import { IsEmail, IsNotEmpty, IsNumber, isString, IsString } from 'class-validator';

export class CreateMerchantDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsNumber()
  balance: number;
}
