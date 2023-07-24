import { Body, Controller, Post } from '@nestjs/common';
import type { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import type { UserProfile } from 'src/user/user.service';
import { UserService, toUserProfile } from 'src/user/user.service';
import { Public } from './decorator/public.decorator';
import { SignDto } from './dto/user.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async localAuth(@Body() body: SignDto): Promise<UserProfile | null> {
    const user: User | null = await this.userService.findByName(body.username);
    if (user) {
      const isValidPassword = await bcrypt.compare(
        body.password,
        user.password,
      );
      if (isValidPassword) {
        return toUserProfile(user);
      }
    } else {
      const newUser: User = await this.userService.create({
        name: body.username,
        password: body.password,
      });
      return toUserProfile(newUser);
    }
    return null;
  }
}
