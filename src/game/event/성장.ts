import { GameConstant } from '../logic/constant';
import {
  EndOfWeek,
  EventInstance,
  NoCondition,
  OptionInstance,
} from '../logic/event';
import type { TileLanguage } from '../logic/tile';
import { Language } from '../logic/tile';

export const 성장 = new EventInstance(
  NoCondition,
  '성장',
  '한 주간 배운 결과를 정리해보자.',
  [
    new OptionInstance(
      EndOfWeek,
      '좋아.',
      `${GameConstant.levelThreshold} 이상의 경험치가 있는 언어의 경력이 1주 증가한다.`,
      (game) => {
        const prop = game.player.property;
        const update = Language.levelUpdatable(game);
        prop.levelEnabled = update;
        Object.entries(update).forEach(
          ([lang, updatable]: [TileLanguage, boolean]) => {
            if (updatable) {
              prop.level[lang] += 1;
              prop.experience[lang] -= GameConstant.levelThreshold;
            }
          },
        );
        return Object.values(update).some((v) => v);
      },
    ),
  ],
);
