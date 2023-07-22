import {
  EventInstance,
  NoCondition,
  OptionInstance,
  WeekDay,
} from '../logic/event';

export const 모니터_암이_필요해 = new EventInstance(
  (game) =>
    !game.property.eventData['모니터 암이 필요해'].has &&
    game.property.eventData['모니터 암이 필요해'].count < 2 &&
    game.property.turn > 10 &&
    WeekDay(2, 4)(game),
  '모니터 암이 필요해',
  '하루 종일 개발만 하니 목이 아프다.\n거북목이 될 것 같아서 모니터 암을 사고 싶다.',
  [
    new OptionInstance(
      (game) => game.player.property.money >= 2,
      '사자.',
      `돈이 1 감소한다.`,
      (game) => {
        game.player.property.money -= 2;
        game.property.eventData['모니터 암이 필요해'] = { has: true };
        return true;
      },
    ),
    new OptionInstance(
      NoCondition,
      '사지 말자.',
      `모니터 암을 살 때까지 기본 체력이 1 감소한다.`,
      (game) => {
        // assert by condition but just for type safety
        if (!game.property.eventData['모니터 암이 필요해'].has) {
          game.property.eventData['모니터 암이 필요해'].count += 1;
          game.player.property.health = Math.max(
            game.player.property.health - 1,
            0,
          );
        }
        return true;
      },
    ),
  ],
);
