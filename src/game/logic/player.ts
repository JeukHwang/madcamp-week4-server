import type { InventoryItem } from './intventory';
import { Inventory } from './intventory';
import type { PositionJSON } from './move';
import { Position } from './move';
import type { TileLanguage } from './tile';
import { Language } from './tile';

type PlayerProperty = {
  health: number;
  money: number;
  experience: { [key in TileLanguage]: number };
  level: { [key in TileLanguage]: number };
  levelEnabled: { [key in TileLanguage]: boolean };
  inventory: { [key in InventoryItem]: number };
};

export type PlayerJSON = {
  position: PositionJSON;
  property: PlayerProperty;
};

export class Player {
  public property: PlayerProperty;
  constructor(public position: Position) {
    this.property = {
      health: 0,
      money: 0,
      experience: Object.fromEntries(Language.data.map((s) => [s, 0])) as {
        [k in TileLanguage]: number;
      },
      level: Object.fromEntries(Language.data.map((s) => [s, 0])) as {
        [k in TileLanguage]: number;
      },
      levelEnabled: Object.fromEntries(
        Language.data.map((s) => [s, false]),
      ) as {
        [k in TileLanguage]: boolean;
      },
      inventory: Object.fromEntries(Inventory.data.map((s) => [s, 0])) as {
        [k in InventoryItem]: number;
      },
    };
  }

  static random(): Player {
    return new Player(Position.random());
  }

  static fromJson(json: PlayerJSON): Player {
    const player = new Player(Position.fromJson(json.position));
    player.property = json.property;
    return player;
  }

  toJson(): PlayerJSON {
    return {
      position: this.position.toJson(),
      property: this.property,
    };
  }
}
