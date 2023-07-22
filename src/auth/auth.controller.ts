import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Response } from 'express';
import { CurrentUser } from 'src/user/decorator/current.decorator';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get()
  async googleAuth(): Promise<void> {
    return;
  }

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('redirect')
  async googleAuthRedirect(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    await this.authService.googleLogin(user, res);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    // I will not refresh by refresh token itself
    // because I want to make user re-login when refresh token expires
    await this.authService.setCookie(res, user, 'access');
  }

  @Get('signout')
  async signOut(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    // Erase saved tokens in frontend and refresh token in database
    await this.authService.removeCookies(res, user);
  }
}
