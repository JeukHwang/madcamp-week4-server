import { ForbiddenException } from '@nestjs/common';
import { josa } from '@toss/hangul';
import type { GameInstance } from './game';
import { Position } from './move';
import { erase, input, logAndPrint } from './util';

export async function getPositionsFromInput(
  game: GameInstance,
): Promise<Position[]> {
  logAndPrint('[ 입력 ]');
  while (true) {
    try {
      const str = await input(
        `WASD키를 눌러 최대 ${game.player.property.health}칸을 움직이세요. : `,
      );
      const positions: Position[] = [];
      const chars = str.split('');
      for (const char of chars) {
        const pos = positions[positions.length - 1] || game.player.position;
        switch (char) {
          case 'w':
            positions.push(new Position(pos.x - 1, pos.y));
            break;
          case 'a':
            positions.push(new Position(pos.x, pos.y - 1));
            break;
          case 's':
            positions.push(new Position(pos.x + 1, pos.y));
            break;
          case 'd':
            positions.push(new Position(pos.x, pos.y + 1));
            break;
          default:
            throw new ForbiddenException('Invalid input');
        }
      }
      erase();
      erase();
      return positions;
    } catch (e) {
      erase();
      continue;
    }
  }
}

const numKor = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];

export async function getIntegerFromInput(
  min: number,
  max: number,
): Promise<number> {
  logAndPrint('[ 입력 ]');
  while (true) {
    try {
      const msg =
        min !== max
          ? `${min} 이상 ${max} 이하 정수를 입력하세요. : `
          : `${min}${josa(numKor[min % 10], '을/를')[1]} 입력하세요. : `;
      const str = await input(msg);
      const number = parseInt(str, 10);
      const isValid = number.toString() === str;
      const isInteger = !isNaN(number) && Number.isInteger(number);
      const isInRange = min <= number && number <= max;
      if (!isValid || !isInteger || !isInRange) {
        continue;
      }
      erase();
      erase();
      return number;
    } catch (e) {
      erase();
      continue;
    }
  }
}
