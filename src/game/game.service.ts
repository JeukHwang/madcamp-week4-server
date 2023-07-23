import { BadRequestException, Injectable } from '@nestjs/common';
import type { Game, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import type { CreateDto } from './dto/game.dto';

export type GameProfile = Pick<
  Game,
  'id' | 'name' | 'createdAt' | 'json' | 'creatorId'
>;
export const toGameProfile = (game: Game): GameProfile => ({
  id: game.id,
  name: game.name,
  createdAt: game.createdAt,
  json: game.json,
  creatorId: game.creatorId,
});

@Injectable()
export class GameService {
  constructor(private prismaService: PrismaService) {}
  async create(body: CreateDto, user: User): Promise<Game> {
    const isValid = body ? true : false;
    if (!isValid) {
      throw new BadRequestException();
    }
    try {
      const game = await this.prismaService.game.create({
        data: {
          creatorId: user.id,
          name: body.name,
          json: body.json as Prisma.JsonObject,
        },
      });
      return game;
    } catch (e) {
      throw e;
    }
  }

  async findById(id: string): Promise<Game | null> {
    const game: Game | null = await this.prismaService.game.findUnique({
      where: { id },
    });
    return game;
  }

  async solve(gameId: string, user: User): Promise<void> {
    const game: Game | null = await this.findById(gameId);
    if (!game) {
      throw new BadRequestException();
    }
    await this.prismaService.userGame.create({
      data: {
        userId: user.id,
        gameId: game.id,
      },
    });
  }
}
