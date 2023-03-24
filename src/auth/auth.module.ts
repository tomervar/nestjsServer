import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local/local.strtegy';
import { JwtStrategy } from './strategies/jwt/jwt.strategy';
import { HashService } from './hash.service';
import { jwtConfig } from '../config/jwt.config';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.registerAsync(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, HashService],
  exports: [AuthService],
})
export class AuthModule {}
