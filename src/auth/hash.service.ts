/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';


@Injectable()
export class HashService {
  constructor(private configService: ConfigService){}
  async hashPassword(password: string): Promise<any> {
    return bcrypt.hash(password, parseInt(this.configService.get("SALT_OR_ROUNDS")));
  }

  async comparePasswords(
    newPassword: string,
    hashPassword: string,
  ): Promise<any> {
    return bcrypt.compare(newPassword, hashPassword);
  }
}
