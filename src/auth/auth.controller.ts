import { Body, Controller, Post } from '@nestjs/common';
import type { User } from '@prisma/client';
import type { UserProfile } from 'src/user/user.service';
import { UserService, toUserProfile } from 'src/user/user.service';
import { Public } from './decorator/public.decorator';
import { SignDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async localAuth(@Body() body: SignDto): Promise<UserProfile> {
    const user: User = await this.userService.create({
      name: body.username,
      password: body.password,
    });
    return toUserProfile(user);
  }
}
