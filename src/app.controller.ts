import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { AppService } from './app.service';
import { Public } from './auth/decorator/public.decorator';
import { CurrentUser } from './user/decorator/current.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('/test/public')
  getDatePublicly(): string {
    return this.appService.getDatePublicly();
  }

  @Get('/test/private')
  getDatePrivately(@CurrentUser() user: User): string {
    return this.appService.getDatePrivately(user);
  }
}
