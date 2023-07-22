import {
  EventInstance,
  NoCondition,
  OptionInstance,
  WeekDay,
} from '../logic/event';
import type { TileLanguage } from '../logic/tile';
import { Language } from '../logic/tile';

export const 새로운_컴퓨터가_필요해 = new EventInstance(
  (game) =>
    !game.property.eventData['새로운 컴퓨터가 필요해'].has &&
    game.property.turn > 7 &&
    WeekDay(2, 4)(game),
  '새로운 컴퓨터가 필요해',
  '빌드를 돌릴 때마다 시간이 오래 걸려서 새 컴퓨터를 사고 싶다.\n이왕이면 맥북 사서 스타벅스에서 개발하고 싶다.',
  [
    new OptionInstance(
      (game) => game.player.property.money >= 4,
      '맥북을 사자.',
      `돈이 4 감소하고 경험치가 2배로 쌓인다.`,
      (game) => {
        game.player.property.money -= 4;
        game.property.eventData['새로운 컴퓨터가 필요해'] = {
          has: true,
          isMac: true,
        };
        return true;
      },
    ),
    new OptionInstance(
      (game) => game.player.property.money >= 2,
      '중고 컴퓨터를 사자.',
      `돈이 2 감소하고 존재하는 경험치를 2배로 만든다.`,
      (game) => {
        game.player.property.money -= 2;
        game.property.eventData['새로운 컴퓨터가 필요해'] = {
          has: true,
          isMac: false,
        };
        game.player.property.experience = Object.fromEntries(
          Language.data.map((lang) => [
            lang,
            game.player.property.experience[lang] * 2,
          ]),
        ) as { [key in TileLanguage]: number };

        return true;
      },
    ),
    new OptionInstance(
      NoCondition,
      '사지 말자.',
      `아무 일도 일어나지 않는다.`,
      () => {
        return true;
      },
    ),
  ],
);
