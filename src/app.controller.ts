import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/strategies/local/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authServise: AuthService,
  ) {}

  @Post('register')
  registerNewUser(): any {
    return null;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginUser(@Request() req): any {
    return this.authServise.login(req.user);
  }

  @Get('user/me')
  getUser(): any {
    return this.appService.getHello();
  }

  @Get('user')
  getAllUsers(): any {
    return this.appService.getHello();
  }
}
