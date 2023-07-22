import {
  EventInstance,
  NoCondition,
  OptionInstance,
  WeekDay,
} from '../logic/event';
import type { TileLanguage } from '../logic/tile';
import { getRandomElement } from '../logic/util';

export const 변화의_물결 = new EventInstance(
  (game) => WeekDay(2, 4)(game) && game.property.turn > 14,
  '변화의 물결',
  '각종 신기술이 등장하여 기존의 지식이 쓸모없어졌다.\n배울 것이 많아졌지만 새로운 기회가 열릴지도 모르겠다.',
  [
    new OptionInstance(
      NoCondition,
      '이런.',
      `한 언어의 경험치가 0이 된다.`,
      (game) => {
        const existLang = (
          Object.entries(game.player.property.experience) as [
            TileLanguage,
            number,
          ][]
        )
          .filter(([, number]) => number > 0)
          .map(([string]) => string);
        if (existLang.length > 0) {
          game.player.property.experience[getRandomElement(existLang)] = 0;
        }
        return true;
      },
    ),
  ],
);
