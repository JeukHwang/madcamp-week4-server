import * as dotenv from 'dotenv';
import { isDev } from 'src/util';
dotenv.config();

export const GameConstant = {
  mapSize: 5,
  defaultHealth: 4,
  experienceThreshold: 2,
  levelThreshold: 4,
  preserveLog: process.env.PRESERVE_LOG || isDev,
  uniqueLog: true,
  bigTurn: 7,
} as const;
