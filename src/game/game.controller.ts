import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { Game } from '@prisma/client';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/user/decorator/current.decorator';
import { CreateDto, SolveDto } from './dto/game.dto';
import type { GameProfile } from './game.service';
import { GameService, toGameProfile } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}
  @Get('create')
  async createGame(
    @CurrentUser() user: User,
    @Body() body: CreateDto,
  ): Promise<GameProfile> {
    const game: Game = await this.gameService.create(body, user);
    return toGameProfile(game);
  }

  @Get('id/:id')
  async findById(@Param('id') id: string): Promise<GameProfile | null> {
    const game: Game | null = await this.gameService.findById(id);
    return game ? toGameProfile(game) : null;
  }

  @Post('solve')
  async solve(
    @CurrentUser() user: User,
    @Body() body: SolveDto,
  ): Promise<void> {
    return this.gameService.solve(body.gameId, user);
  }
}
