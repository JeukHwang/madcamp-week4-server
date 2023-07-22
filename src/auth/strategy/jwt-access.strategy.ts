import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { User } from '@prisma/client';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import type { JwtPayload } from '../payload';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.Authentication, // get cookie with name "Authentication"
      ]),
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user: User | null = await this.userService.findById(payload.id);
    if (!user) {
      throw new UnauthorizedException('Access Failure');
    }
    // save into req.user
    return user;
  }
}
