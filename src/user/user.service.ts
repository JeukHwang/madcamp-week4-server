import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import type { CreateDto } from './dto/create.dto';

export type UserProfile = Pick<User, 'id' | 'name' | 'photo'>;
export const toUserProfile = (user: User): UserProfile => ({
  id: user.id,
  name: user.name,
  photo: user.photo,
});

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(userInfo: CreateDto): Promise<User> {
    try {
      const user: User = await this.prismaService.user.create({
        data: { ...userInfo },
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

  async findByGoogleId(googleId: string): Promise<User | null> {
    const user: User | null = await this.prismaService.user.findUnique({
      where: { googleId },
    });
    return user;
  }

  async getLeaderboard(): Promise<{ user: UserProfile; score: number }[]> {
    const users = await this.prismaService.user.findMany({
      include: { games: { select: { score: true } } },
    });
    const sortedUsers = users.sort((a, b) => {
      const scoreA = Math.max(...a.games.map((game) => game.score));
      const scoreB = Math.max(...b.games.map((game) => game.score));
      return scoreA > scoreB ? -1 : 1;
    });
    return sortedUsers.map((user) => {
      return {
        user: toUserProfile(user),
        score: Math.max(...user.games.map((game) => game.score)),
      };
    });
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
