import type { GameCondition } from '../logic/event';
import {
  EndOfWeek,
  EventInstance,
  NoEffect,
  OptionInstance,
} from '../logic/event';
import type { GameInstance } from '../logic/game';
import type { TileLanguage } from '../logic/tile';
import { Language } from '../logic/tile';

export type WeeklyGoalData = {
  type: 'language';
  include: TileLanguage[];
  number: number;
  string: string;
};

export function randomWeeklyGoal(game: GameInstance): WeeklyGoalData {
  const week = Math.floor(game.property.turn / 7);
  const playerLevelSum = Object.values(game.player.property.level).reduce(
    (partialSum, a) => partialSum + a,
    0,
  );
  let currentLevel = Math.max(
    week + (playerLevelSum - week) * 0.05 + (Math.random() - 0.6) * 0.1,
    0,
  );
  const option: WeeklyGoalData = {
    type: 'language',
    include: [],
    number: 0,
    string: '',
  };
  while (currentLevel >= 0) {
    if (option.number === Language.data.length) {
      break;
    }
    const r = Math.random();
    if (r > 0.7) {
      const lang =
        Language.data[Math.floor(Math.random() * Language.data.length)];
      if (!option.include.includes(lang)) {
        option.include.push(lang);
        option.number += 1;
        currentLevel -= 1;
      }
    } else {
      option.number += 1;
      currentLevel -= 0.8;
    }
  }

  if (option.include.length === 0) {
    option.string = `${option.number}개 이상의 언어로 활동할 수 있는 개발자가 되자.`;
  } else if (option.include.length === option.number) {
    option.string = `${option.include.join(
      ', ',
    )}로 활동할 수 있는 개발자가 되자.`;
  } else {
    option.string = `${game.property.weeklyGoalData.include.join(
      ', ',
    )}를 포함하여 ${
      game.property.weeklyGoalData.number
    }개 이상의 언어로 활동할 수 있는 개발자가 되자.`;
  }
  return option;
}

const succeed: GameCondition = (game: GameInstance): boolean => {
  const levelEnabled = game.player.property.levelEnabled;
  switch (game.property.weeklyGoalData.type) {
    case 'language':
      return (
        game.property.weeklyGoalData.include.every(
          (lang: TileLanguage) => levelEnabled[lang],
        ) &&
        Object.values(levelEnabled).filter((v) => v === true).length >=
          game.property.weeklyGoalData.number
      );
  }
};

export const 주간_목표 = new EventInstance(
  EndOfWeek,
  '주간 목표',
  '개발자로 살아남을 수 있을까?', // TODO : add description same as game.show()
  [
    new OptionInstance(succeed, '야호!', `개발자로 살아남았다.`, NoEffect),
    new OptionInstance(
      (game) => !succeed(game),
      '아쉽군... 한 판 더 하자.',
      `개발자를 그만둔다.`,
      (game) => {
        game.property.status = [{ type: 'endGame' }];
        return true;
      },
    ),
  ],
);
