import { IsDate, IsEmail, IsNotEmpty, IsNumber, isString, IsString } from 'class-validator';

export class CreateMerchantDTO {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  amount: number;

  @IsDate()
  createdAt: Date;
  
}