import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from 'src/DB/Login.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Login) private loginRepository: Repository<Login>,
        private jwtService: JwtService,
    ) {}

    async login(email: string, password: string, res: Response) {
        const user = await this.loginRepository.findOne({ where: { email } });
      
        if (!user || !(await user.validatePassword(password))) {
          throw new UnauthorizedException('Invalid credentials'); 
        }
      
        const payload = { email: user.email, sub: user.id };
        //const token = this.jwtService.sign(payload);
      
        const token = this.jwtService.sign(payload, {
          secret: 'your_jwt_secret', 
          expiresIn: '1h',
        });
        
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 1000, 
        });
      
        return { message: 'Login successful', token }; 
      }
}
