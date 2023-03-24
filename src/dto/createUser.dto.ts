/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { usernameNotRegistered } from '../pipes/validation/usernameNotRegistered.role';

export class CreateUserDto {
  @IsNotEmpty()  
  @IsString()
  @usernameNotRegistered({ message: 'username already registered' }) // check if username is unique
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsBoolean()
  isAdmin: boolean;
}
