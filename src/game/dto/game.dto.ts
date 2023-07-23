import { Prisma } from '@prisma/client';
import { IsJSON, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  name: string;
  @IsJSON()
  json: Prisma.JsonObject;
}

export class SolveDto {
  @IsString()
  gameId: string;
}
