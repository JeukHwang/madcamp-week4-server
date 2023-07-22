import { getRandomElement } from './util';

export class Inventory {
  static data = ['커피', '에너지드링크'] as const;

  static random(): InventoryItem {
    return getRandomElement(
      Inventory.data as unknown as string[],
    ) as InventoryItem;
  }

  static toId(item: InventoryItem): number {
    return Inventory.data.indexOf(item);
  }
}

export type InventoryItem = typeof Inventory.data[number];
