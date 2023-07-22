import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { toUserProfile } from './user/user.service';

@Injectable()
export class AppService {
  getDatePublicly(): string {
    return `Public Date | ${new Date().toISOString()}`;
  }

  getDatePrivately(user: User): string {
    return `Private Date | ${new Date().toISOString()} | ${JSON.stringify(
      toUserProfile(user),
    )}}`;
  }
}
