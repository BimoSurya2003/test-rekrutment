import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService) {}

    @Post('register')
    register(@Body() body) {
        return this.auth.register(body);
    }

    @Post('login')
    login(@Body() body) {
        return this.auth.login(body);
    }

    @UseGuards(JwtGuard)
    @Post('logout')
    logout(@Req() req) {
        return { message: 'Logged out successfully' };
    }
}
