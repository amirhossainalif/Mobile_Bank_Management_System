import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.token || request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException("No token found in cookies!");
    }

    try {
      const decoded = this.jwtService.verify(token, { secret: 'your_jwt_secret' });
      request.user = decoded; 
      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid token!");
    }
  }
}
