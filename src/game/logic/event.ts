import * as clc from 'cli-color';
import type { EventTitle } from '../event/events';
import { GameConstant } from './constant';
import type { GameInstance } from './game';
import { logAndPrint } from './util';

export type GameCondition = (game: GameInstance) => boolean;
export type GameEffect = (game: GameInstance) => boolean;
export const NoCondition: GameCondition = () => true;
export const StartOfWeek: GameCondition = (game) =>
  game.property.turn % GameConstant.bigTurn === 0;
export const MiddleOfWeek: GameCondition = (game) =>
  game.property.turn % GameConstant.bigTurn ===
  Math.floor(GameConstant.bigTurn / 2);
export const EndOfWeek: GameCondition = (game) =>
  game.property.turn % GameConstant.bigTurn === GameConstant.bigTurn - 1;
export const WeekDay: (...array: number[]) => GameCondition =
  (...array) =>
  (game) =>
    array.some((a) => a === game.property.turn % GameConstant.bigTurn);
export const NoEffect: GameEffect = () => true;

export type GameOptionJSON = {
  title: string;
  subtitle: string;
};

export type GameEventJSON = {
  title: EventTitle;
  subtitle: string;
  options: GameOptionJSON[];
  appliableOptions: number[];
};

export interface GameOption {
  title: string;
  subtitle: string;
  toJson(): GameOptionJSON;
  canApply(game: GameInstance): this is AppliableGameOption;
  show(game: GameInstance, index: number): void;
}

export interface AppliableGameOption extends GameOption {
  apply(game: GameInstance): boolean;
}

export class OptionInstance implements AppliableGameOption {
  constructor(
    private condition: GameCondition,
    public title: string,
    public subtitle: string, // subtitle must explain the effect of this option in text
    protected effect: GameEffect,
  ) {}

  show(game: GameInstance, index: number): void {
    const color = this.canApply(game) ? clc.white : clc.blackBright;
    logAndPrint(
      color(`[ 선택지 ${index.toString()} <${this.title}> ]\n${this.subtitle}`),
    );
  }

  toJson(): GameOptionJSON {
    return {
      title: this.title,
      subtitle: this.subtitle,
    };
  }

  toString(): string {
    return `${this.title} | ${this.subtitle}`;
  }

  canApply(game: GameInstance): this is AppliableGameOption {
    return this.condition(game);
  }

  apply(game: GameInstance): boolean {
    return this.effect(game);
  }
}

export interface GameEvent {
  title: EventTitle;
  subtitle: string;
  options: GameOption[];
  toJson(game: GameInstance): GameEventJSON;
  canApply(game: GameInstance): this is AppliableGameEvent;
}

export interface AppliableGameEvent extends GameEvent {
  findAppliableOptions(game: GameInstance): number[];
  show(game: GameInstance): void;
  apply(game: GameInstance, choice: number): boolean | null;
}

export class EventInstance implements AppliableGameEvent {
  constructor(
    private condition: GameCondition,
    public title: EventTitle,
    public subtitle: string,
    public options: GameOption[],
  ) {}

  toJson(game: GameInstance): GameEventJSON {
    return {
      title: this.title,
      subtitle: this.subtitle,
      options: this.options.map((o) => o.toJson()),
      appliableOptions: this.findAppliableOptions(game),
    };
  }

  show(game: GameInstance): void {
    logAndPrint(`[ 이벤트 <${this.title}> ]\n${this.subtitle}\n`);
    this.options.forEach((opt, i) => opt.show(game, i));
    logAndPrint('');
  }

  canApply(game: GameInstance): this is AppliableGameEvent {
    return (
      this.condition(game) && this.options.some((opt) => opt.canApply(game))
    );
  }

  findAppliableOptions(game: GameInstance): number[] {
    const appliableOptions = this.options
      .map((o, i) => [o, i] as const)
      .filter(([o]) => o.canApply(game))
      .map(([, i]) => i);
    return appliableOptions;
  }

  apply(game: GameInstance, choice: number): boolean | null {
    const option = this.options[choice];
    if (option.canApply(game)) {
      return option.apply(game);
    }
    return null;
  }
}
