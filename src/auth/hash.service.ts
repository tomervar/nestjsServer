/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const SALT_OR_ROUNDS = 10;

@Injectable()
export class HashService {
  async hashPassword(password: string): Promise<any> {
    return bcrypt.hash(password, SALT_OR_ROUNDS);
  }

  async comparePasswords(
    newPassword: string,
    hashPassword: string,
  ): Promise<any> {
    return bcrypt.compare(newPassword, hashPassword);
  }
}
