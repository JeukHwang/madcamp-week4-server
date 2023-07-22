import { ForbiddenException } from '@nestjs/common';
import { randomInt } from 'crypto';
import type { Player } from './player';
import type { Tile } from './tile';
import { isArrayUnique } from './util';
import { GameConstant } from './constant';

export type PositionJSON = {
  x: number;
  y: number;
};

export class Position {
  constructor(public x: number, public y: number) {
    if (
      0 <= x &&
      x < GameConstant.mapSize &&
      0 <= y &&
      y < GameConstant.mapSize
    ) {
      return;
    }
    throw new ForbiddenException('Invalid x, y to make position');
  }

  toIndex(): number {
    return this.x * GameConstant.mapSize + this.y;
  }

  static fromIndex(index: number) {
    if (0 <= index && index < GameConstant.mapSize * GameConstant.mapSize) {
      return new Position(
        Math.floor(index / GameConstant.mapSize),
        index % GameConstant.mapSize,
      );
    }
    throw new ForbiddenException('Invalid index to make position');
  }

  static random() {
    return Position.fromIndex(
      randomInt(0, GameConstant.mapSize * GameConstant.mapSize),
    );
  }

  static fromJson(json: PositionJSON): Position {
    return new Position(json.x, json.y);
  }

  toJson(): PositionJSON {
    return {
      x: this.x,
      y: this.y,
    };
  }
}

export class Move {
  positions: Position[];
  tiles: Tile[];
  constructor(
    public indices: number[],
    public player: Player,
    public map: Tile[],
  ) {
    this.positions = indices.map(Position.fromIndex);
    this.tiles = this.indices.map((index) => this.map[index]);
    if (!this.isValid()) {
      throw new ForbiddenException('Invalid move');
    }
  }

  isValid(): boolean {
    const isNotEmpty = this.indices.length > 0;
    const isUnique = isArrayUnique([
      this.player.position.toIndex(),
      ...this.indices,
    ]);
    const isAdjacentMoving = this.positions.every((index, i, positions) => {
      const { x: x1, y: y1 } = positions[i - 1] || this.player.position;
      const { x: x2, y: y2 } = positions[i];
      return Math.abs(x1 - x2) + Math.abs(y1 - y2) === 1;
    });
    const isPossibleMoveNum =
      this.indices.length <= this.player.property.health;
    return isNotEmpty && isUnique && isAdjacentMoving && isPossibleMoveNum;
  }
}
