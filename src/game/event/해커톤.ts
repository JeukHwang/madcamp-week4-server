import {
  EventInstance,
  NoCondition,
  OptionInstance,
  WeekDay,
} from '../logic/event';
import { Language } from '../logic/tile';

export const 해커톤 = new EventInstance(
  (game) => WeekDay(4)(game),
  '해커톤',
  '해커톤이 시작되었다. 참여할까?',
  [
    new OptionInstance(
      NoCondition,
      '참여하자.',
      `체력이 2 감소하고 무작위한 언어의 경험치가 2 증가한다.`,
      (game) => {
        if (game.player.property.health < 2) {
          return false;
        }
        game.player.property.health -= 2;
        game.player.property.experience[Language.random()] += 2;
        return true;
      },
    ),
    new OptionInstance(
      NoCondition,
      '참여하지 말자.',
      `아무 일도 일어나지 않는다.`,
      () => {
        return true;
      },
    ),
  ],
);
