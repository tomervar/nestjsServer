import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from './hash.service';
import { CreateUserDto } from '../dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUser(username);

    if (user && this.hashService.comparePasswords(password, user.password)) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }
  async validUserName(username: string): Promise<boolean> {
    const user = this.usersService.findUser(username);
    return !user ? true : false;
  }

  async login(user: any) {
    const payload = { id: user.id, username: user.username, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const hashPassword = await this.hashService.hashPassword(
      createUserDto.password,
    );
    return this.usersService.createUser(
      createUserDto.username,
      hashPassword,
      createUserDto.isAdmin,
    );
  }
}
