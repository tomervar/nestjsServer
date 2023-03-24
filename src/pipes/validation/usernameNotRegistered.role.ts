/* eslint-disable prettier/prettier */
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../../users/users.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUsernameNotRegistered implements ValidatorConstraintInterface {
  constructor(
    private readonly usersService: UsersService
    ) {}

  validate(username: any) {
    return this.usersService.findUser(username).then((user) => {
      return user === undefined;
    });
  }
}

export function usernameNotRegistered(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameNotRegistered,
    });
  };
}
