import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from '../DB/Login.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(Login)
    private readonly merchantRepo: Repository<Login>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    const merchant = await this.merchantRepo.findOne({ where: { token } });

    if (!merchant) {
      throw new UnauthorizedException('Invalid token');
    }

    request.merchant = merchant;
    return true;
  }
}
