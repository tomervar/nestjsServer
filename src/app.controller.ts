import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/strategies/local/local-auth.guard';
import { CreateUserDto } from './dto/createUser.dto';

@Controller()
export class AppController {
  constructor(private readonly authServise: AuthService) {}

  @Post('register')
  registerNewUser(@Body() createUserDto: CreateUserDto): any {
    console.log(createUserDto);
    return this.authServise.register(createUserDto); // return the user without password
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  loginUser(@Request() req): any {
    return this.authServise.login(req.user); // return access token of jwt
  }
}
