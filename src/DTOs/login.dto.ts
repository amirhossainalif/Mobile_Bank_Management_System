import { IsEmail, IsNotEmpty, IsNumber, isString, IsString, Matches } from 'class-validator';
import { Column } from 'typeorm';

export class LoginMerchantDTO {

    @IsEmail({}, { message: 'Invalid email address format' })
    @IsNotEmpty({ message: 'Email address cannot be empty' })
    email: string;

    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: 'Invalid Password format. use minimum 1 special character, 1 upper, 1 lower character, number',
    })
    password: string;

}