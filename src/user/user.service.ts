import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import type { CreateDto } from './dto/create.dto';

export type UserProfile = Pick<User, 'id' | 'name'>;
export const toUserProfile = (user: User): UserProfile => ({
  id: user.id,
  name: user.name,
});

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(userInfo: CreateDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);
    try {
      const user: User = await this.prismaService.user.create({
        data: { ...userInfo, password: hashedPassword },
      });
      return user;
    } catch (e) {
      throw e;
    }
  }

  async findById(id: string): Promise<User | null> {
    const user: User | null = await this.prismaService.user.findUnique({
      where: { id },
    });
    return user;
  }

  async findByName(name: string): Promise<User | null> {
    const user: User | null = await this.prismaService.user.findUnique({
      where: { name },
    });
    return user;
  }

  async getUserIfRefreshTokenMatches(
    id: string,
    refreshToken: string,
  ): Promise<User | null> {
    const user: User | null = await this.findById(id);
    if (user && user.refreshToken) {
      const isRefreshTokenMatching = await bcrypt.compare(
        refreshToken,
        user.refreshToken,
      );
      if (isRefreshTokenMatching) {
        return user;
      }
    }
    return null;
  }

  async setRefreshToken(id: string, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prismaService.user.update({
      where: { id },
      data: { refreshToken: hashedRefreshToken },
    });
  }

  async removeRefreshToken(id: string): Promise<void> {
    await this.prismaService.user.update({
      where: { id },
      data: { refreshToken: null },
    });
  }
}
