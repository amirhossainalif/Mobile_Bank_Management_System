import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from "@nestjs/common";

@Entity('Merchant')
export class Merchant{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @Column()
    address: string;

    @Column({unique: true})
    email: string;

    @Column({ default: 0 })
    balance: number;
}

    // async validatePassword(password: string): Promise<boolean> {
    //     if(!bcrypt.compare(password, this.password))
    //     {
    //         throw new UnauthorizedException('Wrong Password');
    //     }
    //     else{
    //         return bcrypt.compare(password, this.password);
    //     }
        
    //   }
//}