import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user: User | null = await this.userService.findByName(username);
    if (user) {
      try {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          // save into req.user
          return user;
        }
      } catch (e) {
        throw new UnauthorizedException(e);
      }
    }
    throw new UnauthorizedException();
  }
}
