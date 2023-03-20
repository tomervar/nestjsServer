import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/strategies/jwt/jwt-auth.guard';
import { LocalAuthGuard } from './auth/strategies/local/local-auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { User, UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authServise: AuthService,
    private readonly userServise: UsersService,
  ) {}

  @Post('register')
  registerNewUser(@Body() createUserDto: CreateUserDto): any {
    console.log(createUserDto);
    return this.authServise.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginUser(@Request() req): any {
    return this.authServise.login(req.user);
  }
}
