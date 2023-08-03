interface Position {
  x: number;
  y: number;
}

interface Tile {
  position: Position;
  type: string;
}

interface Wall Tile {
  type: 'wall';
  isTransparent: boolean;
}

interface Switch extends Tile {
  type: 'switch';
  red: boolean;
  green: boolean;
  blue: boolean;
  door: Position[];
}

interface Door extends Tile {
  type: 'door';
  angle: '0' | '90' | '180' | '270';
  open: boolean;
  switch: Switch[]; // Position[]
}

interface Player extends Tile {
  type: 'player';
}

interface GameMap {
  width: number;
  height: number;
  tiles: Tile[];
}

interface Torch {
  position: Position;
  type: 'torch';
  red: boolean;
  green: boolean;
  blue: boolean;
  on: boolean;
}
