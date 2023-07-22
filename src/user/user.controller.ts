import { Controller, Get, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { Public } from 'src/auth/decorator/public.decorator';
import { CurrentUser } from './decorator/current.decorator';
import type { UserProfile } from './user.service';
import { UserService, toUserProfile } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current')
  async getCurrentUser(@CurrentUser() user: User): Promise<UserProfile> {
    return toUserProfile(user);
  }

  @Get('id/:id')
  async getOneUser(@Param('id') id: string): Promise<UserProfile | null> {
    const user = await this.userService.findById(id);
    return user ? toUserProfile(user) : null;
  }

  // Temporarily public
  @Public()
  @Get('leaderboard')
  async getLeaderboard(): Promise<{ user: UserProfile; score: number }[]> {
    return await this.userService.getLeaderboard();
  }
}
