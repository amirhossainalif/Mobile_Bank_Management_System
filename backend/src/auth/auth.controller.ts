import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    @Post('login')
    async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
    //@Req() req:Request
    ) {
    const result = await this.authService.login(email, password, res);
    //req.session.id = result.;

    return res.status(200).json({
        message: result.message,
        accessToken: result.token, // Ensure token is returned properly
    });
    }


    @Post('logout')
    async logout(@Res() res: Response) {
        res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
        return res.status(200).json({ message: 'Logged out successfully' });
    }
}
