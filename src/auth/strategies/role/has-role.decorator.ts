/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
import { Role } from '../../../users/role.enum';

export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);