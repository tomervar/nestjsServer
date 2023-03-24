import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt/jwt-auth.guard';
import { UsersService } from './users.service';
import { HasRoles } from '../auth/strategies/role/has-role.decorator';
import { Role } from './role.enum';
import { RolesGuard } from '../auth/strategies/role/roles.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUser(@Req() req: any): any {
    return this.usersService.returnUser(req.user.username);
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAllUsers(): any {
    return this.usersService.returnAllUsers();
  }
}
