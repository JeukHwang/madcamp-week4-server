import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
dotenv.config();

// I will not give any options to JwtModule.register function
// because I will use it with two different options; access token and refresh token
@Module({
  imports: [UserModule, PassportModule, JwtModule.register({})],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
