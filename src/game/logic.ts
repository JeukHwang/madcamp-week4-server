interface Position {
  x: number;
  y: number;
}

interface Tile {
  position: Position;
  type: string;
}

interface Wall extends Tile {
  type: 'wall';
  visible: boolean;
}

interface Switch extends Tile {
  type: 'switch';
  active: boolean;
  color: {
    r: boolean;
    g: boolean;
    b: boolean;
  };
}

interface Door extends Tile {
  type: 'door';
  orientation: 'vertical' | 'horizontal';
  open: boolean;
  switch: Switch[];
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
  color: {
    r: boolean;
    g: boolean;
    b: boolean;
  };
}
