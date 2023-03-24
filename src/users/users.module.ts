import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { IsUsernameNotRegistered } from 'src/pipes/validation/usernameNotRegistered.role';

@Module({
  controllers: [UsersController],
  providers: [UsersService, IsUsernameNotRegistered],
  exports: [UsersService],
})
export class UsersModule {}
